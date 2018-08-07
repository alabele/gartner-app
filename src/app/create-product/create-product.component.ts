import { Component, OnInit } from '@angular/core';
import {ProductService} from '../products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  prodService: ProductService;
  categories = prodService.productCategories;

  constructor(prodService: ProductService) {
    this.prodService = prodService;
  }

  ngOnInit() {
    this.prodService.fetchCategories();
    this.prodService.categoriesChanged.subscribe(
      () => {
        this.categories = this.prodService.productCategories;
      }
    );
  }

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
  }

}
