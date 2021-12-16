import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ConfigService } from '../config/config.service';
import { ProductCategory } from './product-category';

@Injectable()
export class ProductCategoriesService {
    title = 'Product Categories Service';
    private productCategoriesUrl = '';
    private config: any;

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(
        private http: Http,
        private configService: ConfigService
    ) {
        this.configService.getConfig((configuration: any) => {
            this.config = configuration;
            this.productCategoriesUrl = this.config.baseUrl + '/product-categories';
        });
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getProductCategories(): Observable<ProductCategory[]> {

        return this.http.get(this.productCategoriesUrl).map(res => res.json());
    }

    addProductCategory(productCategory: string): Observable<ProductCategory> {

        return this.http.post(
            this.productCategoriesUrl + '/' + productCategory,
            JSON.stringify({productCategory: productCategory}),
            {
                headers: this.headers
            }
        ).map(res => {
            console.log('json().Key = ' + res.json().Key);
            return res.json().Key;
        });
    }

    deleteProductCategory(productCategory: string): Observable<any> {
        const url = `${this.productCategoriesUrl}/${productCategory}`;
        return this.http.delete(url).map(res => res.json()).catch(this.handleError);
    };

}