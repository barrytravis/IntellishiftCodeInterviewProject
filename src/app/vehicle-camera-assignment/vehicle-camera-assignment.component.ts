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
      this.originalAssignments = data;
      console.log(data);
      this.filterAssignmentList();
    });
  }

  filterAssignmentList(searchInput?) {
    if (!searchInput) {
      this.assignments = this.originalAssignments;
    } else {
      this.assignments = this.originalAssignments.filter(x =>
        x.vehicleId.toString().includes(searchInput.toString())
      );
    }
  }

  public createBlankAssignment() {
    this.newAssignment = new AssignmentResponse();
  }

  public updateAssignment(assignment: AssignmentResponse) {
    this.unAssign(assignment.id);
    this.assign(assignment);
  }

  public async assign(assignment: AssignmentRequest) {
    if (
      !(await this.isCurrentlyAssigned(
        assignment.cameraId,
        assignment.vehicleId
      ))
    ) {
      this.data
        .post(
          'assignments',
          {},
          { cameraId: assignment.cameraId, vehicleId: assignment.vehicleId }
        )
        .pipe(tap(r => console.log(r)))
        .subscribe();
    }
  }

  public unAssign(assignmentId: number) {
    this.data
      .delete('assignments', { id: assignmentId })
      .pipe(tap(r => console.log(r)))
      .subscribe();
  }

  public isCurrentlyAssigned(cameraId: number, vehicleId: number): boolean {
    let vehicleAssigned: boolean =
      this.originalAssignments.findIndex(x => x.vehicleId) != -1;
    let cameraAssigned: boolean =
      this.originalAssignments.findIndex(x => x.cameraId) != -1;

    if (vehicleAssigned && cameraAssigned) {
      this.openIsAssignedModal(
        'Both the vehicle and the camera are already assigned, please unassign before making a new assignment.'
      );
      return true;
    } else {
      if (vehicleAssigned) {
        this.openIsAssignedModal(
          'Thi vehicle is already assigned, please unassign before making a new assignment.'
        );
        return true;
      } else {
        this.openIsAssignedModal(
          'This camera is already assigned, please unassign before making a new assignment.'
        );
        return true;
      }
    }

    return false;
  }

  public openIsAssignedModal(message: string) {
    const dialogRef = this.dialog.open(GenericMessageDialogComponent, {
      width: '250px',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(() => this.getAssignments());
  }
}
