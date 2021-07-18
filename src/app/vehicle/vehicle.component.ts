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

  getVehicleById(id: number): Observable<Vehicle> {
    return this.data.get<Vehicle>('vehicles/:id', { id: id });
  }

  updateVehicle(id: number): Observable<Vehicle> {
    return this.data.put<Vehicle>('Vehicles/:id', { id: id });
  }

  deleteVehicle(id: number): void {
    this.data.delete('Vehicles/:id', { id: id });
  }
}
