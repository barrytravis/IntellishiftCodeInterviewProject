import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Assignment, AssignmentResponse } from '../models/assignment.model';
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

    console.log("assignments");
    console.log(this.assignments);
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

  assign() {
    this.data
      .post('assignments', {}, { cameraId: 0, vehicleId: 1 })
      .pipe(tap(r => console.log(r)))
      .subscribe();
  }

  unAssign() {
    this.data
      .post('assignments', {}, { cameraId: 0, vehicleId: 1 })
      .pipe(tap(r => console.log(r)))
      .subscribe();
  }
}
