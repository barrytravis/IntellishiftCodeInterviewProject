import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CameraState } from '../../+store/reducers/camera.reducers';

export const selectCameras = (state: CameraState) => {
  state.cameras;
  console.log('in selector');
  console.log(state.cameras);
};

export const selectAllCameras = createFeatureSelector<CameraState>('selectCameras');
