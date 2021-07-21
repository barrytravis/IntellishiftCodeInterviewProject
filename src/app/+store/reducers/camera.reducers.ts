import { Action, createReducer, on } from '@ngrx/store';
import * as CameraActions from '../../+store/actions/camera.actions';
import { Camera } from '../../models/camera.model';

export interface CameraState {
  cameras: Array<Camera>;
}

export const initialState: CameraState = { cameras: [] };

export const cameraReducer = createReducer(
  initialState,
  on(CameraActions.createCamera, (state, { camera }) => ({
    cameras: [ ...state.cameras, camera]
  })),
  on(CameraActions.getCameraById, (state, {  }) => ({
    
  })),
  on(CameraActions.getCameras, state => ({
    
  })),
  on(CameraActions.updateCamera, (state, {  }) => ({
    
  })),
  on(CameraActions.deleteCamera, (state, {  }) => ({
    
  })),
);

export function reducer(state: CameraState | undefined, action: Action) {
  return cameraReducer(state, action);
}
