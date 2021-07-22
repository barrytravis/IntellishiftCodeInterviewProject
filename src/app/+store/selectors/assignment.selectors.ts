import { AssignmentsState } from '../../+store/reducers/assignment.reducers';
import { AssignmentResponse } from '../../models/assignment.model';

export const selectAssignments = (state: AssignmentsState) => {
  return state.assignments
};
