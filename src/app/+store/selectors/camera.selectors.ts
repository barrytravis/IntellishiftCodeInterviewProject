import { createSelector } from '@ngrx/store';
import { CameraState } from '../../+store/reducers/camera.reducers';

  
export const selectFeature = (state: CameraState) => state.feature;
 
export const selectFeatureCount = createSelector(
  selectFeature,
  (state: CameraState) => state.counter
);