import { createAction, props } from '@ngrx/store';
import { Vehicle } from '../../models/vehicle.model';

export const createVehicle = createAction(
  '[VEHICLE] CreateVehicle',
  props<{ vehicle: Vehicle }>()
);

export const getVehicles = createAction(
  '[VEHICLE] GetVehicles'
);

export const getVehicleById = createAction(
  '[VEHICLE] GetVehicleById',
  props<{ vehicleId: number }>()
);

export const updateVehicle = createAction(
  '[VEHICLE] UpdateVehicle',
  props<{ vehicle: Vehicle }>()
);

export const deleteVehicle = createAction(
  '[VEHICLE] DeleteVehicle',
  props<{ vehicleId: number }>()
);