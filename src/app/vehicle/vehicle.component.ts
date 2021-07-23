import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VehicleActions } from '../+store/actions';
import { VehiclesState } from '../+store/reducers/vehicle.reducers';
import { GenericMessageDialogComponent } from '../generic-message-dialog/generic-message-dialog.component';
import { VehicleSelector } from '../+store/selectors';
import { Vehicle } from '../models/vehicle.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  public vehicles: Vehicle[] = [];
  public searchInput: string = '';

  constructor(
    private readonly store: Store<VehiclesState>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getVehicles();
    this.filterVehicleList(this.searchInput);
  }

  createVehicle(newVehicle: Vehicle) {
    if (!this.isExistingVehicleId(newVehicle.id)) {
      this.store.dispatch(
        VehicleActions.createVehicle({ vehicle: newVehicle })
      );
    } else {
      this.openModal('This Vehicle ID is already used.');
    }
    
    this.searchInput = '';
  }

  getVehicles(): void {
    this.store
      .pipe(select(VehicleSelector.getVehicles))
      .subscribe(data => (this.vehicles = [...data]));
  }

  updateVehicle(vehicle: Vehicle) {
    this.store.dispatch(VehicleActions.updateVehicle({ vehicle }));
    this.searchInput = '';
  }

  deleteVehicle(vehicleId: number) {
    this.store.dispatch(VehicleActions.deleteVehicle({ vehicleId }));
  }

  filterVehicleList(searchInput?) {
    if (searchInput) {
      this.vehicles = this.vehicles.filter(
        x =>
          x.name === undefined ||
          x.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
      );
    } else {
      this.getVehicles();
    }
  }

  addBlankVehicle() {
    this.vehicles.unshift(new Vehicle());
  }

  removeBlankVehicle(index: number) {
    this.vehicles.splice(index, 1);
  }

  isExistingVehicleId(id: number): boolean {
    return this.vehicles.findIndex(x => x.id === id) !== -1;
  }

  public openModal(message: string) {
    this.dialog.open(GenericMessageDialogComponent, {
      data: message
    });
  }
}
