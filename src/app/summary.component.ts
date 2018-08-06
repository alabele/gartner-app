import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component ({
  selector: 'app-summary',
  template: `
  <p>SUMMARY COMPONENT</p>
  <h1>{{name}}</h1>
  <!--<input type="text" [(ngModel)]="name">-->
  <input type="text" (input)="onUserInput($event)" [value]="name">
  <app-product-detail></app-product-detail>
  `
})
export class SummaryComponent {
  @Input() name;
  @Output() nameChanged = new EventEmitter<string>();

  onUserInput(event) {
    //this.name = event.target.value;
    this.nameChanged.emit(event.target.value);
  }
}
