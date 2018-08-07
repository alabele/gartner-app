import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {ProductService} from '../products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product = prodService.productDetail;
  productCategories = prodService.productDetail.Categories;
  prodService: ProductService;
  activatedRoute: ActivatedRoute;
  subscription;

  constructor(prodService: ProductService, activatedRoute: ActivatedRoute) {
    this.prodService = prodService;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit() {
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
          this.prodService.getProduct(params.id);
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


