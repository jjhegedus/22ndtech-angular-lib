import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../products/product';
import { ProductsService } from '../products/products.service';
import { ConfigService } from '../config/config.service';
export declare class ProductAdminComponent implements OnInit {
    private productService;
    private router;
    private configService;
    products: Product[];
    selectedProduct: Product;
    config: any;
    constructor(productService: ProductsService, router: Router, configService: ConfigService);
    ngOnInit(): void;
    getProducts(): void;
    onSelect(product: Product): void;
    deleteProduct(product: Product): void;
    addProduct(): void;
    gotoDetail(id: string): void;
}
