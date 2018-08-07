import { Component, OnInit } from '@angular/core';
import {ProductService} from '../products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.css']
})
export class ProductSummaryComponent implements OnInit {
  products = [];
  activatedRoute: ActivatedRoute;
  prodService: ProductService;
  //products = ProductService.rootProducts;

  constructor(prodService: ProductService, activatedRoute: ActivatedRoute) {
    this.prodService = prodService;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit() {
    this.prodService.fetchProducts();
    this.activatedRoute.params.subscribe(
      // (params) => {

      // }
    );
  }

}
