import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { CameraComponent } from './camera/camera.component';
import { VehicleCameraAssignmentComponent } from './vehicle-camera-assignment/vehicle-camera-assignment.component';
import { VehicleCreateComponent } from './vehicle-create/vehicle-create.component';
import { CameraFormComponent } from './camera-form/camera-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'vehicle', component: VehicleComponent },
      { path: 'camera', component: CameraComponent },
      { path: 'assignment', component: VehicleCameraAssignmentComponent }
    ])
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    VehicleComponent,
    CameraComponent,
    VehicleCameraAssignmentComponent,
    VehicleCreateComponent,
    CameraFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
