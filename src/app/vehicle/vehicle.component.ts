import { Component, OnInit } from '@angular/core';
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

  constructor(private data: DataService) {}

  ngOnInit() {
    this.getVehicles();
  }

  addVehicle() {
    this.vehicles.push(new Vehicle());
  }

  createVehicle(newVehicle: Vehicle) {
    this.data
      .post(
        'vehicles/:id',
        { id: newVehicle.id },
        { name: newVehicle.name, cameraId: newVehicle.cameraId }
      )
      .subscribe(() => this.getVehicles());
  }

  getVehicles(): void {
    this.data
      .get<Vehicle[]>('vehicles')
      .subscribe(data => (this.vehicles = data));
  }

  getVehicleById(id: number): Vehicle {
    let vehicle: Vehicle;
    this.data
      .get<Vehicle>('vehicles/:id', { id: id })
      .subscribe(data => (vehicle = data));
    return vehicle;
  }

  updateVehicle(vehicle: Vehicle) {
    this.data
      .put<Vehicle>(
        'vehicles/:id',
        { id: vehicle.id },
        { id: vehicle.id, name: vehicle.name, cameraId: vehicle.cameraId }
      )
      .subscribe(() => this.getVehicles());
  }

  deleteVehicle(id: number) {
    this.data
      .delete('vehicles/:id', { id: id })
      .subscribe(() => this.getVehicles());
  }
}
