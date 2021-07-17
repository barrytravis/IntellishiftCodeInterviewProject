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
  cameras: Camera[];

  constructor(private data: DataService) {}

  ngOnInit() {
    this.getCameras().subscribe(data => this.cameras = data);
  }

  getCameras(): Observable<Camera[]> {
    return this.data.get<Camera[]>('cameras');
  }

  getCameraById(id: number): Observable<Camera> {
    return this.data.get<Camera>('cameras/:id', { id: id });
  }

  addCamera() {
    this.data.post(
      'cameras/:id',
      { id: 1 },
      { name: 'camera 3', vehicleId: 0 }
    );
  }
}
