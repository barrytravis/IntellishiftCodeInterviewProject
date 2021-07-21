import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { Injectable } from '@angular/core';
import { CameraActions } from '../../+store/actions';
import { Camera } from '../../models/camera.model';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class CameraEffects {
  constructor(
    private dataService: DataService, private actions: Actions) {}

  loadCameras = createEffect(() => {
    this.actions.pipe(
      ofType(
        CameraActions.loadCameras,
        switchMap(() =>
          this.dataService
            .get<Camera[]>('cameras')
            .pipe(map(camereas => CameraActions.loadCamerasSuccess(camereas)))
        )
      )
    );

    return new Observable<Action>();
  });
}
