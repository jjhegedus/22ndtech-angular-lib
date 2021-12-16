import { CartService } from './cart.service.js';
import { Product } from '../products/product';
export declare class AddCartComponent {
    private _shoppingCartService;
    constructor(_shoppingCartService: CartService);
    addToCart(product: Product): void;
}
