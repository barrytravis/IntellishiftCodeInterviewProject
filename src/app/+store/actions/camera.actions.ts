import { createAction, props } from '@ngrx/store';
import { Camera } from '../../models/camera.model';

export const createCamera = createAction(
  '[VEHICLE] CreateCamera',
  props<{ camera: Camera }>()
);

export const getCameraById = createAction(
  '[VEHICLE] GetCameraById',
  props<{ cameraId: number }>()
);

export const getCameras = createAction(
  '[VEHICLE] GetCameras'
);

export const updateCamera = createAction(
  '[VEHICLE] UpdateCamera',
  props<{ camera: Camera }>()
);

export const deleteCamera = createAction(
  '[VEHICLE] DeleteCamera',
  props<{ cameraId: number }>()
);

