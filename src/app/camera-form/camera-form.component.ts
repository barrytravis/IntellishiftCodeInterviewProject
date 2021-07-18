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
  public formIsReadonly: boolean = true;

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
      deviceNo: this.formBuilder.control({value: camera?.deviceNo || '', disabled: this.formIsReadonly}, [Validators.required]),
      id: this.formBuilder.control({value: camera?.id || '', disabled: true}, [Validators.required, Validators.pattern("^[0-9]*$")]),
      vehicleId: this.formBuilder.control({value: camera?.vehicleId || '', disabled: this.formIsReadonly}, [Validators.pattern("^[0-9]*$")])
    });
  }

  submitForm() {
    let formCamera: Camera = new Camera();

    console.log(formCamera);
    console.log(this.cameraEntryForm.getRawValue());
    console.log(this.cameraEntryForm.get('id').value);

    if(this.camera.id != null){
      this.updateCamera.emit(formCamera)
    } else {
      this.createCamera.emit(formCamera);
    }
  }

  allowEdit(){
    this.formIsReadonly = false;
    this.cameraEntryForm.get('deviceNo').enable({onlySelf: true});
    this.cameraEntryForm.get('vehicleId').enable({onlySelf: true});
  }

  resetForm(){
    this.buildForm(this.camera);
    this.formIsReadonly = true;
  }

  delete(){
    this.deleteCamera.emit(this.camera.id);
  }
}
