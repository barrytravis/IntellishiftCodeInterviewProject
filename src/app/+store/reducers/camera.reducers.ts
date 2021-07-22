import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { CameraActions } from '../../+store/actions';
import { Camera } from '../../models/camera.model';
import produce from 'immer';

export interface CamerasState {
  cameras: Array<Camera>;
}

export const cameraFeatureKey = 'cameras';
export const adapter: EntityAdapter<Camera> = createEntityAdapter<Camera>();

export const initialState: CamerasState = adapter.getInitialState({
  cameras: []
});

export const camerasReducer = createReducer(
  initialState,
  on(CameraActions.loadCamerasSuccess, (state, action) => ({
    cameras: action.cameras
  })),
  on(CameraActions.createCamera, (state, action) => ({
    cameras: [...state.cameras, action.camera]
  })),
  on(CameraActions.updateCamera, (state, action) => ({
    cameras: state.cameras.map((value, index) =>
      index === action.camera.id
        ? { ...value, deviceNo: action.camera.deviceNo }
        : value
    )
  })),
  on(CameraActions.deleteCamera, (state, action) => {
    return {
      cameras: [...state.cameras.filter(c => c.id !== action.cameraId)]
    };
  })
);

export function reducer(state: CamerasState | undefined, action: Action) {
  return camerasReducer(state, action);
}
