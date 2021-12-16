import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combinelatest';
import 'rxjs/add/operator/withlatestfrom';

import { ConfigService } from '../config/config.service';
import { Product } from './product';
import { ProductProductCategoriesService } from '../product-categories/product-product-categories.service';
import { ProductProductCategory } from '../product-categories/product-product-category';
import { ProductCategory } from '../product-categories/product-category';
import { ContextService } from '../context/context.service';

@Injectable()
export class ProductsService {
    title = 'Products Service';
    // private productsUrl = 'http://localhost:8081/products'; // URL to web api
    // private productsUrl = 'http://ec2-34-207-115-234.compute-1.amazonaws.com/products'; // URL to web api
    private productsUrl = '';
    private config: any;
    private productProductCategories: Observable<ProductProductCategory[]>;

    private headers = new Headers({ 'Content-Type': 'application/json' });

    private products: Observable<Product[]>;


    constructor(
        private http: Http,
        private configService: ConfigService,
        private productProductCategoriesService: ProductProductCategoriesService,
        private contextService: ContextService
    ) {
        this.configService.getConfig((configuration: any) => {
            this.config = configuration;
            this.productsUrl = this.config.baseUrl + '/products';

            this.loadProductProductCategories();
            this.loadProducts();
        });
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    loadProductProductCategories(): void {
        this.productProductCategories = this.productProductCategoriesService.getProductProductCategories();
    }

    loadProducts(): void {
        this.loadProductProductCategories();
        this.products =
            this.contextService.selectedCategory
                .asObservable()
                .combineLatest(
                    this.http.get(this.productsUrl)
                        .map(res => res.json()),
                    this.productProductCategories,
                    (
                        selectedCategory: string,
                        products: Product[],
                        productProductCategories: ProductProductCategory[]
                    ) => {
                        // console.log('products = ');
                        // console.log(products);
                        // console.log('productProductCategories = ');
                        // console.log(productProductCategories);
                        // console.log('selectedCategory =' + selectedCategory);

                        return {
                            products: products,
                            productProductCategories: productProductCategories, selectedCategory: selectedCategory
                        };
                    })
                .map(
                    (latest: any) => {
                        // console.log('filter latest = ');
                        // console.log(latest);

                        if (latest.selectedCategory !== 'All') {
                            let productProductCategories: ProductProductCategory[] = latest.productProductCategories.filter(
                                (productProductCategory: ProductProductCategory) => {
                                    return productProductCategory.ProductCategory.Key === latest.selectedCategory;
                                }
                            );

                            // console.log('productProductCategories = ');
                            // console.log(productProductCategories);

                            if (productProductCategories) {
                                var returnedProducts: Product[] = new Array<Product>();

                                productProductCategories.forEach(
                                    productProductCategory => {
                                        returnedProducts.push(productProductCategory.Product);
                                    }
                                );

                                // console.log('returnedProducts = ');
                                // console.log(returnedProducts);

                                return returnedProducts;
                            } else {
                                return [];
                            }
                        } else {
                            // console.log('returning all products');
                            // console.log('latest.products =');
                            // console.log(latest.products);
                            return latest.products;
                        }
                    });
    }

    // loadProducts(): void {
    //     this.products = this.http.get(this.productsUrl)
    //         .map(res => res.json())
    //         .mergeAll()
    //         .withLatestFrom(
    //         this.productProductCategories,
    //         this.contextService.selectedCategory,
    //         (
    //             product: Product,
    //             productProductCategories: ProductProductCategory[],
    //             selectedCategory: string
    //         ) => ({ product: product, productProductCategories: productProductCategories, selectedCategory: selectedCategory })
    //         )
    //         .filter(
    //         (latest: any) => {
    //             console.log('latest = ');
    //             console.log(latest);

    //             if(latest.selectedCategory !== 'undefined'){
    //                 let productProductCategory: ProductProductCategory = latest.productProductCategories.find(
    //                     (productProductCategory: ProductProductCategory)=>{
    //                         return productProductCategory.Product.id === latest.product.id && productProductCategory.ProductCategory.Key === latest.selectedCategory;
    //                     }
    //                 );

    //                 console.log('productProductCategory = ');
    //                 console.log(productProductCategory);

    //                 if(productProductCategory){
    //                     return true;
    //                 }
    //             } else {
    //                 console.log('returning true');
    //                 return true;
    //             }

    //             // if (latest.productProductCategory.ProductCategory.Key === 'undefined') {
    //             //     if (
    //             //         latest.product.id === latest.productProductCategory.Product.id
    //             //         &&
    //             //         latest.selectedCategory === latest.productProductCategory.ProductCategory.Key
    //             //     ) {
    //             //         return true;
    //             //     }
    //             // } else {
    //             //     return true;
    //             // }
    //         })
    //         .map((latest:any) => {return latest.product})
    //         .toArray();
    // }



    // loadProducts(): void {
    //     this.products = this.http.get(this.productsUrl)
    //         .map(res => res.json())
    //         .mergeAll()
    //         .filter(
    //         (product: Product, index: number): boolean => {
    //             if (this.productProductCategories) {
    //                 let productProductCategory = this.productProductCategories
    //                 .mergeAll()
    //                 .filter(
    //                     (productProductCategory) => {
    //                     console.log('this.contextService.selectedCategory = ' + this.contextService.selectedCategory);

    //                     // return productProductCategory.Product.id === product.id && productProductCategory.ProductCategory.Key === this.contextService.selectedCategory;

    //                     return true;
    //                 });

    //                 // .find(
    //                 //     (productProductCategory) => {
    //                 //         console.log('this.contextService.selectedCategory = ' + this.contextService.selectedCategory);

    //                 //         return productProductCategory.Product.id === product.id && productProductCategory.ProductCategory.Key === this.contextService.selectedCategory;
    //                 //     }
    //                 // )

    //                 console.log('product = ' + JSON.stringify(product));

    //                 console.log('productProductCategory = ' + JSON.stringify(productProductCategory));

    //                 if (productProductCategory) {
    //                     return true;
    //                 } else {
    //                     return false;
    //                 }
    //             } else {
    //                 return false;
    //             }
    //         })
    //         .toArray();
    // }

    // loadProducts(): void{
    //     this.products = this.http.get(this.productsUrl).map(res => res.json());
    // }

    getProducts(): Observable<Product[]> {

        return this.products;
    }


    getProduct(id: string): Observable<Product> {
        const url = `${this.productsUrl}/${id}`;
        return this.http.get(url).map(res => res.json());
    };

    updateProduct(product: Product): Observable<Product> {
        const url = `${this.productsUrl}/${product.id}`;

        return this.http.put(
            url,
            JSON.stringify(product),
            {
                headers: this.headers
            }
        ).map(res => res.json());
    }

    createProduct(product: Product): Observable<Product> {

        return this.http.post(
            this.productsUrl,
            JSON.stringify(product),
            {
                headers: this.headers
            }
        ).map(res => res.json());
    }

    deleteProduct(id: string): Observable<any> {
        const url = `${this.productsUrl}/${id}`;
        return this.http.delete(url).map(res => res.json()).catch(this.handleError);
    };

}
