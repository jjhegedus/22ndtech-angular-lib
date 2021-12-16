import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';

// import { Product } from '../products/product';
import { CartItem } from '../cart/cart-item';
import { CartService } from '../cart/cart.service';
import { CheckoutService } from '../checkout/checkout.service';

@Component({
    selector: 'my-order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.scss']
})

export class OrderSummaryComponent implements OnInit {
    cartItems: CartItem[];
    cartGrandTotal: number;

    constructor(
        private cartService: CartService,
        private location: Location,
        private router: Router,
        private checkoutService: CheckoutService
    ) {
        console.log('this.checkoutService.checkoutInfo');
        console.log(this.checkoutService.checkoutInfo);
    }

    ngOnInit() {
        this.cartItems = this.cartService.get();
        this.cartGrandTotal = this.cartService.getTotalBeforeTax();
    }

    decreaseQuantity(index: number) {
        this.cartService.decreaseQuantity(index);
        this.cartItems = this.cartService.get();
        this.cartGrandTotal = this.cartService.getTotalBeforeTax();
        this.cartItems;
    }

    increaseQuantity(index: number) {
        this.cartService.increaseQuantity(index);
        this.cartItems = this.cartService.get();
        this.cartGrandTotal = this.cartService.getTotalBeforeTax();
    }

    goBack(): void {
        this.location.back();
    }

    submitOrder(): void {
        this.checkoutService.getCreditCardToken2();
    }

}
