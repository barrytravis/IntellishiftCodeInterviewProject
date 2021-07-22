import { AssignmentsState } from '../../+store/reducers/assignment.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAssignmentsState = createFeatureSelector<AssignmentsState>('assignments');

export const getAssignments = createSelector(selectAssignmentsState, (state: AssignmentsState) => state.assignments)