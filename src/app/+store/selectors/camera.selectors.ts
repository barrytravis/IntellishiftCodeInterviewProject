import { CamerasState } from '../../+store/reducers/camera.reducers';
import { Camera } from '../../models/camera.model';

export const selectCameras = (state: CamerasState) => {
  return state.cameras;
};
