import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { Injectable } from '@angular/core';
import { CameraActions } from '../../+store/actions';
import { Camera } from '../../models/camera.model';
import { EMPTY } from 'rxjs';
import { root } from 'rxjs/internal/util/root';
import { CamerasState } from '../../+store/reducers/camera.reducers';
import { select, Store } from '@ngrx/store';

@Injectable()
export class CameraEffects {
  constructor(
    private dataService: DataService,
    private actions$: Actions,
    private store: Store<CamerasState>
  ) {}

  loadCameras = createEffect(() =>
    this.actions$.pipe(
      ofType(CameraActions.loadCameras),
      switchMap(() =>
        this.dataService
          .get<Camera[]>('cameras')
          .pipe(map(cameras => CameraActions.loadCamerasSuccess({ cameras })))
      )
    )
  );

  createCamera = createEffect(() =>
    this.actions$.pipe(
      ofType(CameraActions.createCamera),
      switchMap(data =>
        this.dataService
          .post<Camera>(
            'cameras/:id',
            { id: +data.camera.id },
            {
              deviceNo: data.camera.deviceNo,
              vehicleId: null
            }
          )
          .pipe(map(camera => CameraActions.createCameraSuccess({ camera })))
      )
    )
  );

  updateCamera = createEffect(() =>
    this.actions$.pipe(
      ofType(CameraActions.updateCamera),
      switchMap(data =>
        this.dataService
          .put<Camera>(
            'cameras/:id',
            { id: +data.camera.id },
            {
              id: +data.camera.id,
              deviceNo: data.camera.deviceNo,
              vehicleId: +data.camera.vehicleId
            }
          )
          .pipe(map(camera => CameraActions.updateCameraSuccess({ camera })))
      )
    )
  );

  deleteCamera = createEffect(() =>
    this.actions$.pipe(
      ofType(CameraActions.deleteCamera),
      switchMap(data =>
        this.dataService
          .delete<number>('cameras/:id', { id: +data.cameraId })
          .pipe(
            map(cameraId =>
              CameraActions.deleteCameraSuccess({ cameraId: +cameraId })
            )
          )
      )
    )
  );
}
