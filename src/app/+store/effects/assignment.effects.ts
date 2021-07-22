import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import { Injectable } from '@angular/core';
import { AssignmentActions } from '../../+store/actions';
import { Assignment, AssignmentRequest, AssignmentResponse } from '../../models/assignment.model';
import { EMPTY } from 'rxjs';
import { root } from 'rxjs/internal/util/root';
import { AssignmentsState } from '../../+store/reducers/assignment.reducers';
import { select, Store } from '@ngrx/store';

@Injectable()
export class AssignmentEffects {
  constructor(private dataService: DataService, private actions$: Actions, private store: Store<AssignmentsState>) {}

  loadAssignments = createEffect(() =>
    this.actions$.pipe(
      ofType(AssignmentActions.loadAssignments),
      switchMap(() => 
        this.dataService.get<AssignmentResponse[]>('Assignments').pipe(
          map(assignments => AssignmentActions.loadAssignmentsSuccess({ assignments }))
        )
      )
    )
  );

}