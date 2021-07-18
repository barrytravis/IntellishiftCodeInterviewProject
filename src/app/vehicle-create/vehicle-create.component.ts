import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Vehicle } from '../models/vehicle.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.css']
})
export class VehicleCreateComponent implements OnInit {
  @Output() public createVehicle = new EventEmitter<Vehicle>();
  @Output() public formClosed = new EventEmitter<boolean>();

  public vehicleEntryForm: FormGroup = new FormGroup({});

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.vehicleEntryForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      id: this.formBuilder.control('')
    });
  }

  submitForm() {
    let newVehicle: Vehicle = new Vehicle();
    newVehicle.id = this.vehicleEntryForm.get('id').value;
    newVehicle.name = this.vehicleEntryForm.get('name').value;
    this.createVehicle.emit(newVehicle);
    this.closeForm();
  }

  closeForm() {
    this.formClosed.emit();
  }
}
