import { Injectable } from "@angular/core";
import {Http, Response} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import { map, catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';

@Injectable()
export class ProductService {
  // All Products
  rootProducts = [];

  // All available Product Categories
  productCategories = [];

  // Current Single Product Details
  productDetail = {};

  // Subscribe to changes to all of the above
  categoriesChanged = new Subject<void>();

  productsChanged = new Subject<void>();

  productDetailChanged = new Subject<void>();

  // tslint:disable-next-line:max-line-length
  // API JWT
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxMCIsInVuaXF1ZV9uYW1lIjoiaW50ZXJ2aWV3YXBpQGdhcnRuZXIuY29tIiwiZW1haWwiOiJpbnRlcnZpZXdhcGlAZ2FydG5lci5jb20iLCJuYmYiOjE1MzMwNjQyMjIsImV4cCI6MTU5MzA2NDE2MiwiaWF0IjoxNTMzMDY0MjIyfQ.M7Sqp47Zpq5_zqkxiLwZVCjpSiKpOL2CkwgFSo3V624';

  http: Http;

  constructor (http: Http) {
    this.http = http;
  }

  // Fetch all products GET request
  fetchProducts() {
    this.http.get('https://gdm-interview-api.azurewebsites.net/api/v1/Products', {
      headers {
        'Authorization': this.token,
      }
    })
    .pipe (
        map((response: Response) => {
          return response.json();
        }),
        catchError(this.handleError)
      )
    .subscribe(
      (data) => {
        // Set root products array to fetched data
        this.rootProducts = data;
        // Subscribe to a listener
        this.productsChanged.next();
      }
    );
  }

  // Fetch Individual Product GET Request, takes Product ID
  getProduct(id) {
    this.http.get('https://gdm-interview-api.azurewebsites.net/api/v1/Products/' + id, {
      headers {
        'Authorization': this.token,
      }
    })
    .pipe (
        map((response: Response) => {
          return response.json();
        }),
        catchError(this.handleError)
      )
    .subscribe(
      (data) => {
        // Set product detail object to fetched data
        this.productDetail = data;
        // Subscribe to a listener
        this.productDetailChanged.next();
      }
    );
  }

  // Fetch all Categories GET Request
  fetchCategories() {
    this.http.get('https://gdm-interview-api.azurewebsites.net/api/v1/Categories', {
      headers {
        'Authorization': this.token,
      }
    })
    .pipe (
      map((response: Response) => {
        return response.json();
      }),
      catchError(this.handleError)
    )
    .subscribe(
      (data) => {
        // Set Product Categories with fetched data
        this.productCategories = data;
        // Subscribe to a listener for changes
        this.categoriesChanged.next();
      }
    );
  }

  // Create New Product POST Request,  takes Product Name, Description, URL, and Categories (array)
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
        }),
        catchError(this.handleError)
    )
    .subscribe(
        (transformedData: any) => {
            console.log(transformedData);
        }
    );
  }

  // Edit Product PUT Request, takes Product Name, Description, URL, Categories (array), and ID
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
        }),
        catchError(this.handleError)
    )
    .subscribe(
        (transformedData: any) => {
            console.log(transformedData);
        }
    );
  }

  // Generic error handler via Angular docs
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Whoops. An error occurred.');
  }

}
