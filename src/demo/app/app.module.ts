import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LibModule } from '22ndtech-angular-lib';
import { AppComponent }  from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductProductCategoriesComponent } from './product-categories/product-product-categories.component';

@NgModule({
  imports:      [ BrowserModule, LibModule, routing],
  declarations: [ AppComponent, HomeComponent, NavComponent, ProductCategoriesComponent, ProductProductCategoriesComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
