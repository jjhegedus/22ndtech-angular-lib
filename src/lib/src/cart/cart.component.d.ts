import { OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CartItem } from './cart-item';
import { CartService } from './cart.service';
export declare class CartComponent implements OnInit {
    private cartService;
    private location;
    private router;
    cartItems: CartItem[];
    cartGrandTotal: number;
    constructor(cartService: CartService, location: Location, router: Router);
    ngOnInit(): void;
    decreaseQuantity(index: number): void;
    increaseQuantity(index: number): void;
    goBack(): void;
    checkout(): void;
}
