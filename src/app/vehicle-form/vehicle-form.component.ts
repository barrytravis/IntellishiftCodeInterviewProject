import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from '../models/vehicle.model';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  @Output() public createVehicle = new EventEmitter<Vehicle>();
  @Output() public updateVehicle = new EventEmitter<Vehicle>();
  @Output() public deleteVehicle = new EventEmitter<number>();
  private _vehicle: Vehicle;
  @Input() public set vehicle(vehicle: Vehicle) {
    this._vehicle = vehicle;
    this.isNewVehicle = (this._vehicle.id === null || this._vehicle.id === undefined);

    if(!this.isNewVehicle){
      this.buildForm(this._vehicle);
    } else {
      this.formIsReadOnly = false;
      this.buildForm();
    }
  };

  public vehicleEntryForm: FormGroup = new FormGroup({});
  public formIsReadOnly: boolean = true;
  public isNewVehicle: boolean;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {}

  buildForm(vehicle?: Vehicle) {
    let vehicleName: string
    if  (vehicle?.name != null || vehicle?.name != undefined){
      vehicleName = vehicle.name;
    } else {
      vehicleName = '';
    }

    let vehicleId: number
    if  (vehicle?.id != null || vehicle?.id != undefined){
      vehicleId = vehicle.id;
    } else {
      vehicleId = null;
    }

    let cameraIdNumber: number
    if  (vehicle?.cameraId != null || vehicle?.cameraId != undefined){
      cameraIdNumber = vehicle.cameraId;
    } else {
      cameraIdNumber = null;
    }

    this.vehicleEntryForm = this.formBuilder.group({
      name: this.formBuilder.control({value: vehicleName, disabled: this.formIsReadOnly}, [Validators.required]),
      id: this.formBuilder.control({value: vehicleId, disabled: !this.isNewVehicle}, [Validators.required, Validators.pattern("^[0-9]*$")]),
      cameraId: this.formBuilder.control({value: cameraIdNumber, disabled: !this.isNewVehicle}, )
    });
  }

  submitForm() {    
    this.vehicleEntryForm.updateValueAndValidity();
    
    if(!this.vehicleEntryForm.invalid){
      let formCamera: Vehicle = new Vehicle();
      let rawFormValue = this.vehicleEntryForm.getRawValue();
      formCamera.name = rawFormValue.name;
      formCamera.id = rawFormValue.id;

      if(this._vehicle.id != null){
        this.updateVehicle.emit(formCamera)
      } else {
        this.createVehicle.emit(formCamera);
      }
    }
  }

  allowEdit(){
    this.formIsReadOnly = false;
    this.vehicleEntryForm.get('name').enable({onlySelf: true});
    this.vehicleEntryForm.get('cameraId').enable({onlySelf: true});
  }

  resetForm(){
    if(this.isNewVehicle){
      this.delete();
    }

    this.formIsReadOnly = true;
    this.vehicleEntryForm = null;
    this.buildForm(this._vehicle);
  }

  delete(){
    this.deleteVehicle.emit(this._vehicle.id);
  }
}