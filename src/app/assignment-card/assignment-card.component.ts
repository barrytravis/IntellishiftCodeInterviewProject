import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssignmentResponse } from '../models/assignment.model';

@Component({
  selector: 'app-assignment-card',
  templateUrl: './assignment-card.component.html',
  styleUrls: ['./assignment-card.component.css']
})
export class AssignmentCardComponent implements OnInit {
  @Output() public createCamera = new EventEmitter<AssignmentResponse>();
  @Output() public updateCamera = new EventEmitter<AssignmentResponse>();
  @Output() public deleteCamera = new EventEmitter<number>();
  @Output() public deleteUnsubmittedCamera = new EventEmitter<
    AssignmentResponse
  >();

  private _assignment: AssignmentResponse;
  @Input() public set assignment(assignment: AssignmentResponse) {
    this._assignment = assignment;
    this.isNewAssignment =
      this._assignment.id === null || this._assignment.id === undefined;

    console.log('inside card comp');
    console.log(assignment);

    if (!this.isNewAssignment) {
      this.buildForm(this._assignment);
    } else {
      this.formIsReadOnly = false;
      this.buildForm();
    }
  }

  public formIsReadOnly: boolean;
  public isNewAssignment: boolean;
  constructor() {}

  ngOnInit() {}

  buildForm(assignment?: AssignmentResponse) {}
}
