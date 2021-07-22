import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CameraState } from '../../+store/reducers/camera.reducers';
import { Camera } from '../../models/camera.model';

export interface CamerasState {
  cameras: Array<Camera>;
}

export const selectCameras = (state: CamerasState) => {
  return state.cameras;
};
