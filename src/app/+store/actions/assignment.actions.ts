import { createAction, props } from '@ngrx/store';
import { AssignmentResponse, AssignmentRequest, Assignment } from '../../models/assignment.model';

export const loadAssignments = createAction('[ASSIGNMENT] LoadAssignments');

export const loadAssignmentsSuccess = createAction(
  '[ASSIGNMENT] LoadAssignmentsSuccess',
  props<{ assignments: AssignmentResponse[] }>()
);

export const createAssignment = createAction(
  '[ASSIGNMENT] CreateAssignment',
  props<{ assignment: AssignmentRequest }>()
);

export const createAssignmentSuccess = createAction(
  '[ASSIGNMENT] CreateAssignmentSuccess',
  props<{ assignment: AssignmentResponse }>()
);

export const updateAssignment = createAction(
  '[ASSIGNMENT] UpdateAssignment',
  props<{ assignment: AssignmentRequest }>()
);

export const updateAssignmentSuccess = createAction(
  '[ASSIGNMENT] UpdateAssignmentSuccess',
  props<{ assignment: AssignmentResponse }>()
);

export const deleteAssignment = createAction(
  '[ASSIGNMENT] DeleteAssignment',
  props<{ assignment: AssignmentResponse }>()
);

export const deleteAssignmentSuccess = createAction(
  '[ASSIGNMENT] DeleteAssignmentSuccess',
  props<{ assignmentId: number }>()
);
