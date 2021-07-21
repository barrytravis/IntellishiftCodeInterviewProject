import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CameraState } from '../../+store/reducers/camera.reducers';
import { Camera } from '../../models/camera.model';

export interface CamerasState {
  cameras: Array<Camera>;
}

// export interface State {
//   cameras: CamerasState;
// }

export const selectCameras = (state: CamerasState) => {
  console.log('in selector');
  console.log(state);
  return state.cameras;
};

// export const selectAllCameras = createSelector(
//   selectCameras,
//   (state: CameraState) => state.cameras
// );
