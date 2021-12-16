import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../products/product';
import { ProductsService } from '../products/products.service';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'my-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss']
})

export class ProductAdminComponent implements OnInit {

    products: Product[];
    selectedProduct: Product;
    config: any;

    constructor(
        private productService: ProductsService,
        private router: Router,
        private configService: ConfigService
    ) {
  }

  ngOnInit(): void {
      console.log('ProductAdminComponent:ngOnInit()');
      this.configService.getConfig(
          (config:any) => {
              this.config = config;
              this.getProducts();
          });
    }

  getProducts(): void {
      //window.alert('products.components.ts: getProducts(): Begin');
      this.productService.getProducts().subscribe(
          products => {
              this.products = products;
          });
  }

  onSelect(product: Product): void {
      this.selectedProduct = product;
  }

  deleteProduct(product: Product): void {
      this.productService.deleteProduct(product.id).subscribe(
          () => {
              this.products = this.products.filter(p => p !== product);
              if (this.selectedProduct === product) {
                  this.selectedProduct = null;
              }
          });
  }

  addProduct(): void {
      this.router.navigate(['/product-details', 'NewProduct']);
  }

  gotoDetail(id: string): void {
      this.router.navigate(['/product-details', id]);
  }

}
