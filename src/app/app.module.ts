import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { CameraComponent } from './camera/camera.component';
import { VehicleCameraAssignmentComponent } from './vehicle-camera-assignment/vehicle-camera-assignment.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { CameraFormComponent } from './camera-form/camera-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssignmentCardComponent } from './assignment-card/assignment-card.component';
import { GenericMessageDialogComponent } from './generic-message-dialog/generic-message-dialog.component';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './+store/reducers';
import { CameraEffects } from './+store/effects/camera.effects';
import { AssignmentEffects } from './+store/effects/assignment.effects';
import { VehicleEffects } from './+store/effects/vehicle.effects';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([CameraEffects, VehicleEffects, AssignmentEffects]),
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
  entryComponents: [GenericMessageDialogComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    VehicleComponent,
    CameraComponent,
    VehicleCameraAssignmentComponent,
    VehicleFormComponent,
    CameraFormComponent,
    AssignmentCardComponent,
    GenericMessageDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
