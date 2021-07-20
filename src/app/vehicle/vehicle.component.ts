import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GenericMessageDialogComponent } from '../generic-message-dialog/generic-message-dialog.component';
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

  constructor(private data: DataService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getVehicles();
  }

  filterVehicleList(searchInput?) {
    if (!searchInput) {
      this.vehicles = this.originalVehicles;
    } else {
      this.vehicles = this.originalVehicles.filter(
        x =>
          x.name === undefined ||
          x.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
      );
    }
  }

  addBlankVehicle() {
    this.originalVehicles.unshift(new Vehicle());
    this.filterVehicleList(this.searchInput);
  }

  removeBlankVehicle(index: number) {
    this.originalVehicles.splice(index, 1);
    this.filterVehicleList(this.searchInput);
  }

  createVehicle(newVehicle: Vehicle) {
    if (!this.isExistingVehicleId(newVehicle.id)) {
      this.data
        .post(
          'vehicles/:id',
          { id: newVehicle.id },
          { name: newVehicle.name, cameraId: newVehicle.cameraId }
        )
        .subscribe(() => this.getVehicles(), err => console.log(err));
    } else {
      this.openModal('This Vehicle ID is already used.');
    }
  }

  getVehicles(): void {
    this.data.get<Vehicle[]>('vehicles').subscribe(data => {
      this.originalVehicles = data;
      this.filterVehicleList();
    });
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

  isExistingVehicleId(id: number): boolean {
    return this.originalVehicles.findIndex(x => x.id === id) === -1;
  }

  public openModal(message: string) {
    const dialogRef = this.dialog.open(GenericMessageDialogComponent, {
      data: message
    });
  }
}
