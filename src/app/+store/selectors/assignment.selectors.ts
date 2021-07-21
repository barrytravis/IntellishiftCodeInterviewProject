import { createSelector } from '@ngrx/store';
import { AssignmentState } from '../../+store/reducers/assignment.reducers';

export const selectAssignments = (state: AssignmentState) => state.assignments;