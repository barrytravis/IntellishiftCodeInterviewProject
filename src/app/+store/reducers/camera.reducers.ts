import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { CameraActions } from '../../+store/actions';
import { Camera } from '../../models/camera.model';
import produce from 'immer';

export interface CameraState {
  cameras: Array<Camera>;
}

export const adapter: EntityAdapter<Camera> = createEntityAdapter<Camera>();

export const initialState: CameraState = adapter.getInitialState({
  cameras: []
});

export const cameraReducer = createReducer(
  initialState,
  on(CameraActions.loadCamerasSuccess, ( state, action ) => {
    console.log(action.cameras);
    return produce(state, baseState => {
      baseState.cameras = [];
      baseState.cameras.concat(action.cameras);
    });
  }),
  on(CameraActions.createCamera, (state, action ) => ({
    cameras: [...state.cameras, action.camera]
  })),
  on(CameraActions.updateCamera, (state,action ) => ({
    cameras: state.cameras.map((value, index) =>
      index === action.camera.id ? { ...value, deviceNo: action.camera } : value
    )
  })),
  on(CameraActions.deleteCamera, (state, action) => ({
    cameras: [...state.cameras.splice(action.cameraId)]
  }))
);

export function reducer(state: CameraState | undefined, action: Action) {
  return cameraReducer(state, action);
}
