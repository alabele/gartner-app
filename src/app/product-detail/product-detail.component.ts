import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {ProductService} from '../products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  prodService: ProductService;
  activatedRoute: ActivatedRoute;
  subscription;

  // Product detail object
  product = {Name: '', Description: '', Url: '', Categories: [], ProductId: 0};

  // Categories attributed to this product
  productCategories = [];

  constructor(prodService: ProductService, activatedRoute: ActivatedRoute) {
    this.prodService = prodService;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit() {

    // Listen for changes at the service level and update product/categories
    this.subscription = this.prodService.productDetailChanged.subscribe(
      () => {
        this.product = this.prodService.productDetail;
        this.productCategories = this.prodService.productDetail.Categories;
      }
    );
     this.subscription = this.activatedRoute.params.subscribe(
        (params) => {
          if (params.id === undefined) {
            return;
          }

          // Fetch Product via API using parametered ID
          this.prodService.getProduct(params.id);
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


