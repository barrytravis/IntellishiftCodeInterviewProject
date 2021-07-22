import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AssignmentActions } from '../+store/actions';
import { AssignmentsState } from '../+store/reducers/assignment.reducers';
import { AssignmentSelector } from '../+store/selectors';
import { GenericMessageDialogComponent } from '../generic-message-dialog/generic-message-dialog.component';
import {
  Assignment,
  AssignmentRequest,
  AssignmentResponse
} from '../models/assignment.model';

@Component({
  selector: 'app-vehicle-camera-assignment',
  templateUrl: './vehicle-camera-assignment.component.html',
  styleUrls: ['./vehicle-camera-assignment.component.css']
})
export class VehicleCameraAssignmentComponent implements OnInit {
  constructor(
    private readonly store: Store<AssignmentsState>,
    public dialog: MatDialog
  ) {}

  public assignments: AssignmentResponse[] = [];
  public newAssignment: AssignmentResponse = null;
  public searchInput: string = '';

  ngOnInit() {
    this.getAssignments();
    this.filterAssignmentList(this.searchInput);
  }

  getAssignments() {
    this.store
      .pipe(select(AssignmentSelector.getAssignments))
      .subscribe(data => {
        console.log(data);
        this.assignments = [...data].filter(x => x.deleted == false);
      });
  }

  public async createAssignment(assignment: AssignmentRequest) {
    this.newAssignment = null;

    console.log(assignment);

    if (
      !(await this.isCurrentlyAssigned(
        +assignment.cameraId,
        +assignment.vehicleId
      ))
    ) {
      this.store.dispatch(AssignmentActions.createAssignment({ assignment }));
    }
  }

  public deleteAssignment(assignment: AssignmentResponse) {
    this.store.dispatch(AssignmentActions.deleteAssignment({ assignment }));
  }

  filterAssignmentList(searchInput?) {
    if (searchInput) {
      this.assignments = this.assignments.filter(x => {
        x.vehicleId === undefined ||
          x.vehicleId.toString().includes(searchInput.toString());
      });
    } else {
      this.getAssignments();
    }
  }

  public createBlankAssignment() {
    this.newAssignment = new AssignmentResponse();
  }

  public removeBlankAssignment() {
    this.newAssignment = null;
  }

  public isCurrentlyAssigned(cameraId: number, vehicleId: number): boolean {
    let vehicleAssigned: boolean =
      this.assignments.findIndex(x => x.vehicleId === vehicleId) != -1;
    let cameraAssigned: boolean =
      this.assignments.findIndex(x => x.cameraId === cameraId) != -1;

    if (vehicleAssigned && cameraAssigned) {
      this.openModal(
        'Both the vehicle and the camera are already assigned. Please unassign before making a new assignment.'
      );

      return true;
    } else if (vehicleAssigned) {
      this.openModal(
        'This vehicle is already assigned. Please unassign before making a new assignment.'
      );

      return true;
    } else if (cameraAssigned) {
      this.openModal(
        'This camera is already assigned. Please unassign before making a new assignment.'
      );

      return true;
    }

    return false;
  }

  public openModal(message: string) {
    const dialogRef = this.dialog.open(GenericMessageDialogComponent, {
      data: message
    });

    dialogRef.afterClosed().subscribe(() => this.getAssignments());
  }
}
