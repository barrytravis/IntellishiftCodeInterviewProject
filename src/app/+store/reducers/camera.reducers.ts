import { EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as CameraActions from '../camera.actions';
import { Camera } from '../../models/camera.model';

export interface State {
  cameras: Array<Camera>;
}

export const initialState: State = { cameras: [] };

export const cameraReducer = createReducer(
  initialState,
  on(CameraActions.setScores, (state, { camera }) => ({
    cameras: ...state.cameras.push(camera)
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return cameraReducer(state, action);
}
