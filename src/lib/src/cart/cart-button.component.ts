import { Component } from '@angular/core'
import { CartService } from './cart.service.js'

import { Product } from '../products/product';

@Component({
    selector: 'add-cart',
    template: `<button (click)="addToCart(product)">Add to Cart</button>`,
    inputs: ['product']
})
export class AddCartComponent {

    constructor(
        private _shoppingCartService: CartService
    ) { }

    addToCart(product: Product) {
        this._shoppingCartService.add(product)
    }

}