import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromAssignmentReducer from '../../+store/reducers/assignment.reducers';
import * as fromCameraReducer from '../../+store/reducers/camera.reducers';
import * as fromVehicleReducer from  '../../+store/reducers/vehicle.reducers';

export interface AppState {
  [fromCameraReducer.cameraFeatureKey]: fromCameraReducer.CamerasState;
  [fromAssignmentReducer.assignmentFeatureKey]: fromAssignmentReducer.AssignmentsState;
  [fromVehicleReducer.vehicleFeatureKey]: fromVehicleReducer.VehiclesState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromCameraReducer.cameraFeatureKey]: fromCameraReducer.reducer,
  [fromAssignmentReducer.assignmentFeatureKey]: fromAssignmentReducer.reducer,
  [fromVehicleReducer.vehicleFeatureKey]: fromVehicleReducer.reducer
};

export const metaReducers: MetaReducer<AppState>[] = [];
