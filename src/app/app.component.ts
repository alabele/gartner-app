import { Component } from '@angular/core';
import { v1 as uuid } from 'uuid';
import { resolveComponentResources } from '../../node_modules/@angular/core/src/metadata/resource_loading';
import {ProductService} from './products.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gartner-app';
  prodService = ProductService;
  rootProducts = prodService.rootProducts;
  rootName = uuid();

constructor (prodService: ProductService){
  this.prodService = prodService;
}

  onNameChanged(newName) {
    this.rootName = newName;
  }
}
