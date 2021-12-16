import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Product } from '../products/product';
import { CartItem } from '../cart/cart-item';
export declare class CartService {
    cartItems: CartItem[];
    observableCartItems: BehaviorSubject<CartItem[]>;
    observableTotalBeforeTax: Observable<number>;
    constructor();
    add(product: Product): void;
    increaseQuantity(index: number): void;
    decreaseQuantity(index: number): void;
    clear(): void;
    get(): CartItem[];
    getTotalBeforeTax(): number;
    totalBeforeTax(cartItems: CartItem[]): number;
    numberOfItems(): number;
}
