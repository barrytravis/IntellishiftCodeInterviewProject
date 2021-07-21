import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { Injectable } from '@angular/core';
import { CameraActions } from '../../+store/actions';
import { Camera } from '../../models/camera.model';
import { EMPTY } from 'rxjs';
import { root } from 'rxjs/internal/util/root';

@Injectable()
export class CameraEffects {
  constructor(private dataService: DataService, private actions$: Actions) {}

  loadCameras = createEffect(
    () => 
    this.actions$.pipe(
      ofType(CameraActions.loadCameras),
      map(()) => {
        console.log('inside loadCameras');
        this.dataService.get('cameras').pipe(
          map(()) => {
            console.log('cameras after data service');
            console.log(cameras);
            CameraActions.loadCamerasSuccess( cameras );
          }),
          catchError(() => EMPTY)
        );
      })
    );
  );
}
