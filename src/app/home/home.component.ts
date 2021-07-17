import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentTab: string = 'assignemnt';

  constructor() { }

  ngOnInit() {
  }

  tabControl(selectedTab: string){
    this.currentTab = selectedTab;
  }
}