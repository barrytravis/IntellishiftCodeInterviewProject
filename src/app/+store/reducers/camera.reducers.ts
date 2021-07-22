import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { CameraActions } from '../../+store/actions';
import { Camera } from '../../models/camera.model';
import { CameraState } from '../../+store/reducers/camera.reducers';
import produce from 'immer';

export const cameraFeatureKey = 'cameras';
export const adapter: EntityAdapter<Camera> = createEntityAdapter<Camera>();

export const initialState: CameraState = adapter.getInitialState({
  cameras: []
});

export const camerasReducer = createReducer(
  initialState,
  on(CameraActions.loadCamerasSuccess, (state, action) => ({
    cameras: action.cameras
  })),
  on(CameraActions.createCamera, (state, action) => ({
    cameras: [...state.cameras, action.camera]
  })),
  on(CameraActions.updateCamera, (state, action) => ({
    cameras: state.cameras.map((value, index) =>
      index === action.camera.id
        ? { ...value, deviceNo: action.camera.deviceNo }
        : value
    )
  })),
  on(CameraActions.deleteCamera, (state, action) => {
    return { cameras: [...state.cameras.filter(c => c.id !== action.cameraId)] };
  })
);

export function reducer(state: CameraState | undefined, action: Action) {
  return camerasReducer(state, action);
}
