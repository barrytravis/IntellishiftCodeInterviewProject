import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as CameraActions from '../camera.actions';
import { Camera } from '../../models/camera.model';

export const reducer  = createReducer(
  [],
  on(CameraActions.createCamera, (state, { camera }) => {

  })
);