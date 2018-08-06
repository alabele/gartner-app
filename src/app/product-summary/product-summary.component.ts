import { Component, OnInit, Input } from '@angular/core';
import {ProductService} from '../products.service';

@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.css']
})
export class ProductSummaryComponent implements OnInit {
  @Input() products;
  prodService: ProductService;
  //products = ProductService.rootProducts;

  constructor(prodService: ProductService) {
    this.prodService = prodService;
  }

  ngOnInit() {
    this.prodService.fetchProducts();
  }

}
