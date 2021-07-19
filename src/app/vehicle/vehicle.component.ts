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
  public vehicles: Vehicle[] = [];
  public originalVehicles: Vehicle[] = [];
  public searchInput: string = '';

  constructor(private data: DataService) {}

  ngOnInit() {
    this.getVehicles();
    console.log(this.vehicles);
  }

  filterVehicleList(searchInput?) {
    if (!searchInput) {
      this.vehicles = this.originalVehicles;
    } else {
      this.vehicles = this.originalVehicles.filter(x =>
        x.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
      );
    }
  }

  addBlankVehicle() {
    this.vehicles.unshift(new Vehicle());
  }

  createVehicle(newVehicle: Vehicle) {
    this.data
      .post(
        'vehicles/:id',
        { id: newVehicle.id },
        { name: newVehicle.name, cameraId: newVehicle.cameraId }
      )
      .subscribe(() => this.getVehicles(), err => console.log(err));
  }

  getVehicles(): void {
    this.data.get<Vehicle[]>('vehicles').subscribe(data => {
      this.originalVehicles = data;
      this.filterVehicleList();
    });
  }

  getVehicleById(id: number): Vehicle {
    let vehicle: Vehicle;
    this.data.get<Vehicle>('vehicles/:id', { id: id }).subscribe(data => {
      vehicle = data;
    });
    return vehicle;
  }

  updateVehicle(vehicle: Vehicle) {
    this.data
      .put<Vehicle>(
        'vehicles/:id',
        { id: vehicle.id },
        { id: vehicle.id, name: vehicle.name, cameraId: vehicle.cameraId }
      )
      .subscribe(() => this.getVehicles(), err => console.log(err));
  }

  deleteVehicle(id: number) {
    this.data
      .delete('vehicles/:id', { id: id })
      .subscribe(() => this.getVehicles());
  }
}
