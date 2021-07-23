import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { Injectable } from '@angular/core';
import { AssignmentActions } from '../../+store/actions';
import {
  Assignment,
  AssignmentRequest,
  AssignmentResponse
} from '../../models/assignment.model';
import { EMPTY } from 'rxjs';
import { root } from 'rxjs/internal/util/root';
import { AssignmentsState } from '../../+store/reducers/assignment.reducers';
import { select, Store } from '@ngrx/store';

@Injectable()
export class AssignmentEffects {
  constructor(
    private dataService: DataService,
    private actions$: Actions,
    private store: Store<AssignmentsState>
  ) {}

  loadAssignments = createEffect(() =>
    this.actions$.pipe(
      ofType(AssignmentActions.loadAssignments),
      switchMap(() =>
        this.dataService
          .get<AssignmentResponse[]>('assignments')
          .pipe(
            map(assignments =>
              AssignmentActions.loadAssignmentsSuccess({ assignments })
            )
          )
      )
    )
  );

  createAssignment = createEffect(() =>
    this.actions$.pipe(
      ofType(AssignmentActions.createAssignment),
      switchMap(data =>
        this.dataService
          .post<AssignmentResponse>(
            'assignments',
            {},
            {
              cameraId: +data.assignment.cameraId,
              vehicleId: +data.assignment.vehicleId
            }
          )
          .pipe(
            map(assignment =>
              AssignmentActions.createAssignmentSuccess({ assignment })
            )
          )
      )
    )
  );

  // updateAssignment = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AssignmentActions.updateAssignment),
  //     switchMap((data) =>
  //       this.dataService
  //         .put<AssignmentResponse>('Assignments', {}, data.assignment)
  //         .pipe(
  //           map(assignment =>
  //             AssignmentActions.updateAssignmentSuccess({ assignment })
  //           )
  //         )
  //     )
  //   )
  // );

  deleteAssignment = createEffect(() =>
    this.actions$.pipe(
      ofType(AssignmentActions.deleteAssignment),
      switchMap(data =>
        this.dataService
          .delete<AssignmentResponse>(
            'assignments/:id',
            { id: data.assignment.id },
            {
              cameraId: +data.assignment.cameraId,
              vehicleId: +data.assignment.vehicleId,
              dateCreated: data.assignment.dateCreated,
              deleted: true,
              id: +data.assignment.id
            }
          )
          .pipe(
            map(assignment =>
              AssignmentActions.deleteAssignmentSuccess({ assignment })
            )
          )
      )
    )
  );
}
