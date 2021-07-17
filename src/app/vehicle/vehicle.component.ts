import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  vehicles: Vehicle[] = [];
  vehicleEntryForm: FormGroup;

  constructor(
    private data: DataService,
    private readonly formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.getVehicles().subscribe(data => this.vehicles = data);
  }

  openAddCameraDialog(){

  }

  buildForm(formValue: Vehicle){
    this.vehicleEntryForm = this.formBuilder.group({
      name: this.formBuilder.control(formValue.name)
    })
  }

  addVehicle() {
    this.data.post("vehicles/:id", { id: 3 }, { name: "car", CameraId: 1 });
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.data.get<Vehicle[]>("vehicles");
  }

  getVehicleById(id: number): Observable<Vehicle> {
    return this.data.get<Vehicle>("vehicles/:id", { id: id });
  }

  // updateVehicle(id: number): Observable<Vehicle> {
  //   return this.data.put<Vehicle>('Vehicles/:id', { id: id });
  // }

  deleteVehicle(id: number) { // : Observable<Vehicle> {
    //return this.data.put<Vehicle>('Vehicles/:id', { id: id });
  }
}