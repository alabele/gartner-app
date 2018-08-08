import { Injectable } from "@angular/core";
import {Http, Response} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {
  rootProducts = [];

  productCategories = [];

  productDetail = {};

  categoriesChanged = new Subject<void>();

  productsChanged = new Subject<void>();

  productDetailChanged = new Subject<void>();

  // tslint:disable-next-line:max-line-length
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxMCIsInVuaXF1ZV9uYW1lIjoiaW50ZXJ2aWV3YXBpQGdhcnRuZXIuY29tIiwiZW1haWwiOiJpbnRlcnZpZXdhcGlAZ2FydG5lci5jb20iLCJuYmYiOjE1MzMwNjQyMjIsImV4cCI6MTU5MzA2NDE2MiwiaWF0IjoxNTMzMDY0MjIyfQ.M7Sqp47Zpq5_zqkxiLwZVCjpSiKpOL2CkwgFSo3V624';

  http: Http;

  constructor (http: Http) {
    this.http = http;
  }

  fetchProducts() {
    this.http.get('https://gdm-interview-api.azurewebsites.net/api/v1/Products', {
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
        this.rootProducts = data;
        this.productsChanged.next();
      }
    );
  }

  getProduct(id) {
    this.http.get('https://gdm-interview-api.azurewebsites.net/api/v1/Products/' + id, {
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
        this.productDetail = data;
        this.productDetailChanged.next();
      }
    );
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
          this.categoriesChanged.next();
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
    this.http.post('https://gdm-interview-api.azurewebsites.net/api/v1/Products', newProduct, {
      headers {
        'Authorization': this.token,
      }
    })
    .pipe (
      map(
        (response: Response) => {
            return response.json();
        }
      )
    )
    .subscribe(
        (transformedData: any) => {
            console.log(transformedData);
        }
    );
  }

  editProduct(name, desc, url, categories, id) {
    const newProduct = {
      Name: name,
      Description: desc,
      Url: url,
      CategoryIds: categories
    }
    this.http.put('https://gdm-interview-api.azurewebsites.net/api/v1/Products/' + id, newProduct, {
      headers {
        'Authorization': this.token,
      }
    })
    .pipe (
      map(
        (response: Response) => {
            return response.json();
        }
      )
    )
    .subscribe(
        (transformedData: any) => {
            console.log(transformedData);
        }
    );
  }

}
