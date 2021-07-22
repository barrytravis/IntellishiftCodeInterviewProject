import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromAssignmentReducer from './assignment.reducers';
import * as fromCameraReducer from './camera.reducers';
import * as fromVehicleReducer from './vehicle.reducers';

export interface AppState {
  [fromCameraReducer.cameraFeatureKey]: fromCameraReducer.CameraState;
  // assignments: fromAssignmentReducer.AssignmentState;
  // vehicles: fromVehicleReducer.VehicleState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromCameraReducer.cameraFeatureKey]: fromCameraReducer.reducer
  // assignments: fromAssignmentReducer.reducer,
  // vehicles: fromVehicleReducer.reducer
};

export const metaReducers: MetaReducer<AppState>[] = [];
