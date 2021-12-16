import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ConfigService } from '../config/config.service';

@Injectable()
export class ProductProductCategoriesService {
    title = 'Product Product Categories Service';
    private productProductCategoriesUrl = '';
    private config: any;

    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(
        private http: Http,
        private configService: ConfigService
    ) {
        this.configService.getConfig((configuration: any) => {
            this.config = configuration;
            this.productProductCategoriesUrl = this.config.baseUrl + '/product-product-categories';
        });
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getProductProductCategories(productId: string = 'undefined'): Observable<any[]> {

        if (productId === 'undefined') {
            return this.http.get(this.productProductCategoriesUrl).map(res => res.json());
        } else {
            return this.http.get(this.productProductCategoriesUrl + '/' + productId).map(res => res.json());
        }
    }

    addProductProductCategory(productId: string, productCategory: string): Observable<any> {

        return this.http.post(
            this.productProductCategoriesUrl + '/' + productId + '/' + productCategory,
            JSON.stringify({}),
            {
                headers: this.headers
            }
        ).map(res => {
            return res.json();
        });
    }

    deleteProductProductCategory(productId: string, productCategory: string): Observable<any> {
        const url = `${this.productProductCategoriesUrl}/${productId}/${productCategory}`;
        return this.http.delete(url).map(res => res.json()).catch(this.handleError);
    };

}