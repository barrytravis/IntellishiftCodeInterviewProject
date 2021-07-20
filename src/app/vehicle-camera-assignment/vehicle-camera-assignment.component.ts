import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GenericMessageDialogComponent } from '../generic-message-dialog/generic-message-dialog.component';
import {
  Assignment,
  AssignmentRequest,
  AssignmentResponse
} from '../models/assignment.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-vehicle-camera-assignment',
  templateUrl: './vehicle-camera-assignment.component.html',
  styleUrls: ['./vehicle-camera-assignment.component.css']
})
export class VehicleCameraAssignmentComponent implements OnInit {
  constructor(private data: DataService, public dialog: MatDialog) {}

  public assignments: AssignmentResponse[] = [];
  public originalAssignments: AssignmentResponse[] = [];
  public newAssignment: AssignmentResponse = null;
  public searchInput: string = '';

  ngOnInit() {
    this.getAssignments();
  }

  getAssignments() {
    this.data.get<AssignmentResponse[]>('assignments').subscribe(data => {
      this.originalAssignments = data.filter(x => x.deleted == false);
      this.filterAssignmentList();
    });
  }

  filterAssignmentList(searchInput?) {
    if (!searchInput) {
      this.assignments = this.originalAssignments;
    } else {
      this.assignments = this.originalAssignments.filter(x =>
        x.vehicleId === undefined ||
        x.vehicleId.toString().includes(searchInput.toString())
      );
    }
  }

  public createBlankAssignment() {
    this.newAssignment = new AssignmentResponse();
    this.filterAssignmentList(this.searchInput);
  }

  public removeBlankAssignment(){
    this.newAssignment = null;    
    this.filterAssignmentList(this.searchInput);
  }

  public async assign(assignment: AssignmentRequest) {
    this.newAssignment = null;

    if (
      !(await this.isCurrentlyAssigned(
        +assignment.cameraId,
        +assignment.vehicleId
      ))
    ) {
      this.data
        .post(
          'assignments',
          {},
          {
            cameraId: +assignment.cameraId,
            vehicleId: +assignment.vehicleId
          }
        )
        .subscribe(() => this.getAssignments());
    }
  }

  public unAssign(assignment: AssignmentResponse) {
    this.data
      .delete('assignments/:id', { id: assignment.id }, assignment)
      .subscribe(() => this.getAssignments());
  }

  public isCurrentlyAssigned(cameraId: number, vehicleId: number): boolean {
    let vehicleAssigned: boolean =
      this.originalAssignments.findIndex(x => x.vehicleId === vehicleId) != -1;
    let cameraAssigned: boolean =
      this.originalAssignments.findIndex(x => x.cameraId === cameraId) != -1;

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
