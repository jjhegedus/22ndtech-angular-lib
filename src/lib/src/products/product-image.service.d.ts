import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ConfigService } from '../config/config.service';
export declare class ProductImageService {
    private http;
    title: string;
    private productsUrl;
    private productImageUrl;
    private config;
    constructor(http: Http, configService: ConfigService);
    private handleError(error);
    getMainImageSignature(fileType: string, productId: string): Observable<any>;
    getDeleteMainImageAuthorizationHeader(fileType: string, productId: string): Observable<any>;
    deleteMainImage(productId: string): Observable<any>;
    getProductImages(productId: string): Observable<any>;
    getMainProductImage(productId: string): Observable<any>;
    upload(file: any, signed_request: string): Observable<any>;
    moveImageUp(imageId: string): Observable<any>;
    moveImageDown(imageId: string): Observable<any>;
}
