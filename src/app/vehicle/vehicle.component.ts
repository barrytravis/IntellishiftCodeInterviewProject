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

  constructor(
    private data: DataService
    ) { }

  ngOnInit() {
    this.getVehicles().subscribe(data => this.vehicles = data);
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.data.get<Vehicle[]>("vehicles");
  }

  getVehicleById(id: number): Observable<Vehicle> {
    return this.data.get<Vehicle>("vehicles/:id", { id: id });
  }

  addVehicle() {
    this.data.post("vehicles/:id", { id: 3 }, { name: "car", cameraId: 1 });
  }

}