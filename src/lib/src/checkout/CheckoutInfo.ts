import { CartItem } from '../cart/cart-item';

export class CheckoutInfo {
    nameoncard: string;
    ccnumber: string;
    ccexpmonth: number;
    ccexpyear: number;
    ccv2: string;
    address_line1: string;
    address_line2: string;
    address_city: string;
    address_state: string;
    address_zip: string;
    address_country: string;
    address_email: string;
    address_phone: string;
    address_county: string;
    cartItems: CartItem[];
    total_before_tax: number;
    cardToken: string;
    mail_class: string;
    sales_tax_rate: number;
    sales_tax: number;
    total_after_tax: number;
    shipping_cost: number;
    grand_total: number;
}
