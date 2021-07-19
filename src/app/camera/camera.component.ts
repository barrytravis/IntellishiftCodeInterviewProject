import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Camera } from '../models/camera.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  public cameras: Camera[] = [];
  public searchInput: string;
  constructor(private data: DataService) {}

  ngOnInit() {
    this.getCameras();
  }

  filterCameraList(searchInputs) {
    console.log(searchInputs);
    this.cameras.filter(
      x => x.deviceNo.search(new RegExp(searchInputs, 'i')) == -1
    );
  }

  addCamera() {
    this.cameras.push(new Camera());
  }

  createCamera(newCamera: Camera) {
    this.data
      .post(
        'cameras/:id',
        { id: newCamera.id },
        { deviceNo: newCamera.deviceNo, vehicleId: newCamera.vehicleId }
      )
      .subscribe(() => this.getCameras());
  }

  getCameras() {
    this.data.get<Camera[]>('cameras').subscribe(data => (this.cameras = data));
  }

  getCameraById(id: number): Camera {
    let camera: Camera;
    this.data
      .get<Camera>('cameras/:id', { id: id })
      .subscribe(data => (camera = data));

    return camera;
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
      .subscribe(() => this.getCameras());
  }

  deleteCamera(id: number) {
    this.data
      .delete('cameras/:id', { id: id })
      .subscribe(() => this.getCameras());
  }
}
