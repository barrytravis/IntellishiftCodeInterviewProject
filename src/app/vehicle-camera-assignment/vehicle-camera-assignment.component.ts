import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Assignment, AssignmentRequest, AssignmentResponse } from '../models/assignment.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-vehicle-camera-assignment',
  templateUrl: './vehicle-camera-assignment.component.html',
  styleUrls: ['./vehicle-camera-assignment.component.css']
})
export class VehicleCameraAssignmentComponent implements OnInit {
  constructor(private data: DataService) {}

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

  createBlankAssignment(){
    this.newAssignment = new AssignmentResponse();
  }

  updateAssignment(assignment: AssignmentResponse){
    this.unAssign(assignment.id);
    this.assign(assignment);
  }

  assign(assignment: AssignmentRequest) {
    this.data
      .post('assignments', {}, { cameraId: assignment.cameraId, vehicleId: assignment.vehicleId })
      .pipe(tap(r => console.log(r)))
      .subscribe();
  }

  unAssign(assignmentId: number) {
    this.data
      .delete('assignments', { id: assignmentId })
      .pipe(tap(r => console.log(r)))
      .subscribe();
  }
}
