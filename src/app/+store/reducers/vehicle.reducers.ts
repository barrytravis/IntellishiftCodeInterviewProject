import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { VehicleActions } from '../../+store/actions';
import { Vehicle } from '../../models/vehicle.model';
import produce from 'immer';

export interface VehiclesState {
  vehicles: Array<Vehicle>;
}

export const vehicleFeatureKey = 'vehicle';
export const adapter: EntityAdapter<Vehicle> = createEntityAdapter<Vehicle>();

export const initialState: VehiclesState = adapter.getInitialState({
  vehicles: []
});

export const vehiclesReducer = createReducer(
  initialState,
  on(VehicleActions.loadVehiclesSuccess, (state, action) => ({
    vehicles: action.vehicles
  })),
  on(VehicleActions.createVehicleSuccess, (state, action) => ({
    vehicles: [...state.vehicles, action.vehicle]
  })),
  on(VehicleActions.updateVehicleSuccess, (state, action) => ({
    vehicles: state.vehicles.map((value, index) =>
      index === action.vehicle.id
        ? { ...value, name: action.vehicle.name }
        : value
    )
  })),
  on(VehicleActions.deleteVehicleSuccess, (state, action) => {
    return { vehicles: [...state.vehicles.filter(c => c.id !== action.vehicleId)] };
  })
);

export function reducer(state: VehiclesState | undefined, action: Action) {
  return vehiclesReducer(state, action);
}
