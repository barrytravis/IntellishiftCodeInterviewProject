import { Vehicle } from "../../models/vehicle.model";

export interface VehicleState {
  vehicles: Array<Vehicle>;
}

export const selectCameras = (state: VehicleState) => {
  return state.vehicles
};
