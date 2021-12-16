import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';

// import {Product } from '../products/product';
// import { CartItem } from '../cart/cart-item';
import { CartService } from '../cart/cart.service';
import { CheckoutService } from './checkout.service';
import { SalesTaxService } from '../sales-tax/sales-tax.service';
import { State } from '../states/state';
import { StatesService } from '../states/states.service';

@Component({
    selector: 'my-cart',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
    salesTaxRate: Observable<number>;
    countyChanges: Observable<string>;
    countyControl: FormControl = new FormControl('', Validators.required);
    selectedState: BehaviorSubject<string> = new BehaviorSubject<string>('undefined');
    stateSelectElement: HTMLSelectElement;
    stateSelectElementChanges: Observable<string>;
    states: Observable<State[]>;
    counties: Observable<string[]>;

    constructor(
        private cartService: CartService,
        private location: Location,
        private checkoutService: CheckoutService,
        private salesTaxService: SalesTaxService,
        private statesService: StatesService,
        private router: Router
    ) {
    }

    ngOnInit() {

        this.states = this.statesService.getStates();
        this.counties =
            this.salesTaxService.getCountyTaxRates()
                .flatMap(countyTaxRates => Observable.from(countyTaxRates))
                .map(countyTaxRate => countyTaxRate.county)
                .distinct()
                .toArray();

        this.stateSelectElement = <HTMLSelectElement>document.getElementById('address_state');

        this.stateSelectElementChanges = Observable.fromEvent(
            this.stateSelectElement, 'change'
        );

        this.stateSelectElementChanges.subscribe(
            event => this.onStateChanged(event));

        console.log('checkout.component.ts: salesTaxService <below>')
        console.log(this.salesTaxService);

        // this.salesTaxService.getCountyTaxRate(this.checkoutService.checkoutInfo.address_county).subscribe(
        //     (taxrate) =>
        //     {
        //         alert('taxrate = ' + taxrate);
        //         this.checkoutService.checkoutInfo.sales_tax_rate = taxrate;
        //     });

        // this.countyControl = <HTMLInputElement>document.getElementById('address_county');

        console.log('this.countyControl = ' + JSON.stringify(this.countyControl));

        this.countyChanges = this.countyControl.valueChanges.debounceTime(500);

        console.log('this.countyChanges = ' + JSON.stringify(this.countyChanges));

        this.countyChanges
            .combineLatest(
                this.selectedState.asObservable(),
                (
                    nextCounty: string,
                    selectedState
                ) => {
                    return {
                        county: nextCounty,
                        state: selectedState
                    };
                })
            .subscribe((latest) => {

                console.log('latest.county = ' + latest.county);
                console.log('latest.state = ' + latest.state);

                this.checkoutService.checkoutInfo.address_county = latest.county;
                
                this.checkoutService.checkoutInfo.address_state = latest.state;

                this.salesTaxRate = 
                    this.salesTaxService.getCountyTaxRate(latest.county)
                        .withLatestFrom(this.selectedState)
                        .map(([taxRate, selectedState]) => selectedState == 'FL' ? taxRate + 6: 0);


                    this.salesTaxRate.subscribe((nextRate) => {

                        console.log('nextRate = ' + nextRate);
                        this.checkoutService.checkoutInfo.sales_tax_rate = nextRate;

                        this.checkoutService.updateTotals()
                        
                    })
            });
            
    }

    goBack(): void {
        this.location.back();
    }

    getCreditCardToken(): void {
        this.checkoutService.getCreditCardToken(this.checkoutService.checkoutInfo).subscribe(
            (next) => {
                console.log('next = ' + JSON.stringify(next));
                this.checkoutService.checkoutInfo.cardToken = next.id;
                this.checkoutService.createCharge(this.checkoutService.checkoutInfo).subscribe(
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
                        this.checkoutService.checkoutInfo.cardToken = null;
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

    onStateChanged(event: any) {
        this.selectedState.next(event.target.value);
    }



    viewOrderSummary(): void {
        this.router.navigate(['/order-summary']);
    }

}
