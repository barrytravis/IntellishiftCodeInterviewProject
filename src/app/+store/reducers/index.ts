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
  [fromCameraReducer.cameraFeatureKey]: fromCameraReducer.CameraState;
  [fromAssignmentReducer.assignmentFeatureKey]: fromAssignmentReducer.AssignmentState;
  [fromVehicleReducer.vehiclesFeatureKey]: fromVehicleReducer.VehicleState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromCameraReducer.cameraFeatureKey]: fromCameraReducer.reducer,
  [fromAssignmentReducer.assignmentFeatureKey]: fromAssignmentReducer.reducer,
  [fromVehicleReducer.vehiclesFeatureKey]: fromVehicleReducer.reducer
};

export const metaReducers: MetaReducer<AppState>[] = [];
