import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-message-dialog',
  templateUrl: './generic-message-dialog.component.html',
  styleUrls: ['./generic-message-dialog.component.css']
})
export class GenericMessageDialogComponent implements OnInit {
  @Input() message: string;
  constructor() {}

  ngOnInit() {}
}
