import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ConfigService } from '../config/config.service';
import { ProductProductCategoriesService } from '../product-categories/product-product-categories.service';
import { ProductCategoriesService } from '../product-categories/product-categories.service';
import { ProductCategory } from '../product-categories/product-category';

@Component({
    selector: 'my-product-product-categories-editor',
    templateUrl: './product-product-categories-editor.component.html',
    styleUrls: ['./product-product-categories-editor.component.scss']
})

export class ProductProductCategoriesEditorComponent implements OnInit {

    private config: any;
    @Input() productId: string;
    productProductCategories: any[];
    productCategories: ProductCategory[];
    productCategoryChecks = {};

    constructor(
        private router: Router,
        private configService: ConfigService,
        private productProductCategoriesService: ProductProductCategoriesService,
        private location: Location,
        private productCategoriesService: ProductCategoriesService
    ) {
        this.configService.getConfig((configuration: any) => {
            this.config = configuration;
        });
    }

    ngOnInit(): void {
        console.log('ProductProductcategoriesComponent:ngOnInit()');

        if(!this.productId){
            throw "Invalid product";
        }
        this.getProductCategories();
    }

    getProductCategories(): void {
        this.productCategoriesService.getProductCategories().subscribe(
            productCategories => {
                this.productCategories = productCategories;

                productCategories.forEach(
                    (productCategory) =>{
                        this.productCategoryChecks[productCategory.Key] = false;
                    }
                );

                console.log('getProductCategories: productCategoryChecks = ' + JSON.stringify(this.productCategoryChecks));

                this.getProductProductCategories();

            });
    }

    getProductProductCategories(): void {
        this.productProductCategoriesService.getProductProductCategories(this.productId).subscribe(
            productProductCategories => {
                this.productProductCategories = productProductCategories;
                console.log('productProductCategories = ' + JSON.stringify(productProductCategories));

                productProductCategories.forEach(
                    (productProductCategory)=>{
                        console.log('productProductCategory = ' + JSON.stringify(productProductCategory));

                        this.productCategoryChecks[productProductCategory.ProductCategory.Key] = true;
                    }
                )

                console.log('getProductProductCategories: productCategoryChecks = ' + JSON.stringify(this.productCategoryChecks));

            });
    }

    addProductProductCategory(productId: string, productCategory: string): void {

        console.log('addProductProductCategory productCategory = ' + productCategory);

        this.productProductCategoriesService.addProductProductCategory(productId, productCategory).subscribe(
            (next: any) => {
                this.getProductCategories();
            }
        )
    }



    deleteProductProductCategory(productId: string, productCategory: string): void {
        this.productProductCategoriesService.deleteProductProductCategory(productId, productCategory).subscribe(
            () => {

                this.productProductCategories = this.productProductCategories.filter(p => p.ProductCategory.Key !== productCategory);

                this.productCategoryChecks[productCategory] = false;
            });
    }


    goBack(): void {
        this.location.back();
    }

    productHasCategory(productCategory: string): boolean {
        return true;
    }

    toggleProductHasCategory(productCategory: string) {
        // this.productCategoryChecks[productCategory] = !this.productCategoryChecks[productCategory];

        // console.log('this.productCategoryChecks[' + productCategory + '] = ' + this.productCategoryChecks[productCategory]);

        if(this.productCategoryChecks[productCategory]){

            console.log('delete product category: productId = ' + this.productId + ' productCategory = ' + productCategory);

            this.deleteProductProductCategory(this.productId, productCategory);
            
        } else {

            console.log('add product category: productId = ' + this.productId + ' productCategory = ' + productCategory);

            this.addProductProductCategory(this.productId, productCategory);

        }
    }

}