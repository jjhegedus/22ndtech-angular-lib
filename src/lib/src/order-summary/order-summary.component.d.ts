import { OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CartItem } from '../cart/cart-item';
import { CartService } from '../cart/cart.service';
import { CheckoutService } from '../checkout/checkout.service';
export declare class OrderSummaryComponent implements OnInit {
    private cartService;
    private location;
    private router;
    private checkoutService;
    cartItems: CartItem[];
    cartGrandTotal: number;
    constructor(cartService: CartService, location: Location, router: Router, checkoutService: CheckoutService);
    ngOnInit(): void;
    decreaseQuantity(index: number): void;
    increaseQuantity(index: number): void;
    goBack(): void;
    submitOrder(): void;
}
