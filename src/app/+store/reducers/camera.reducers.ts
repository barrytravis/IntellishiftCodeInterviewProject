import { Action, createReducer, on } from '@ngrx/store';
import { CameraActions } from '../../+store/actions';
import { Camera } from '../../models/camera.model';

export interface CameraState {
  cameras: Array<Camera>;
}

export const initialState: CameraState = { cameras: [] };

export const cameraReducer = createReducer(
  initialState,
  on(CameraActions.createCamera, (state, { camera }) => ({
    cameras: [...state.cameras, camera]
  })),
  on(CameraActions.updateCamera, (state, { camera }) => ({
    cameras: state.cameras.map((value, index) =>
      index === camera.id ? { ...value, deviceNo: camera } : value
    )
  })),
  on(CameraActions.deleteCamera, (state, { cameraId }) => ({
    cameras: state.cameras.splice(cameraId)
  }))
);

export function reducer(state: CameraState | undefined, action: Action) {
  return cameraReducer(state, action);
}
