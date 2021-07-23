import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-message-dialog',
  templateUrl: './generic-message-dialog.component.html',
  styleUrls: ['./generic-message-dialog.component.css']
})
export class GenericMessageDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<GenericMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public messages: string[]
  ) {}

  ngOnInit() {}
}
