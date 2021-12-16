import { OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import { CartService } from '../cart/cart.service';
import { CheckoutService } from './checkout.service';
import { SalesTaxService } from '../sales-tax/sales-tax.service';
import { State } from '../states/state';
import { StatesService } from '../states/states.service';
export declare class CheckoutComponent implements OnInit {
    private cartService;
    private location;
    private checkoutService;
    private salesTaxService;
    private statesService;
    private router;
    salesTaxRate: Observable<number>;
    countyChanges: Observable<string>;
    countyControl: FormControl;
    selectedState: BehaviorSubject<string>;
    stateSelectElement: HTMLSelectElement;
    stateSelectElementChanges: Observable<string>;
    states: Observable<State[]>;
    counties: Observable<string[]>;
    constructor(cartService: CartService, location: Location, checkoutService: CheckoutService, salesTaxService: SalesTaxService, statesService: StatesService, router: Router);
    ngOnInit(): void;
    goBack(): void;
    getCreditCardToken(): void;
    onStateChanged(event: any): void;
    viewOrderSummary(): void;
}
