import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { DragulaService } from 'ng2-dragula';

import { ConfigService } from '../config/config.service';
import { ProductCategory } from '../product-categories/product-category';
import { ProductCategoriesService } from '../product-categories/product-categories.service';

@Component({
    selector: 'my-product-categories-editor',
    templateUrl: './product-categories-editor.component.html',
    styleUrls: ['./product-categories-editor.component.scss', '../../../../node_modules/dragula/dist/dragula.css']
})

export class ProductCategoriesEditorComponent implements OnInit {

    private config: any;
    productCategories: ProductCategory[];

    constructor(
        private router: Router,
        private configService: ConfigService,
        private productCategoriesService: ProductCategoriesService,
        private location: Location,
        private dragulaService: DragulaService
    ) {
        this.configService.getConfig((configuration: any) => {
            this.config = configuration;
        });

        dragulaService.drag.subscribe(
            (value: any) => {
                console.log(`drag: ${value}`);
            }
        );

        dragulaService.setOptions('first-bag', {})

        dragulaService.drop.subscribe(
            (value: any) => {
                // console.log(`drop: ${value}`);
                // console.log('drop value.el = ' + value[0]);
                // console.log('drop value.target.outerHtml = ' + value[1].outerHTML);
                // console.log('drop value.source.outerHtml = ' + value[2].outerHTML);
                // console.log('drop value.sibling.outerHtml = ' + value[3].outerHTML);
                console.log(JSON.stringify(this.productCategories));
            }
        );

        

        dragulaService.dropModel.subscribe(
            (value: any) => {
                // console.log(`dropModel: ${value}`);
                // console.log('dropModel value.el = ' + value[0]);
                // console.log('dropModel value.target.outerHtml = ' + value[1].outerHTML);
                // console.log('dropModel value.source.outerHtml = ' + value[2].outerHTML);
                // console.log('dropModel value.sibling.outerHtml = ' + value[3].outerHTML);
                console.log(JSON.stringify(this.productCategories));
            }
        );


    }

    ngOnInit(): void {
        console.log('ProductImageListComponent:ngOnInit()');
        this.getProductCategories();
    }

    getProductCategories(): void {
        this.productCategoriesService.getProductCategories().subscribe(
            productCategories => {
                this.productCategories = productCategories;

            });
    }

    addProductCategory(productCategory: string): void {
        var newCategoryName = window.prompt("Enter a new Product Category");

        this.productCategoriesService.addProductCategory(newCategoryName).subscribe(
            (next) => {
                this.getProductCategories();
            }
        )
    }



    deleteProductCategory(productCategory: string): void {
        this.productCategoriesService.deleteProductCategory(productCategory).subscribe(
            () => {
                this.productCategories = this.productCategories.filter(p => p.Key !== productCategory);
            });
    }


    goBack(): void {
        this.location.back();
    }

}