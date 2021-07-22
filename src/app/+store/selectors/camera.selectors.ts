import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CamerasState } from '../../+store/reducers/camera.reducers';
import { Camera } from '../../models/camera.model';

// export const selectCameras = (state: CamerasState) => {
//   return state.cameras;
// };

export const selectCamerasState = createFeatureSelector<CamerasState>('cameras');

export const getCameras = createSelector(selectCamerasState, (state: CamerasState) => state.cameras)
