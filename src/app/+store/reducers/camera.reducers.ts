import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { CameraActions } from '../../+store/actions';
import { Camera } from '../../models/camera.model';

export interface CameraState {
  cameras: Array<Camera>;
}

export const adapter: EntityAdapter<CameraState> = createEntityAdapter<Camera>();

export const initialState: CameraState = adapter.getInitialState({
  cameras: []
});

export const cameraReducer = createReducer(
  initialState,
  on(CameraActions.loadCamerasSuccess, (state, { cameras }) => {
    console.log('in reducer');
    console.log(cameras);
    adapter.removeAll({...state});
    return adapter.addAll(cameras, {...state});
  }),
  on(CameraActions.createCamera, (state, { camera }) => ({
    cameras: [...state.cameras, camera]
  })),
  on(CameraActions.updateCamera, (state, { camera }) => ({
    cameras: state.cameras.map((value, index) =>
      index === camera.id ? { ...value, deviceNo: camera } : value
    )
  })),
  on(CameraActions.deleteCamera, (state, { cameraId }) => ({
    cameras: [...state.cameras.splice(cameraId)]
  }))
);

export function reducer(state: CameraState | undefined, action: Action) {
  return cameraReducer(state, action);
}
