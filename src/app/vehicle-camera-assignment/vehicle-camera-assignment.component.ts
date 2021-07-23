import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AssignmentActions } from '../+store/actions';
import { AssignmentsState } from '../+store/reducers/assignment.reducers';
import {
  AssignmentSelector,
  VehicleSelector,
  CameraSelector
} from '../+store/selectors';
import { GenericMessageDialogComponent } from '../generic-messages-dialog/generic-messages-dialog.component';
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
      .subscribe(
        data => (this.assignments = [...data].filter(x => x.deleted == false))
      );
  }

  public async createAssignment(assignment: AssignmentRequest) {
    this.newAssignment = null;

    if (await this.assignmentIsValid(assignment)) {
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

  public assignmentIsValid(assignment: AssignmentRequest): boolean {
    let messages: string[] = [];
    let vehicleId: number = +assignment.vehicleId;
    let cameraId: number = +assignment.cameraId;

    let vehicleAssigned: boolean =
      this.assignments.findIndex(x => x.vehicleId === vehicleId) != -1;

    let cameraAssigned: boolean =
      this.assignments.findIndex(x => x.cameraId === cameraId) != -1;

    let vehicleExists: boolean = false;
    this.store
      .pipe(select(VehicleSelector.getVehicles))
      .subscribe(
        vehicles =>
          (vehicleExists = vehicles.findIndex(x => x.id === vehicleId) != -1)
      );

    let cameraExists: boolean = false;
    this.store
      .pipe(select(CameraSelector.getCameras))
      .subscribe(
        cameras =>
          (cameraExists = cameras.findIndex(x => x.id === cameraId) != -1)
      );

    if (!vehicleExists) {
      messages.push('Vehicle ID: ' + vehicleId.toString() + ' does not exist.');
    }
    if (!cameraExists) {
      messages.push('Camera ID: ' + cameraId.toString() + ' does not exist.');
    }
    if (vehicleAssigned) {
      messages.push(
        'Vehicle ID: ' + vehicleId.toString() + ' is already assigned.'
      );
    }
    if (cameraAssigned) {
      messages.push(
        'Camera ID: ' + cameraId.toString() + ' is already assigned.'
      );
    }
    if (cameraAssigned || vehicleAssigned) {
      messages.push('Please unassign before making a new assignment.');
    }

    this.openModal(messages);

    return false;
  }

  public openModal(messages: string[]) {
    const dialogRef = this.dialog.open(GenericMessageDialogComponent, {
      data: messages
    });

    dialogRef.afterClosed().subscribe(() => this.getAssignments());
  }
}
