import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ConfigService } from '../config/config.service';
export declare class ProductProductCategoriesService {
    private http;
    private configService;
    title: string;
    private productProductCategoriesUrl;
    private config;
    private headers;
    constructor(http: Http, configService: ConfigService);
    private handleError(error);
    getProductProductCategories(productId?: string): Observable<any[]>;
    addProductProductCategory(productId: string, productCategory: string): Observable<any>;
    deleteProductProductCategory(productId: string, productCategory: string): Observable<any>;
}
