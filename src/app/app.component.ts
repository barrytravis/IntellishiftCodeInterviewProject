import { Component, VERSION } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  AssignmentRequest,
  AssignmentResponse
} from './models/assignment.model';
import { Camera } from './models/camera.model';
import { Vehicle } from './models/vehicle.model';
import { DataService } from './services/data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  constructor() {}
}
