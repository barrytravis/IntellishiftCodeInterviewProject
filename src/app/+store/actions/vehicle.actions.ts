import { createAction, props } from '@ngrx/store';
import { Vehicle } from '../../models/vehicle.model';

export const loadVehicles = createAction('[VEHICLE] LoadVehicles');

export const loadVehiclesSuccess = createAction(
  '[VEHICLE] LoadVehiclesSuccess',
  props<{ vehicles: Vehicle[] }>()
);

export const createVehicle = createAction(
  '[VEHICLE] CreateVehicle',
  props<{ vehicle: Vehicle }>()
);

export const createVehicleSuccess = createAction(
  '[VEHICLE] CreateVehicleSuccess',
  props<{ vehicle: Vehicle }>()
);

export const updateVehicle = createAction(
  '[VEHICLE] UpdateVehicle',
  props<{ vehicle: Vehicle }>()
);

export const updateVehicleSuccess = createAction(
  '[VEHICLE] UpdateVehicleSuccess',
  props<{ vehicle: Vehicle }>()
);

export const deleteVehicle = createAction(
  '[VEHICLE] DeleteVehicle',
  props<{ vehicleId: number }>()
);

export const deleteVehicleSuccess = createAction(
  '[VEHICLE] DeleteVehicleSuccess',
  props<{ vehicleId: number }>()
);