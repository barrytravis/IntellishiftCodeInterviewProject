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
  constructor(
    private dataService: DataService,
    private actions$: Actions,
    private store: Store<VehiclesState>
  ) {}

  loadVehicles = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.loadVehicles),
      switchMap(() =>
        this.dataService
          .get<Vehicle[]>('vehicles')
          .pipe(
            map(vehicles => VehicleActions.loadVehiclesSuccess({ vehicles }))
          )
      )
    )
  );

  createVehicle = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.createVehicle),
      switchMap(data =>
        this.dataService
          .post<Vehicle>(
            'vehicles/:id',
            { id: +data.vehicle.id },
            {
              cameraId: null,
              name: data.vehicle.name
            }
          )
          .pipe(
            map(vehicle => VehicleActions.createVehicleSuccess({ vehicle }))
          )
      )
    )
  );

  updateVehicle = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.updateVehicle),
      switchMap(data =>
        this.dataService
          .put<Vehicle>(
            'vehicles/:id',
            { id: +data.vehicle.id },
            {
              id: +data.vehicle.id,
              name: data.vehicle.name,
              cameraId: +data.vehicle.cameraId
            }
          )
          .pipe(
            map(vehicle => VehicleActions.updateVehicleSuccess({ vehicle }))
          )
      )
    )
  );

  deleteVehicle = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.deleteVehicle),
      switchMap(data =>
        this.dataService
          .delete<number>('vehicles/:id', { id: +data.vehicleId })
          .pipe(
            map(vehicleId =>
              VehicleActions.deleteVehicleSuccess({ vehicleId: +vehicleId })
            )
          )
      )
    )
  );
}
