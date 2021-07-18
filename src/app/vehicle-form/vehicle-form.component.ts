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
  @Input() public vehicle: Vehicle;

  public vehicleEntryForm: FormGroup = new FormGroup({});
  public formIsReadonly: boolean = true;
  public isNewVehicle: boolean;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {    
    this.isNewVehicle = !this.vehicle.id;

    if(!this.isNewVehicle){
      this.buildForm(this.vehicle);
    } else {
      this.formIsReadonly = false;
      this.buildForm();
    }
  }

  buildForm(vehicle?: Vehicle) {
    this.vehicleEntryForm = this.formBuilder.group({
      name: this.formBuilder.control({value: vehicle?.name || '', disabled: this.formIsReadonly}, [Validators.required]),
      id: this.formBuilder.control({value: vehicle?.id || '', disabled: !this.isNewVehicle}, [Validators.required, Validators.pattern("^[0-9]*$")])
    });
  }

  submitForm() {    
    this.vehicleEntryForm.updateValueAndValidity();
    
    if(!this.vehicleEntryForm.invalid){
      let formCamera: Vehicle = new Vehicle();
      let rawFormValue = this.vehicleEntryForm.getRawValue();
      formCamera.name = rawFormValue.name;
      formCamera.id = rawFormValue.id;

      if(this.vehicle.id != null){
        this.updateVehicle.emit(formCamera)
      } else {
        this.createVehicle.emit(formCamera);
      }
    }
  }

  allowEdit(){
    this.formIsReadonly = false;
    this.vehicleEntryForm.get('deviceNo').enable({onlySelf: true});
    this.vehicleEntryForm.get('vehicleId').enable({onlySelf: true});
  }

  resetForm(){
    if(this.isNewVehicle){
      this.delete();
    }

    this.formIsReadonly = true;
    this.vehicleEntryForm = null;
    this.buildForm(this.vehicle);
  }

  delete(){
    this.deleteVehicle.emit(this.vehicle.id);
  }
}