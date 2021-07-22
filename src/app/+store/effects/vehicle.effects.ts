import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { Injectable } from '@angular/core';
import { VehicleActions } from '../../+store/actions';
import { Vehicle } from '../../models/vehicle.model';
import { EMPTY } from 'rxjs';
import { root } from 'rxjs/internal/util/root';
import { VehiclesState } from '../../+store/reducers/vehicle.reducers';
import { select, Store } from '@ngrx/store';

@Injectable()
export class VehicleEffects {
  constructor(private dataService: DataService, private actions$: Actions, private store: Store<VehiclesState>) {}

  loadVehicle = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.loadVehicles),
      switchMap(() => 
        this.dataService.get<Vehicle[]>('Vehicle').pipe(
          map(vehicles => VehicleActions.loadVehiclesSuccess({ vehicles }))
        )
      )
    )
  );

}