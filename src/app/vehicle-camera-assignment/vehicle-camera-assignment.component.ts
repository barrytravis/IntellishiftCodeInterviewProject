import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AssignmentResponse } from '../models/assignment.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-vehicle-camera-assignment',
  templateUrl: './vehicle-camera-assignment.component.html',
  styleUrls: ['./vehicle-camera-assignment.component.css']
})
export class VehicleCameraAssignmentComponent implements OnInit {
  constructor(private data: DataService) {}

  ngOnInit() {
    // this.getAssignments().subscribe(
    //   next => {
    //   },
    //   error => {
    //   },
    //   complete => {
    //   }
    // )
  }

  getAssignments() {
    return this.data.get<AssignmentResponse>('assignments');
  }

  assign() {
    this.data
      .post('assignments', {}, { cameraId: 0, vehicleId: 1 })
      .pipe(tap(r => console.log(r)))
      .subscribe();
  }
}
