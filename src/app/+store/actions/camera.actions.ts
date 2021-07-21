import { createAction, props } from '@ngrx/store';
import { Camera } from '../../models/camera.model';

export const loadCameras = createAction('[VEHICLE] LoadCameras');

export const loadCamerasSuccess = createAction(
  '[VEHICLE] oadCamerasSuccess',
  props<{ cameras: Camera[] }>()
);

export const createCamera = createAction(
  '[VEHICLE] CreateCamera',
  props<{ camera: Camera }>()
);

export const updateCamera = createAction(
  '[VEHICLE] UpdateCamera',
  props<{ camera: Camera }>()
);

export const deleteCamera = createAction(
  '[VEHICLE] DeleteCamera',
  props<{ cameraId: number }>()
);
