import { Action, createReducer, on } from '@ngrx/store';
import * as VehicleActions from '../../+store/actions/vehicle.actions';
import { Vehicle } from '../../models/vehicle.model';

export interface VehicleState {
  vehicles: Array<Vehicle>;
}

export const initialState: VehicleState = { vehicles: [] };

export const assignmentReducer = createReducer(
  initialState,
  on(VehicleActions.createVehicle, (state, { vehicle }) => ({
    vehicles: [ ...state.vehicles, vehicle]
  })),
  on(VehicleActions.getVehicleById, (state, {  }) => ({
    
  })),
  on(VehicleActions.getVehicles, state => ({
    
  })),
  on(VehicleActions.updateVehicle, (state, { vehicle }) => ({
    
  })),
  on(VehicleActions.deleteVehicle, (state, { vehicle }) => ({
    
  })),
);

export function reducer(state: VehicleState | undefined, action: Action) {
  return assignmentReducer(state, action);
}
