import { OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { ProductCategory } from '../product-categories/product-category';
import { ProductCategoriesService } from '../product-categories/product-categories.service';
export declare class ProductCategoriesEditorComponent implements OnInit {
    private router;
    private configService;
    private productCategoriesService;
    private location;
    private config;
    productCategories: ProductCategory[];
    constructor(router: Router, configService: ConfigService, productCategoriesService: ProductCategoriesService, location: Location);
    ngOnInit(): void;
    getProductCategories(): void;
    addProductCategory(productCategory: string): void;
    deleteProductCategory(productCategory: string): void;
    goBack(): void;
}
