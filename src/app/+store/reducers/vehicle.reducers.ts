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
  on(VehicleActions.updateVehicle, (state, { vehicle }) => ({
    vehicles: state.vehicles.map((value, index) =>
    index === vehicle.id ? { ...value, name: vehicle.name } : value
  )
  })),
  on(VehicleActions.deleteVehicle, (state, { vehicleId }) => ({
    vehicles: state.vehicles.splice(vehicleId)
  })),
);

export function reducer(state: VehicleState | undefined, action: Action) {
  return assignmentReducer(state, action);
}
