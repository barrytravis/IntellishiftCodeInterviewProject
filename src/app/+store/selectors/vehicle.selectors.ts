import { VehiclesState } from "../../+store/reducers/vehicle.reducers";
import { Vehicle } from "../../models/vehicle.model";

export const selectCameras = (state: VehiclesState) => {
  return state.vehicles
};
