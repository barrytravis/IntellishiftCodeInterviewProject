import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssignmentResponse } from '../models/assignment.model';
import { Camera } from '../models/camera.model';
import { Vehicle } from '../models/vehicle.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-assignment-card',
  templateUrl: './assignment-card.component.html',
  styleUrls: ['./assignment-card.component.css']
})
export class AssignmentCardComponent implements OnInit {
  @Output() public createCamera = new EventEmitter<AssignmentResponse>();
  @Output() public updateCamera = new EventEmitter<AssignmentResponse>();
  @Output() public deleteCamera = new EventEmitter<number>();
  @Output() public deleteUnsubmittedCamera = new EventEmitter<AssignmentResponse>();

  public _assignment: AssignmentResponse;
  @Input() public set assignment(assignment: AssignmentResponse) {
    this._assignment = assignment;
    this.isNewAssignment =
      this._assignment.id === null || this._assignment.id === undefined;

    console.log('inside card comp');
    console.log(assignment);

    if (!this.isNewAssignment) {
      this.buildForm(this._assignment);
    } else {
      this.formIsReadOnly = false;
      this.buildForm();
    }
  }

  public formIsReadOnly: boolean;
  public isNewAssignment: boolean;
  public isEdit: boolean = false;
  unassignedVehicles: Vehicle[] = [];
  unassignedCameras: Camera[] = [];

  constructor(private data: DataService) {}

  ngOnInit() {}

  buildForm(assignment?: AssignmentResponse) {}

  getUnassignedVehicles() {}

  getUnassignedCameras() {}

  getCameraById(id: number): Camera {
    let camera: Camera;
    this.data
      .get<Camera>('cameras/:id', { id: id })
      .subscribe(data => (camera = data));

    return camera;
  }

  getVehicleById(id: number): Vehicle {
    let vehicle: Vehicle;
    this.data.get<Vehicle>('vehicles/:id', { id: id }).subscribe(data => {
      vehicle = data;
    });
    return vehicle;
  }
}
