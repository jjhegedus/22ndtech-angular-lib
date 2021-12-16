import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';

// import { Product } from '../products/product';
import { CartItem } from './cart-item';
import { CartService } from './cart.service';

@Component({
    selector: 'my-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
    cartItems: CartItem[];
    cartGrandTotal: number;

    constructor(
        private cartService: CartService,
        private location: Location,
        private router: Router
    ) {
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

    checkout(): void {
        this.router.navigate(['/checkout']);
    }
}
