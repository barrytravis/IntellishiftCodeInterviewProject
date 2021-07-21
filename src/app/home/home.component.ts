import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CameraActions } from '../+store/actions';
import { CameraReducer } from '../+store/reducers';
import { CameraSelector } from '../+store/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentTab: string = 'assignment';

  constructor(private readonly store: Store<CameraReducer.CameraState>) {}

  ngOnInit() {
    this.store.dispatch(CameraActions.loadCameras());
    console.log(this.store.select(CameraSelector.selectCameras));
  }

  tabControl(selectedTab: string) {
    this.currentTab = selectedTab;
  }
}
