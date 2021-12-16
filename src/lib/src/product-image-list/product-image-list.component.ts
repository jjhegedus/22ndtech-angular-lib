import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { ConfigService } from '../config/config.service';
import { Product } from '../products/product';
import { ProductsService } from '../products/products.service';
import { ProductImage } from '../products/product-image';
import { ProductImageService } from '../products/product-image.service';
import { CartService } from '../cart/cart.service';

@Component({
    selector: 'my-product-image-list',
    templateUrl: './product-image-list.component.html',
    styleUrls: ['./product-image-list.component.scss']
})

export class ProductImageListComponent implements OnInit {

    products: Product[];
    private oddProducts: Product[];
    private evenProducts: Product[];

    private productIndexes: number[] = [];
    selectedProduct: Product;
    private productImages: ProductImage[];
    private config: any;
    @Input() cartService: CartService;

    constructor(
        private router: Router,
        private configService: ConfigService,
        private productsService: ProductsService,
        private productImageService: ProductImageService
    ) {
        this.configService.getConfig((configuration: any) => {
            this.config = configuration;
        });
    }

    ngOnInit(): void {
        console.log('ProductImageListComponent:ngOnInit()');
        this.getProducts();
    }

    getProducts(): void {
        this.productsService.getProducts().subscribe(
            products => {
                console.log('product-image-list.components.ts: products = ');
                console.log(products);

                this.products = products;
                this.getMainImages();
  
                let count = 0;
                this.productIndexes = [];
  
                this.oddProducts = this.products.filter(
                    (value, index) => {
                        // console.log('home.component.getProducts().oddProducts:value = ' + JSON.stringify(value));
                        if (!(index % 2)) {
                            this.productIndexes.push(count);
                            count++;
                            return true;
                        }
                    }
                );
  
                this.evenProducts = this.products.filter(
                    (value, index) => {
                        // console.log('home.component.getProducts().evenProducts:value = ' + JSON.stringify(value));
                        return index % 2;
                    }
                );
  
            });
    }

    getMainImages(): void {
        for (let i = 0; i < this.products.length; i++) {
  
            let product: Product = this.products[i];
  
            this.productImageService.getMainProductImage(product.id).subscribe(
                (mainProductImage) => {
                    // console.log('home.component.getMainImages.foundMainImage = ' + JSON.stringify(mainProductImage));
  
                    if (mainProductImage != null) {
                        product.mainImageUrl = this.config.awsBucket + mainProductImage.Key;
                    }
                },
                (err) => {
                    console.log('home.component.getMainImages.err = ' + err);
                }
            );
        }
    }

    onSelect(product: Product): void {
        this.selectedProduct = product;
    }

    deleteProducts(product: Product): void {
        this.productsService.deleteProduct(product.id).subscribe(
            () => {
                this.products = this.products.filter(p => p !== product);
                if (this.selectedProduct === product) {
                    this.selectedProduct = null;
                }
            });
    }

    gotoDetail(id: string): void {
        this.router.navigate(['/product-details', id]);
    }


    buyNow(productId: string): void {
        let product = this.products.find((foundProduct) => {
            return foundProduct.id === productId;
        });
  
        this.cartService.add(product);
        this.router.navigate(['/checkout']);
    }

    addToCart(product: Product): void {
        //console.log('product-image-list.component.addToCart product = ' + JSON.stringify(product));
        //console.log('this.cartService = ' + JSON.stringify(this.cartService));
        //console.log('this.cartService.add = ' + this.cartService.add);
        this.cartService.add(product);
        //console.log('this.cartService = ' + JSON.stringify(this.cartService));
    }
}
