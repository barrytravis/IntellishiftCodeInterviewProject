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
  @Output() public successfulCreate = new EventEmitter<boolean>();
  @Output() public formClosed = new EventEmitter<boolean>();

  public vehicleEntryForm: FormGroup = new FormGroup({});

  constructor(
    private readonly formBuilder: FormBuilder,
    private data: DataService
  ) {}

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
    this.addVehicle(newVehicle);
  }

  closeForm() {
    this.formClosed.emit();
  }

  addVehicle(newVehicle: Vehicle) {
    this.data
      .post(
        'vehicles/:id',
        { id: newVehicle.id },
        { name: newVehicle.name, cameraId: null }
      )
      .subscribe(
        x => console.log(x),
        err => console.error(err),
        () => {
          this.successfulCreate.emit();
          this.formClosed.emit();
        }
      );
  }
}
