import { Component, OnInit, OnDestroy } from '@angular/core';
import {ProductService} from '../products.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  product = prodService.productDetail;
  id = '';
  productCategories = prodService.productDetail.Categories;
  selectedCategories = [];
  categories = prodService.productCategories;
  prodService: ProductService;
  activatedRoute: ActivatedRoute;
  subscription;

  constructor(prodService: ProductService, activatedRoute: ActivatedRoute, private router: Router) {
    this.prodService = prodService;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit() {

     this.subscription = this.activatedRoute.params.subscribe(
        (params) => {
          if (params.id === undefined) {
            return;
          }
          this.prodService.getProduct(params.id);
          this.id = params.id;
        }
      );
      this.prodService.fetchCategories();
      this.subscription = this.prodService.productDetailChanged.subscribe(
        () => {
          this.product = this.prodService.productDetail;
          this.productCategories = this.prodService.productDetail.Categories;
          this.selectedCategories =  this.productCategories.map((c) => c.CategoryId);
        }
      );
      this.subscription = this.prodService.categoriesChanged.subscribe(
      () => {
          this.categories = this.prodService.productCategories;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editProduct(submittedForm) {
    if (submittedForm.invalid) {
      return;
    }
    const prodId = this.id;
    const f = submittedForm.value;
    const name = f.name;
    const desc = f.description;
    const url = f.url;
    let selectedCategories = [];
    if (f.categorySelect.length > 0) {
      selectedCategories = f.categorySelect;
    }
    this.prodService.editProduct(name, desc, url, selectedCategories, prodId);
    this.router.navigate(['/product-detail/' + prodId]);
  }

}
