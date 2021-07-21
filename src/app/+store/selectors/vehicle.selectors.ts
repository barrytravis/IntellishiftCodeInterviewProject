import { createSelector } from '@ngrx/store';
import { VehicleState } from '../../+store/reducers/vehicle.reducers';

export const selectCameras = (state: VehicleState) => state.vehicles;