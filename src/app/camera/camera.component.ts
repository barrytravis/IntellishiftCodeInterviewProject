import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
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
  public originalCameras: Camera[] = [];
  public searchInput: string = '';

  constructor(private data: DataService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getCameras();
  }

  filterCameraList(searchInput?) {
    if (!searchInput) {
      this.cameras = this.originalCameras;
    } else {
      this.cameras = this.originalCameras.filter(
        x =>
          x.deviceNo === undefined ||
          x.deviceNo
            .toLocaleLowerCase()
            .includes(searchInput.toLocaleLowerCase())
      );
    }
  }

  addBlankCamera() {
    this.originalCameras.unshift(new Camera());
    this.filterCameraList(this.searchInput);
  }

  removeBlankCamera(index: number) {
    this.originalCameras.splice(index, 1);
    this.filterCameraList(this.searchInput);
  }

  createCamera(newCamera: Camera) {
    if (!this.isExistingCameraId(newCamera.id)) {
      this.data
        .post(
          'cameras/:id',
          { id: newCamera.id },
          { deviceNo: newCamera.deviceNo, vehicleId: null }
        )
        .subscribe(() => this.getCameras(), err => console.log(err));
    } else {
      this.openModal('This Camera ID is already used.');
    }
  }

  getCameras() {
    this.data.get<Camera[]>('cameras').subscribe(data => {
      this.originalCameras = data.sort(x => x.id);
      this.filterCameraList(this.searchInput);
    });
  }

  updateCamera(camera: Camera) {
    this.data
      .put<Camera>(
        'cameras/:id',
        { id: camera.id },
        {
          id: camera.id,
          deviceNo: camera.deviceNo,
          vehicleId: camera.vehicleId
        }
      )
      .subscribe(() => this.getCameras(), err => console.log(err));
  }

  deleteCamera(id: number) {
    this.data
      .delete('cameras/:id', { id: id })
      .subscribe(() => this.getCameras());
  }

  isExistingCameraId(id: number): boolean {
    return this.originalCameras.findIndex(x => x.id === id) === -1;
  }

  public openModal(message: string) {
    const dialogRef = this.dialog.open(GenericMessageDialogComponent, {
      data: message
    });
  }
}
