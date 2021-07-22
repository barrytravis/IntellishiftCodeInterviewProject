import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CameraActions } from '../+store/actions';
import { CameraState } from '../+store/reducers/camera.reducers';
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
    private readonly store: Store<CameraState>,
    private readonly actions$: Actions
  ) {}

  ngOnInit() {
    this.store.dispatch(CameraActions.loadCameras());

    this.store
      .pipe(select(CameraSelector.selectCameras))
      .subscribe(x => console.log(x));

    this.store.dispatch(CameraActions.deleteCamera( {cameraId: 4} ));
    // this.store
    //   .select(CameraSelector.selectAllCameras)
    //   .subscribe(x => console.log(x));
  }

  tabControl(selectedTab: string) {
    this.currentTab = selectedTab;
  }
}
