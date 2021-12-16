import { OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { ProductProductCategoriesService } from '../product-categories/product-product-categories.service';
import { ProductCategoriesService } from '../product-categories/product-categories.service';
import { ProductCategory } from '../product-categories/product-category';
export declare class ProductProductCategoriesEditorComponent implements OnInit {
    private router;
    private configService;
    private productProductCategoriesService;
    private location;
    private productCategoriesService;
    private config;
    productId: string;
    productProductCategories: any[];
    productCategories: ProductCategory[];
    productCategoryChecks: {};
    constructor(router: Router, configService: ConfigService, productProductCategoriesService: ProductProductCategoriesService, location: Location, productCategoriesService: ProductCategoriesService);
    ngOnInit(): void;
    getProductCategories(): void;
    getProductProductCategories(): void;
    addProductProductCategory(productId: string, productCategory: string): void;
    deleteProductProductCategory(productId: string, productCategory: string): void;
    goBack(): void;
    productHasCategory(productCategory: string): boolean;
    toggleProductHasCategory(productCategory: string): void;
}
