import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '../models/camera.model';

@Component({
  selector: 'app-camera-form',
  templateUrl: './camera-form.component.html',
  styleUrls: ['./camera-form.component.css']
})
export class CameraFormComponent implements OnInit {
  @Output() public createCamera = new EventEmitter<Camera>();
  @Output() public updateCamera = new EventEmitter<Camera>();
  @Output() public deleteCamera = new EventEmitter<number>();
  @Input() public camera: Camera;

  public cameraEntryForm: FormGroup = new FormGroup({});
  public readonly: boolean = true;
  
  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    console.log(this.camera);
    if(this.camera.id != null){
      this.buildForm(this.camera);
    } else {
      this.buildForm();
    }
  }

  buildForm(camera?: Camera) {
    this.cameraEntryForm = this.formBuilder.group({
      deviceNo: this.formBuilder.control(camera?.deviceNo || '', Validators.required),
      id: this.formBuilder.control(camera?.id || '', [Validators.required, Validators.pattern("^[0-9]*$")]),
      vehicleId: this.formBuilder.control(camera?.vehicleId || '', [Validators.pattern("^[0-9]*$")])
    });
  }

  submitForm() {
    let formCamera: Camera = new Camera();
    formCamera.id = this.cameraEntryForm.get('id').value;
    formCamera.deviceNo = this.cameraEntryForm.get('deviceNo').value;
    formCamera.vehicleId = this.cameraEntryForm.get('vehicleId').value;

    if(this.camera.id != null){
      this.updateCamera.emit(formCamera)
    } else {
      this.createCamera.emit(formCamera);
    }
  }

  resetForm(){
    this.buildForm(this.camera);
    this.readonly = true;
  }

  delete(){
    this.deleteCamera.emit(this.camera.id);
  }
}
