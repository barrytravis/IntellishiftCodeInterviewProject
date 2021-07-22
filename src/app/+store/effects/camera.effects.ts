import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { Injectable } from '@angular/core';
import { CameraActions } from '../../+store/actions';
import { Camera } from '../../models/camera.model';
import { EMPTY } from 'rxjs';
import { root } from 'rxjs/internal/util/root';
import { CameraState } from '../../+store/reducers/camera.reducers';
import { select, Store } from '@ngrx/store';

@Injectable()
export class CameraEffects {
  constructor(private dataService: DataService, private actions$: Actions, private store: Store<CameraState>) {}

  loadCameras = createEffect(() =>
    this.actions$.pipe(
      ofType(CameraActions.loadCameras),
      switchMap(() => 
        this.dataService.get<Camera[]>('cameras').pipe(
          map(cameras => CameraActions.loadCamerasSuccess({ cameras }))
        )
      )
    )
  );

}