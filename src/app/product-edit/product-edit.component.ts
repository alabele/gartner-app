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

  // Individual product object
  product = prodService.productDetail;

  // Product ID
  id = '';

  // Categories selected for this product
  productCategories = prodService.productDetail.Categories;

  // Categories selected for this product, two-way bound to <select>
  selectedCategories = [];

  // All available product categories
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
          // Using parametered ID, fetch Product Detail via API
          this.prodService.getProduct(params.id);

          // Set ID to parametered ID
          this.id = params.id;
        }
      );

      // Fetch all categories
      this.prodService.fetchCategories();

      // On change to Product Detail, update local product, product categories, and selected categories
      this.subscription = this.prodService.productDetailChanged.subscribe(
        () => {
          this.product = this.prodService.productDetail;
          this.productCategories = this.prodService.productDetail.Categories;

          // Map selected categories array to be an array of selected CategoryIDs, only
          this.selectedCategories =  this.productCategories.map((c) => c.CategoryId);
        }
      );

      // Watch for changes to categories
      this.subscription = this.prodService.categoriesChanged.subscribe(
      () => {
          this.categories = this.prodService.productCategories;
      }
    );
  }

  ngOnDestroy() {

    // Destroy subscription
    this.subscription.unsubscribe();
  }

  // On Submit function to send PUT request updating Product detail on server
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

    // PUT request
    this.prodService.editProduct(name, desc, url, selectedCategories, prodId);

    // After submit, route to product detail page for that product
    this.router.navigate(['/product-detail/' + prodId]);
  }

}
