import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CameraActions } from '../+store/actions';
import { CamerasState } from '../+store/reducers/camera.reducers';
import { CameraSelector } from '../+store/selectors';
import { Actions, ofType } from '@ngrx/effects';
import { Camera } from '../models/camera.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentTab: string = 'assignment';

  constructor(
    private readonly store: Store<CamerasState>,
    private readonly actions$: Actions
  ) {}

  ngOnInit() { }

  tabControl(selectedTab: string) {
    this.currentTab = selectedTab;
  }
}
