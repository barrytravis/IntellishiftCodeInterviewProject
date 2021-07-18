import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Camera } from '../models/camera.model';

@Component({
  selector: 'app-camera-create',
  templateUrl: './camera-create.component.html',
  styleUrls: ['./camera-create.component.css']
})
export class CameraCreateComponent implements OnInit {
  @Output() public createCamera = new EventEmitter<Camera>();
  @Output() public updateCamera = new EventEmitter<Camera>();
  @Output() public formClosed = new EventEmitter<boolean>();
  @Input() public camera: Camera;

  public cameraEntryForm: FormGroup = new FormGroup({});

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    if (this.camera) {
      this.buildForm(this.camera);
    } else {
      this.buildForm();
    }
  }

  buildForm(camera?: Camera) {
    this.cameraEntryForm = this.formBuilder.group({
      deviceNo: this.formBuilder.control(camera?.deviceNo || ''),
      id: this.formBuilder.control(camera?.id || ''),
      vehicleId: this.formBuilder.control(camera?.vehicleId || '')
    });
  }

  submitForm() {
    let formCamera: Camera = new Camera();
    formCamera.id = this.cameraEntryForm.get('id').value;
    formCamera.deviceNo = this.cameraEntryForm.get('deviceNo').value;
    formCamera.vehicleId = this.cameraEntryForm.get('vehicleId').value;

    if(this.camera){
      this.updateCamera.emit(formCamera)
    } else {
      this.createCamera.emit(formCamera);
    }
    this.closeForm();
  }

  closeForm() {
    this.formClosed.emit();
  }
}
