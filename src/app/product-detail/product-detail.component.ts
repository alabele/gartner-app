import { Component, OnInit, Input } from '@angular/core';
import {ProductService} from '../products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product;
  prodService: ProductService;

  constructor(prodService: ProductService) {
    this.prodService = prodService;
  }

  ngOnInit() {
    this.prodService.fetchCategories();
  }

}
