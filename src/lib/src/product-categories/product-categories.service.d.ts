import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ConfigService } from '../config/config.service';
import { ProductCategory } from './product-category';
export declare class ProductCategoriesService {
    private http;
    private configService;
    title: string;
    private productCategoriesUrl;
    private config;
    private headers;
    constructor(http: Http, configService: ConfigService);
    private handleError(error);
    getProductCategories(): Observable<ProductCategory[]>;
    addProductCategory(productCategory: string): Observable<ProductCategory>;
    deleteProductCategory(productCategory: string): Observable<any>;
}
