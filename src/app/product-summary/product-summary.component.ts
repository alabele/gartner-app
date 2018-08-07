import { Component, OnInit, OnDestroy } from '@angular/core';
import {ProductService} from '../products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.css']
})
export class ProductSummaryComponent implements OnInit, OnDestroy {
  activatedRoute: ActivatedRoute;
  prodService: ProductService;
  products = prodService.rootProducts;
  subscription;

  constructor(prodService: ProductService) {
    this.prodService = prodService;
  }

  ngOnInit() {
    this.prodService.fetchProducts();
    this.subscription = this.prodService.productsChanged.subscribe(
      () => {
        this.products = this.prodService.rootProducts;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
