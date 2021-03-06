import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductSummaryComponent } from './product-summary/product-summary.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductService } from './products.service';
import { CreateProductComponent } from './create-product/create-product.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule} from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';



const routes = [
  {path: 'products', component: ProductSummaryComponent},
  {path: 'product-detail', redirect: '/products', children: [
    {path: '', redirectTo: '/products', pathMatch: 'full'},
    {path: ':id', component: ProductDetailComponent},
    {path: ':id/edit', component: ProductEditComponent}
  ]},
  {path: 'add-product', component: CreateProductComponent},
  {path: 'confirmation', component: ConfirmationComponent},
  {path: 'product-detail', component: ProductDetailComponent},
  {path: '**', redirectTo: '/products'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductSummaryComponent,
    ProductItemComponent,
    CreateProductComponent,
    HeaderComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    RouterModule.forChild(routes)
  ],
  providers: [
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
