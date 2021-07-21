import { Action, createReducer, on } from '@ngrx/store';
import { AssignmentActions } from '../../+store/actions';
import { AssignmentResponse, AssignmentRequest, Assignment } from '../../models/assignment.model';

export interface AssignmentState {
  assignments: Array<AssignmentResponse>;
}

export const initialState: AssignmentState = { assignments: [] };

export const assignmentReducer = createReducer(
  initialState,
  on(AssignmentActions.createAssignment, (state, { assignment }) => ({
    assignments: [ ...state.assignments, assignment]
  })),
  on(AssignmentActions.updateAssignment, (state, { assignment }) => ({
    
  })),
  on(AssignmentActions.deleteAssignment, (state, { assignment }) => ({
    
  })),
);

export function reducer(state: AssignmentState | undefined, action: Action) {
  return assignmentReducer(state, action);
}
