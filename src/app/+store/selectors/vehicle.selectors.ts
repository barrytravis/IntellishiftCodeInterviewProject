import { VehiclesState } from "../../+store/reducers/vehicle.reducers";
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectVehiclesState = createFeatureSelector<VehiclesState>('vehicles');

export const getVehicles = createSelector(selectVehiclesState, (state: VehiclesState) => state.vehicles)