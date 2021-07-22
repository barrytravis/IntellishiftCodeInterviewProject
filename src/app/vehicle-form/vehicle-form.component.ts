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
  @Output() public deleteUnsubmittedVehicle = new EventEmitter<void>();
  
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
    let vehicleName: string = (vehicle?.id == null) ? '' : vehicle.name;
    let vehicleId: number = (vehicle?.id == null) ? null : vehicle.id;

    this.vehicleEntryForm = this.formBuilder.group({
      name: this.formBuilder.control({value: vehicleName, disabled: this.formIsReadOnly}, [Validators.required]),
      id: this.formBuilder.control({value: vehicleId, disabled: !this.isNewVehicle}, [Validators.required, Validators.pattern("^[0-9]*$")])
    });
  }

  submitForm() {    
    this.vehicleEntryForm.updateValueAndValidity();
    
    if(!this.vehicleEntryForm.invalid){
      let formVehicle: Vehicle = new Vehicle();
      let rawFormValue = this.vehicleEntryForm.getRawValue();
      formVehicle.name = rawFormValue.name;
      formVehicle.id = +rawFormValue.id;
      formVehicle.cameraId = +this.vehicle?.cameraId ?? null;

      if(this._vehicle.id != null){
        this.updateVehicle.emit(formVehicle)
      } else {
        this.createVehicle.emit(formVehicle);
      }
    }
  }

  allowEdit(){
    this.formIsReadOnly = false;
    this.vehicleEntryForm.get('name').enable({onlySelf: true});
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
  if (this._vehicle?.id != null || this._vehicle?.id != undefined){
    this.deleteVehicle.emit(this._vehicle.id);
  }
  else {
    this.deleteUnsubmittedVehicle.emit();
  }    
}
}