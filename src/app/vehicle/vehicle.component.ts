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
  openVehicleCreate: boolean = false;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.getVehicles();
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
    this.data.put<Vehicle>('vehicles/:id', { id: vehicle.id }, { vehicle });

    this.getVehicles();
  }

  async deleteVehicle(id: number) {
    console.log('delete attempt:' + id);
    await this.data.delete('vehicles/:id', { id: id }).subscribe();

    this.getVehicles();
  }
}
