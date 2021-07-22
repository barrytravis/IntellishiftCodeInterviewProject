import { AssignmentResponse } from '../../models/assignment.model';

export interface AssignmentState {
  assignments: Array<AssignmentResponse>;
}

export const selectAssignments = (state: AssignmentState) => {
  return state.assignments
};
