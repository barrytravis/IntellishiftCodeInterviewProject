import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  AssignmentActions,
  CameraActions,
  VehicleActions
} from '../+store/actions';
import { CamerasState } from '../+store/reducers/camera.reducers';
import { AssignmentSelector, CameraSelector, VehicleSelector } from '../+store/selectors';
import { Actions, ofType } from '@ngrx/effects';
import { Camera } from '../models/camera.model';
import { AssignmentsState } from '../+store/reducers/assignment.reducers';
import { VehiclesState } from '../+store/reducers/vehicle.reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentTab: string = 'assignment';

  constructor(
    private readonly camerasStore: Store<CamerasState>,
    private readonly vehiclesStore: Store<VehiclesState>,
    private readonly assignmentsStore: Store<AssignmentsState>,
    private readonly actions$: Actions
  ) {}

  ngOnInit() {
    this.loadData();
  }

  tabControl(selectedTab: string) {
    this.currentTab = selectedTab;
  }

  loadData() {
    this.camerasStore.dispatch(CameraActions.loadCameras());
    this.vehiclesStore.dispatch(VehicleActions.loadVehicles());
    this.assignmentsStore.dispatch(AssignmentActions.loadAssignments());
  }
}
