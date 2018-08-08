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

  // Array of all products
  products = prodService.rootProducts;

  subscription;

  constructor(prodService: ProductService) {
    this.prodService = prodService;
  }

  ngOnInit() {
    // Fetch all products via API onInit
    this.prodService.fetchProducts();

    // Subscribe to changes and update products accordingly
    this.subscription = this.prodService.productsChanged.subscribe(
      () => {
        this.products = this.prodService.rootProducts;
      }
    );
  }

  ngOnDestroy() {

    // Destroy subscription
    this.subscription.unsubscribe();
  }

}
