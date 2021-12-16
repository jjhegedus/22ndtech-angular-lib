import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// import { Subscription } from 'rxjs/Subscription';

// import { Product } from '../products/product';
import { CheckoutInfo } from './CheckoutInfo';
import { ConfigService } from '../config/config.service';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../cart/cart-item';

declare var Stripe: any;

Stripe.setPublishableKey('pk_test_KB93PVnmMqX5CuBDWEGqp9J7');

@Injectable()
export class CheckoutService {
    checkoutInfo: CheckoutInfo = new CheckoutInfo();
    // private baseUrl = 'http://ec2-34-207-115-234.compute-1.amazonaws.com/';
    private baseUrl = '';
    // private observable: Observable<any>;
    private creditCardTokenSubject: Subject<any>;
    private configured = false;
    private config: any;

    constructor(
        private http: Http,
        private configService: ConfigService,
        private cartService: CartService
    ) {
        this.cartService.observableCartItems.subscribe(
            (newCartItems) => this.updateTotals()
        )

        this.creditCardTokenSubject = new Subject<any>();
        console.log('this.configService = ' + JSON.stringify(this.configService));

        this.checkoutInfo.ccnumber = '4242424242424242';
        this.checkoutInfo.nameoncard = 'TestAccount';
        this.checkoutInfo.ccexpmonth = 11;
        this.checkoutInfo.ccexpyear = 2019;
        this.checkoutInfo.ccv2 = '223';
        this.checkoutInfo.total_before_tax = this.cartService.getTotalBeforeTax();
        this.checkoutInfo.address_line1 = '6553 W 300 S';
        this.checkoutInfo.address_line2 = '';
        this.checkoutInfo.address_city = 'Jamestown';
        this.checkoutInfo.address_state = 'IN';
        this.checkoutInfo.address_zip = '46147';
        this.checkoutInfo.address_country = 'US';
        this.checkoutInfo.address_email = 'jeff@22ndtech';
        this.checkoutInfo.address_phone = '3175900300';
        this.checkoutInfo.address_county = 'Alachua'
        this.checkoutInfo.mail_class = 'FC LE F';
        this.checkoutInfo.sales_tax = 0;

        this.updateShippingInformation(5.95);

        this.configService.getConfig((configuration: any) => {
            this.config = configuration;
            this.baseUrl = this.config.baseUrl;
            this.configured = true;
        });
    }

    getCreditCardToken(checkoutInfo: CheckoutInfo): Observable<any> {
        this.checkoutInfo = checkoutInfo;
        if (this.creditCardTokenSubject) {
            this.creditCardTokenSubject = new Subject<any>();
        }
        // this.observable = Observable.create(observer => {
        //    alert('observer = ' + observer);
        //    observer.next('called observer.next');
        // });




        let message = '';
        message += 'checkout.service.ts:CheckoutService.checkout()\n\n';
        message += '  Stripe = ' + Stripe + '\n\n';
        message += 'cartItems = ' + JSON.stringify(this.checkoutInfo) + '\n\n';

        // alert(message);



        Stripe.card.createToken({
            number: checkoutInfo.ccnumber,
            cvc: checkoutInfo.ccv2,
            exp_month: checkoutInfo.ccexpmonth,
            exp_year: checkoutInfo.ccexpyear
        }, (status: any, response: any) => {
            console.log('tokenCreated :\n\tstatus = ' + status + '\n\tresponse = ' + JSON.stringify(response));

            // const url = this.baseUrl + "checkout/";
            // return this.http.put(
            //    url,
            //    {})
            //    .map(res => res.json());
            if (status === 200) {
                this.creditCardTokenSubject.next(response);
            } else {
                throw (response);
            }
        });

        // return this.observable;
        return this.creditCardTokenSubject.asObservable();
    }

    getCreditCardToken2(): void {
        this.getCreditCardToken(this.checkoutInfo).subscribe(
            (next) => {
                this.checkoutInfo.cardToken = next.id;
                this.createCharge(this.checkoutInfo).subscribe(
                    (nextCheckoutInfo) => {
                        console.log('checkout.component.ts:getCreditCardToken nextCheckoutInfo = ' + nextCheckoutInfo);
                        // console.log('checkout.component.ts:getCreditCardToken next = ' + next());
                    },
                    (err) => {
                        console.log('create charge err = ' + err);
                    },
                    () => {
                        console.log('create charge completed');
                        this.cartService.clear();
                        this.checkoutInfo.cardToken = null;
                        window.location.href = '/';
                    }
                );
            },
            (err) => {
                console.log('err = ' + JSON.stringify(err));
            },
            () => {
                console.log('completing');
            }
        );
    }

    createCharge(checkoutInfo: CheckoutInfo): Observable<any> {
        this.checkoutInfo = checkoutInfo;
        console.log('createCharge this.checkoutInfo = ' + JSON.stringify(this.checkoutInfo));
        let url = this.baseUrl + '/checkout/charges';
        return this.http.post(url, { checkoutInfo: checkoutInfo }).map(res => res.json);
    }

    getGrandTotal(): number {
        return this.cartService.getTotalBeforeTax();
    }

    updateTotals() {

        this.checkoutInfo.total_before_tax = this.cartService.getTotalBeforeTax();

        this.checkoutInfo.sales_tax = Math.round(this.cartService.getTotalBeforeTax() * this.checkoutInfo.sales_tax_rate) / 100;

        this.checkoutInfo.total_after_tax = Math.round((this.checkoutInfo.total_before_tax + this.checkoutInfo.sales_tax) * 100) / 100;

        this.checkoutInfo.grand_total = Math.round((this.checkoutInfo.total_after_tax + this.checkoutInfo.shipping_cost) * 100) / 100;
    }

    updateShippingInformation(newShippingInformation: number) {
        this.checkoutInfo.shipping_cost = newShippingInformation;
    }

}
