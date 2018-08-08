import { Component } from '@angular/core';
import {ProductService} from './products.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  prodService = ProductService;
  rootProducts = prodService.rootProducts;


constructor (prodService: ProductService) {
  this.prodService = prodService;
}

}
