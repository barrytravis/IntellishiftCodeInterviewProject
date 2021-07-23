import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { CameraActions } from '../+store/actions';
import { CamerasState } from '../+store/reducers/camera.reducers';
import { CameraSelector } from '../+store/selectors';
import { GenericMessageDialogComponent } from '../generic-message-dialog/generic-message-dialog.component';
import { Camera } from '../models/camera.model';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  public cameras: Camera[] = [];
  public searchInput: string = '';

  constructor(
    private readonly store: Store<CamerasState>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCameras();
    this.filterCameraList(this.searchInput);
  }

  createCamera(newCamera: Camera) {
    if (!this.isExistingCameraId(newCamera.id)) {
      this.store.dispatch(CameraActions.createCamera({ camera: newCamera }));
    } else {
      this.openModal('This Camera ID is already used.');
    }

    this.searchInput = '';
  }

  getCameras() {
    this.store
      .pipe(select(CameraSelector.getCameras))
      .subscribe(data => (this.cameras = [...data]));
  }

  updateCamera(camera: Camera) {
    this.store.dispatch(CameraActions.updateCamera({ camera }));    
    this.searchInput = '';
  }

  deleteCamera(cameraId: number) {
    this.store.dispatch(CameraActions.deleteCamera({ cameraId }));
    this.searchInput = '';
  }

  filterCameraList(searchInput?: string) {
    if (searchInput) {
      this.cameras = this.cameras.filter(
        x =>
          x.deviceNo === undefined ||
          x.deviceNo
            .toLocaleLowerCase()
            .includes(searchInput.toLocaleLowerCase())
      );
    } else {
      this.getCameras();
    }
  }

  addBlankCamera() {
    this.cameras.unshift(new Camera());
  }

  removeBlankCamera(index: number) {
    this.cameras.splice(index, 1);
  }

  isExistingCameraId(id: number): boolean {
    return this.cameras.findIndex(x => x.id === id) !== -1;
  }

  public openModal(message: string) {
    this.dialog.open(GenericMessageDialogComponent, {
      data: message
    });
  }
}
