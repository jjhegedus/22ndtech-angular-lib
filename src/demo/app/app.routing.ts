import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CartComponent, CheckoutComponent, ProductDetailsComponent, ProductAdminComponent, OrderSummaryComponent } from '22ndtech-angular-lib';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductProductCategoriesComponent } from './product-categories/product-product-categories.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
    {path: 'product-categories', component: ProductCategoriesComponent},
    {path: 'product-product-categories', component: ProductProductCategoriesComponent},
    { path: 'product-details/:id', component: ProductDetailsComponent },
    { path: 'product-admin', component: ProductAdminComponent },
    { path: 'order-summary', component: OrderSummaryComponent }
];

export const routing = RouterModule.forRoot(routes);
