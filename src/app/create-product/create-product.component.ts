import { Component, OnInit, OnDestroy } from '@angular/core';
import {ProductService} from '../products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit, OnDestroy {
  prodService: ProductService;

  // Array of all available categories
  categories = this.prodService.productCategories;

  subscription;

  constructor(prodService: ProductService, private router: Router) {
    this.prodService = prodService;
  }

  ngOnInit() {
    this.prodService.fetchCategories();
    this.subscription = this.prodService.categoriesChanged.subscribe(
      () => {
        // If this categories are updated, update categories array
        this.categories = this.prodService.productCategories;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // On submit, send POST request creating new product
  onSubmit(submittedForm) {
    if (submittedForm.invalid) {
      return;
    }
    console.log(submittedForm.value);
    const f = submittedForm.value;
    const name = f.name;
    const desc = f.description;
    const url = f.url;
    let selectedCategories = [];
    if (f.categorySelect.length > 0){
      selectedCategories = f.categorySelect;
    }
    this.prodService.addProduct(name, desc, url, selectedCategories);

    // After submission re-route to confirmation page
    this.router.navigate(['/confirmation']);
  }

}
