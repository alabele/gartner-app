import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.service';

import { AppComponent } from './app.component';
import { SummaryComponent } from './summary.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductSummaryComponent } from './product-summary/product-summary.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductService } from './products.service';
import { CreateProductComponent } from './create-product/create-product.component';


@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductSummaryComponent,
    ProductItemComponent,
    CreateProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
  ],
  providers: [
    ProductService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
