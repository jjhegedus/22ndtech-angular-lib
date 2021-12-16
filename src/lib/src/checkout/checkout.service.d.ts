import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CheckoutInfo } from './CheckoutInfo';
import { ConfigService } from '../config/config.service';
import { CartService } from '../cart/cart.service';
export declare class CheckoutService {
    private http;
    private configService;
    private cartService;
    checkoutInfo: CheckoutInfo;
    private baseUrl;
    private creditCardTokenSubject;
    private configured;
    private config;
    constructor(http: Http, configService: ConfigService, cartService: CartService);
    getCreditCardToken(checkoutInfo: CheckoutInfo): Observable<any>;
    getCreditCardToken2(): void;
    createCharge(checkoutInfo: CheckoutInfo): Observable<any>;
    getGrandTotal(): number;
    updateTotals(): void;
    updateShippingInformation(newShippingInformation: number): void;
}
