import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { AssignmentActions } from '../../+store/actions';
import {
  Assignment,
  AssignmentRequest,
  AssignmentResponse
} from '../../models/assignment.model';
import produce from 'immer';

export interface AssignmentsState {
  assignments: Array<AssignmentResponse>;
}

export const assignmentFeatureKey = 'assignments';
export const adapter: EntityAdapter<AssignmentResponse> = createEntityAdapter<
  AssignmentResponse
>();

export const initialState: AssignmentsState = adapter.getInitialState({
  assignments: []
});

export const assignmentReducer = createReducer(
  initialState,
  on(AssignmentActions.loadAssignmentsSuccess, (state, action) => ({
    assignments: action.assignments
  })),
  on(AssignmentActions.createAssignmentSuccess, (state, action) => ({
    assignments: [...state.assignments, action.assignment]
  })),
  on(AssignmentActions.updateAssignmentSuccess, (state, action) => ({
    assignments: state.assignments.map((value, index) =>
      index === action.assignment.id
        ? {
            ...value,
            vehicleId: action.assignment.vehicleId,
            cameraId: action.assignment.cameraId
          }
        : value
    )
  })),
  on(AssignmentActions.deleteAssignmentSuccess, (state, action) => ({
    assignments: state.assignments.map((value, index) =>
      index === action.assignment.id ? action.assignment : value
    )
  }))
);

export function reducer(state: AssignmentsState | undefined, action: Action) {
  return assignmentReducer(state, action);
}
