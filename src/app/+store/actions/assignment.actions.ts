import { createAction, props } from '@ngrx/store';
import { AssignmentResponse, AssignmentRequest, Assignment } from '../../models/assignment.model';

export const createAssignment = createAction(
  '[ASSIGNMENT] CreateAssignment',
  props<{ assignment: AssignmentRequest }>()
);

export const updateAssignment = createAction(
  '[ASSIGNMENT] UpdateAssignment',
  props<{ assignment: AssignmentResponse }>()
);

export const deleteAssignment = createAction(
  '[ASSIGNMENT] DeleteAssignment',
  props<{ assignment: AssignmentResponse }>()
);