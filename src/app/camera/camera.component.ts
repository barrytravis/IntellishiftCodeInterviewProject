import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CameraActions } from '../+store/actions';
import { CamerasState } from '../+store/reducers/camera.reducers';
import { CameraSelector } from '../+store/selectors';
import { GenericMessageDialogComponent } from '../generic-message-dialog/generic-message-dialog.component';
import { Camera } from '../models/camera.model';
import { DataService } from '../services/data.service';

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
  }

  createCamera(newCamera: Camera) {
    if (!this.isExistingCameraId(newCamera.id)) {
      this.store.dispatch(CameraActions.createCamera({ camera: newCamera }));
    } else {
      this.openModal('This Camera ID is already used.');
    }
  }

  getCameras() {
    this.store.pipe(select(CameraSelector.getCameras)).subscribe(data => {
      console.log(data);
      this.cameras = this.filterCameraList([...data], this.searchInput);
    });
  }

  updateCamera(camera: Camera) {
    this.store.dispatch(CameraActions.updateCamera({ camera }));
  }

  deleteCamera(cameraId: number) {
    this.store.dispatch(CameraActions.deleteCamera({ cameraId }));
  }

  filterCameraList(cameras: Camera[], searchInput?: string): Camera[] {
    if (!searchInput) {
      return cameras;
    } else {
      return cameras.filter(
        x =>
          x.deviceNo === undefined ||
          x.deviceNo
            .toLocaleLowerCase()
            .includes(searchInput.toLocaleLowerCase())
      );
    }
  }

  addBlankCamera() {
    this.cameras.unshift(new Camera());
    this.filterCameraList(this.cameras, this.searchInput);
  }

  removeBlankCamera(index: number) {
    this.cameras.splice(index, 1);
    this.filterCameraList(this.cameras, this.searchInput);
  }

  isExistingCameraId(id: number): boolean {
    return this.cameras.findIndex(x => x.id === id) === -1;
  }

  public openModal(message: string) {
    this.dialog.open(GenericMessageDialogComponent, {
      data: message
    });
  }
}
