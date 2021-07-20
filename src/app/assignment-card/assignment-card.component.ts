import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AssignmentRequest,
  AssignmentResponse
} from '../models/assignment.model';
import { Camera } from '../models/camera.model';
import { Vehicle } from '../models/vehicle.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-assignment-card',
  templateUrl: './assignment-card.component.html',
  styleUrls: ['./assignment-card.component.css']
})
export class AssignmentCardComponent implements OnInit {
  @Output() public createAssignment = new EventEmitter<AssignmentRequest>();
  @Output() public updateAssignment = new EventEmitter<AssignmentResponse>();
  @Output() public deleteAssignment = new EventEmitter<AssignmentResponse>();
  @Output() public deleteUnsubmittedAssignment = new EventEmitter<
    AssignmentResponse
  >();

  public _assignment: AssignmentResponse;
  public _camera: Camera;
  public _vehicle: Vehicle;
  public assignmentForm: FormGroup = new FormGroup({});

  @Input() public set assignment(assignment: AssignmentResponse) {
    console.log(assignment);
    this._assignment = assignment;
    this.isNewAssignment =
      this._assignment.id === null || this._assignment.id === undefined;

    if (!this.isNewAssignment) {
      this._vehicle = this.getVehicleById(assignment.vehicleId);
      this._camera = this.getCameraById(assignment.cameraId);
    }

    this.buildForm();
  }

  public isNewAssignment: boolean;
  unassignedVehicles: Vehicle[] = [];
  unassignedCameras: Camera[] = [];

  constructor(
    private data: DataService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  buildForm() {
    let cameraId: number
    if  (this._camera?.id != null || this._camera?.id != undefined){
      cameraId = this._camera.id;
    } else {
      cameraId = null;
    }

    let deviceNumber: string
    if  (this._camera?.deviceNo != null || this._camera?.deviceNo != undefined){
      deviceNumber = this._camera.deviceNo;
    } else {
      deviceNumber = '';
    }

    let vehicleName: string
    if  (this._vehicle?.name != null || this._vehicle?.name != undefined){
      vehicleName = this._vehicle.name;
    } else {
      vehicleName = '';
    }

    let vehicleId: number
    if  (this._vehicle?.id != null || this._vehicle?.id != undefined){
      vehicleId = this._vehicle.id;
    } else {
      vehicleId = null;
    }

    this.assignmentForm = this.formBuilder.group({
      cameraId: this.formBuilder.control({ value:cameraId, disabled: !this.isNewAssignment }, [Validators.required]),
      cameraNumber: this.formBuilder.control({ value: deviceNumber, disabled: !this.isNewAssignment }, [Validators.required]),
      vehicleId: this.formBuilder.control({ value: vehicleId, disabled: true }, [Validators.required]),
      vehicleName: this.formBuilder.control({ value: vehicleName, disabled: t}, [Validators.required])
    });
  }

  submitForm() {
    this.assignmentForm.updateValueAndValidity();

    if (!this.assignmentForm.invalid) {
      let formAssignment: AssignmentRequest = new AssignmentRequest();
      let rawFormValue = this.assignmentForm.getRawValue();
      formAssignment.cameraId = rawFormValue.cameraId;
      formAssignment.vehicleId = rawFormValue.vehicleId;
      this.createAssignment.emit(formAssignment);
    }
  }

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

  delAssignment() {
    this.deleteUnsubmittedAssignment.emit(this._assignment);
  }
}
