import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
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
    VehicleCameraAssignmentComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
