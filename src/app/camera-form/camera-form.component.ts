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
  public isNewCamera: boolean;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {    
    this.isNewCamera = !this.camera.id;

    if(!this.isNewCamera){
      this.buildForm(this.camera);
    } else {
      this.formIsReadonly = false;
      this.buildForm();
    }
  }

  buildForm(camera?: Camera) {
    this.cameraEntryForm = this.formBuilder.group({
      deviceNo: this.formBuilder.control({value: camera?.deviceNo || '', disabled: this.formIsReadonly}, [Validators.required]),
      id: this.formBuilder.control({value: camera?.id || '', disabled: !this.isNewCamera}, [Validators.required, Validators.pattern("^[0-9]*$")]),
      vehicleId: this.formBuilder.control({value: camera?.vehicleId || '', disabled: this.formIsReadonly}, [Validators.pattern("^[0-9]*$")])
    });
  }

  submitForm() {
    let formCamera: Camera = new Camera();
    let rawFormValue = this.cameraEntryForm.getRawValue();
    formCamera.deviceNo = rawFormValue.deviceNo;
    formCamera.vehicleId = rawFormValue.vehicleId;
    formCamera.id = rawFormValue.id;

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
    if(this.isNewCamera){
      this.delete();
    }

    this.formIsReadonly = true;
    this.cameraEntryForm = null;
    this.buildForm(this.camera);
  }

  delete(){
    this.deleteCamera.emit(this.camera.id);
  }
}
