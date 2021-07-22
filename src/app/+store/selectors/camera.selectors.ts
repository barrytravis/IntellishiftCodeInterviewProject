import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CamerasState } from '../../+store/reducers/camera.reducers';

export const selectCamerasState = createFeatureSelector<CamerasState>('cameras');

export const getCameras = createSelector(selectCamerasState, (state: CamerasState) => state.cameras)
