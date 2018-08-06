import { Component, OnInit } from '@angular/core';
import {ProductService} from '../products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  // categories = [
  //   {display: 'None', value: 0},
  //   {display: 'All Categories', value: 1},
  // ]

  prodService: ProductService;
  categories = [];

  constructor(prodService: ProductService) {
    this.prodService = prodService;
  }

  ngOnInit() {
    //console.log('new prod categories', this.categories);
    this.categories = this.prodService.fetchCategories();
    console.log(this.categories);
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
    console.log("CATEGORIES", selectedCategories);
    this.prodService.addProduct(name, desc, url, selectedCategories);
  }

}
