import { Action, createReducer, on } from '@ngrx/store';
import * as AssignmentActions from '../../+store/actions/assignment.actions';
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
  on(AssignmentActions.getAssignmentById, (state, {  }) => ({
    
  })),
  on(AssignmentActions.getAssignments, state => ({
    
  })),
  on(AssignmentActions.updateAssignment, (state, {  }) => ({
    
  })),
  on(AssignmentActions.deleteAssignment, (state, {  }) => ({
    
  })),
);

export function reducer(state: AssignmentState | undefined, action: Action) {
  return assignmentReducer(state, action);
}
