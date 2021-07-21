import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { Injectable } from '@angular/core';
import { CameraActions } from '../../+store/actions';
import { Camera } from '../../models/camera.model';
import { EMPTY } from 'rxjs';

@Injectable()
export class CameraEffects {
  constructor(private dataService: DataService, private actions$: Actions) {}

  loadCameras = createEffect(() => {
    return this.actions$.pipe(
      ofType(CameraActions.loadCameras),
      switchMap(() => {
        return this.dataService.get<Camera[]>('cameras').pipe(
          map(cameras => {
            return CameraActions.loadCamerasSuccess({ cameras });
          }),
          catchError(() => EMPTY)
        );
      })
    );
  });
}
