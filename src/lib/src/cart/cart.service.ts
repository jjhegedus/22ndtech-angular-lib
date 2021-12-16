import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Product } from '../products/product';
import { CartItem } from '../cart/cart-item';

@Injectable()
export class CartService {

    cartItems: CartItem[] = [];
    observableCartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(this.cartItems);
    observableTotalBeforeTax: Observable<number> =
    this.observableCartItems.asObservable()
        .map((cartItems: CartItem[]) => this.totalBeforeTax(cartItems));

    constructor() {

        this.cartItems = [];

    }

    add(product: Product) {
        //console.log('cart.service.ts.add: this.cartItems = ' + JSON.stringify(this.cartItems));

        // console.log('searcing for cartItem.product = ' + JSON.stringify(product));
        // let testNumber = 0;
        let cartItem = this.cartItems.find((testCartItem) => {
            // testNumber++;
            // console.log('testCartItem' + testNumber);
            return testCartItem.product === product;
        });

        if (cartItem) {
            cartItem.quantity++;
            // console.log('found cartItem, quantity incremented to = ' + cartItem.quantity);
        } else {
            // console.log('no cartItem found. creating a new one');
            cartItem = new CartItem();
            cartItem.product = product;
            cartItem.quantity = 1;
            cartItem.index = this.cartItems.length;
            this.cartItems.push(cartItem);
        }

        this.observableCartItems.next(this.cartItems);

    }

    increaseQuantity(index: number) {
        if (index > -1) {
            let cartItem = this.cartItems[index];

            cartItem.quantity++;
        }

        this.observableCartItems.next(this.cartItems);
    }

    decreaseQuantity(index: number) {

        if (index > -1) {
            let cartItem = this.cartItems[index];

            if (cartItem.quantity === 1) {
                this.cartItems.splice(index, 1);

                for (let i = index; i < this.cartItems.length; i++) {
                    this.cartItems[i].index = i;
                }
            } else {
                cartItem.quantity--;
            }
        }

        this.observableCartItems.next(this.cartItems);
    }

    clear() {

        this.cartItems = [];

        this.observableCartItems.next(this.cartItems);
    }

    get() {
        return this.cartItems;

    }

    getTotalBeforeTax() {
        let totalBeforeTax = 0;
        for (let index = 0; index < this.cartItems.length; index++) {
            totalBeforeTax += this.cartItems[index].quantity * parseFloat(this.cartItems[index].product.price);
        }

        return Math.round(totalBeforeTax * 100) / 100;
    }

    totalBeforeTax(cartItems: CartItem[]) {
        let totalBeforeTax = 0;
        for (let index = 0; index < cartItems.length; index++) {
            totalBeforeTax += cartItems[index].quantity * parseFloat(cartItems[index].product.price);
        }

        return totalBeforeTax;
    }

    numberOfItems() {
        let count = 0;

        for (let item of this.cartItems) {
            count += item.quantity;
        }

        return count;
    }

}
