import { Injectable } from "@angular/core";
import {Http, Response} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {
  private rootProducts = [
    { name: 'Product1', description: 'lorem ipsum product 1', id: '1'},
    { name: 'Product2', description: 'lorem ipsum product 2', id: '2'},
    { name: 'Product3', description: 'lorem ipsum product 3', id: '3'}
  ]

  productCategories = [{ CategoryId: 1, Name: "Lauren"}];

  categoriesChanged = new Subject<void>();

  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxMCIsInVuaXF1ZV9uYW1lIjoiaW50ZXJ2aWV3YXBpQGdhcnRuZXIuY29tIiwiZW1haWwiOiJpbnRlcnZpZXdhcGlAZ2FydG5lci5jb20iLCJuYmYiOjE1MzMwNjQyMjIsImV4cCI6MTU5MzA2NDE2MiwiaWF0IjoxNTMzMDY0MjIyfQ.M7Sqp47Zpq5_zqkxiLwZVCjpSiKpOL2CkwgFSo3V624';

  http: Http;
  //static productCategories: any;



  constructor (http: Http) {
    this.http = http;
  }

  fetchProducts() {
    // this.http.get('https://gdm-interview-api.azurewebsites.net/api/v1/Products', {
    //   headers {
    //     'Authorization': this.token,
    //   }
    // }).subscribe(
    // (response: Response) => {
    //   console.log(response);
    // }
    // );
  }

    fetchCategories() {
      this.http.get('https://gdm-interview-api.azurewebsites.net/api/v1/Categories', {
        headers {
          'Authorization': this.token,
        }
      })
      .pipe (
        map((response: Response) => {
          return response.json();
        })
      )
      .subscribe(
        (data) => {
          this.productCategories = data;
           console.log("HURRAY", this.productCategories);
           this.categoriesChanged.next();
          //console.log(data);
         // this.productCategories = data;
         // console.log("product Categories", this.productCategories);
         //return data;
        }
      );
  }

  addProduct(name, desc, url, categories){
    const newProduct = {
      Name: name,
      Description: desc,
      Url: url,
      CategoryIds: categories
    }
    console.log("NEW PRODUCT", newProduct);
  }

}
