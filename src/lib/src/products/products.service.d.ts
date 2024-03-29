import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combinelatest';
import 'rxjs/add/operator/withlatestfrom';
import { ConfigService } from '../config/config.service';
import { Product } from './product';
import { ProductProductCategoriesService } from '../product-categories/product-product-categories.service';
import { ContextService } from '../context/context.service';
export declare class ProductsService {
    private http;
    private configService;
    private productProductCategoriesService;
    private contextService;
    title: string;
    private productsUrl;
    private config;
    private productProductCategories;
    private headers;
    private products;
    constructor(http: Http, configService: ConfigService, productProductCategoriesService: ProductProductCategoriesService, contextService: ContextService);
    private handleError(error);
    loadProductProductCategories(): void;
    loadProducts(): void;
    getProducts(): Observable<Product[]>;
    getProduct(id: string): Observable<Product>;
    updateProduct(product: Product): Observable<Product>;
    createProduct(product: Product): Observable<Product>;
    deleteProduct(id: string): Observable<any>;
}
