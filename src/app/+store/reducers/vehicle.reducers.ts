import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { VehicleActions } from '../../+store/actions';
import { Vehicle } from '../../models/vehicle.model';
import produce from 'immer';

export interface VehicleState {
  vehicles: Array<Vehicle>;
}

export const vehicleFeatureKey = 'vehicle';
export const adapter: EntityAdapter<Vehicle> = createEntityAdapter<Vehicle>();

export const initialState: VehicleState = adapter.getInitialState({
  vehicles: []
});

export const vehiclesReducer = createReducer(
  initialState,
  on(VehicleActions.loadVehicleSuccess, (state, action) => ({
    vehicles: action.vehicles
  })),
  on(VehicleActions.createVehicle, (state, action) => ({
    vehicles: [...state.vehicles, action.vehicle]
  })),
  on(VehicleActions.updateVehicle, (state, action) => ({
    vehicles: state.vehicles.map((value, index) =>
      index === action.vehicle.id
        ? { ...value, name: action.vehicle.name }
        : value
    )
  })),
  on(VehicleActions.deleteVehicle, (state, action) => {
    return { vehicles: [...state.vehicles.filter(c => c.id !== action.vehicleId)] };
  })
);

export function reducer(state: VehicleState | undefined, action: Action) {
  return vehiclesReducer(state, action);
}
