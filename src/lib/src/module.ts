import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DragulaModule, DragulaService, dragula } from 'ng2-dragula';

import { LibComponent } from './component/lib.component';
import { LibService } from './service/lib.service';
import { CollapsibleComponent } from './collapsible/collapsible.component';
import { ConfigService } from './config/config.service';
import { ProductsService } from './products/products.service';
import { ProductImageService } from './products/product-image.service';
import { ProductImageListComponent } from './product-image-list/product-image-list.component';
import { CartService } from './cart/cart.service';
import { CartComponent } from './cart/cart.component';
import { AddCartComponent } from './cart/cart-button.component';
import { SalesTaxService } from './sales-tax/sales-tax.service';
import { CheckoutService } from './checkout/checkout.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductCategoriesService } from './product-categories/product-categories.service';
import { ProductCategoriesEditorComponent } from './product-categories/product-categories-editor.component';
import { ProductProductCategoriesService } from './product-categories/product-product-categories.service';
import { ProductProductCategoriesEditorComponent } from './product-categories/product-product-categories-editor.component';
import { ContextService } from './context/context.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { StatesService } from './states/states.service';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  declarations: [
    LibComponent,
    CollapsibleComponent,
    ProductImageListComponent,
    CartComponent,
    AddCartComponent,
    CheckoutComponent,
    ProductCategoriesEditorComponent,
    ProductProductCategoriesEditorComponent,
    ProductDetailsComponent,
    ProductAdminComponent,
    OrderSummaryComponent],
  providers: [
    LibService,
    ConfigService,
    ProductsService,
    ProductImageService,
    CartService,
    SalesTaxService,
    CheckoutService,
    ProductCategoriesService,
    ProductProductCategoriesService,
    ContextService,
    StatesService,
    DragulaService],
  exports: [
    LibComponent,
    CollapsibleComponent,
    ProductImageListComponent,
    CartComponent,
    AddCartComponent,
    CheckoutComponent,
    ProductCategoriesEditorComponent,
    ProductProductCategoriesEditorComponent,
    ProductDetailsComponent,
    ProductAdminComponent,
    OrderSummaryComponent],
  imports: [
      CommonModule,
      HttpModule,
      RouterModule,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      DragulaModule
  ]
})
export class LibModule { }