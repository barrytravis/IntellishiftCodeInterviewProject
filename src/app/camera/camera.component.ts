import { ClassNamesMigration } from '@angular/cdk/schematics/ng-update/migrations/class-names';
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
  cameras: Camera[] = [];
  openCameraCreate: boolean = false;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.getCameras();
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
