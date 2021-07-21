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
  [fromCameraReducer.cameras]: fromCameraReducer.CameraState;
  [fromAssignmentReducer.assignments]: fromAssignmentReducer.AssignmentState;
  [fromVehicleReducer.vehicles]: fromVehicleReducer.VehicleState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromCameraReducer.cameras]: fromCameraReducer.reducer,
  [fromAssignmentReducer.assignments]: fromAssignmentReducer.reducer,
  [fromVehicleReducer.vehicles]: fromVehicleReducer.reducer
};

export const metaReducers: MetaReducer<AppState>[] = [];
