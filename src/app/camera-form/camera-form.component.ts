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
  public _camera: Camera;
  @Input() public set camera(camera: Camera) {
    this._camera = camera;
    this.isNewCamera = !this._camera.id;
  };

  public cameraEntryForm: FormGroup = new FormGroup({});
  public formIsReadOnly: boolean = true;
  public isNewCamera: boolean;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    if(!this.isNewCamera){
      this.buildForm(this._camera);
    } else {
      this.formIsReadOnly = false;
      this.buildForm();
    }
  }

  buildForm(camera?: Camera) {
    this.cameraEntryForm = this.formBuilder.group({
      deviceNo: this.formBuilder.control({value: camera?.deviceNo || '', disabled: this.formIsReadOnly}, [Validators.required]),
      id: this.formBuilder.control({value: camera?.id || '', disabled: !this.isNewCamera}, [Validators.required, Validators.pattern("^[0-9]*$")]),
      vehicleId: this.formBuilder.control({value: camera?.vehicleId || '', disabled: this.formIsReadOnly}, [Validators.pattern("^[0-9]*$")])
    });
  }

  submitForm() {
    this.cameraEntryForm.updateValueAndValidity();
    
    if(!this.cameraEntryForm.invalid){
      let formCamera: Camera = new Camera();
      let rawFormValue = this.cameraEntryForm.getRawValue();
      formCamera.deviceNo = rawFormValue.deviceNo;
      formCamera.vehicleId = rawFormValue.vehicleId;
      formCamera.id = rawFormValue.id;
  
      if(this._camera.id != null){
        this.updateCamera.emit(formCamera)
      } else {
        this.createCamera.emit(formCamera);
      }
    }
  }

  allowEdit(){
    this.formIsReadOnly = false;
    this.cameraEntryForm.get('deviceNo').enable({onlySelf: true});
    this.cameraEntryForm.get('vehicleId').enable({onlySelf: true});
  }

  resetForm(){
    if(this.isNewCamera){
      this.delete();
    }

    this.formIsReadOnly = true;
    this.cameraEntryForm = null;
    this.buildForm(this._camera);
  }

  delete(){
    this.deleteCamera.emit(this._camera.id);
  }
}
