import { createAction, props } from '@ngrx/store';
import { Camera } from '../../models/camera.model';

export const loadCameras = createAction('[VEHICLE] LoadCameras');

export const loadCamerasSuccess = createAction(
  '[VEHICLE] LoadCamerasSuccess',
  props<{ cameras: Camera[] }>()
);

export const createCamera = createAction(
  '[VEHICLE] CreateCamera',
  props<{ camera: Camera }>()
);

export const createCameraSuccess = createAction(
  '[VEHICLE] CreateCameraSuccess',
  props<{ camera: Camera }>()
);

export const updateCamera = createAction(
  '[VEHICLE] UpdateCamera',
  props<{ camera: Camera }>()
);

export const updateCameraSuccess = createAction(
  '[VEHICLE] UpdateCameraSuccess',
  props<{ camera: Camera }>()
);

export const deleteCamera = createAction(
  '[VEHICLE] DeleteCamera',
  props<{ cameraId: number }>()
);

export const deleteCameraSuccess = createAction(
  '[VEHICLE] DeleteCameraSuccess',
  props<{ cameraId: number }>()
);
