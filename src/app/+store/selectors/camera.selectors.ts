import { createSelector } from '@ngrx/store';
import { CameraState } from '../../+store/reducers/camera.reducers';

export const selectCameras = (state: CameraState) => state.cameras;
 
// export const selectFeatureCount = createSelector(
//   selectCameras,
//   (state: CameraState) => state.cameras
// );