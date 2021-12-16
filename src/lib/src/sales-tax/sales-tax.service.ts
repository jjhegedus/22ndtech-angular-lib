import { Injectable } from '@angular/core';
// import { Headers, Http } from '@angular/http';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/reduce';

import { ConfigService } from '../config/config.service';
import { CountyTaxRate } from './county-tax-rate';

@Injectable()
export class SalesTaxService {
    title = 'Sales-Tax Service';
    private salesTaxUrl = '';
    private config: any;
    private countyTaxRates: Observable<CountyTaxRate[]>;
    private countyTaxRatesStream: Observable<CountyTaxRate>;
    private countyTaxRate: Observable<number>;

    // private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(
        private http: Http,
        private configService: ConfigService
    ) {
        this.configService.getConfig((configuration:any) => {
            this.config = configuration;
            this.salesTaxUrl = this.config.baseUrl + '/sales-tax';

            this.getCountyTaxRates();
        });
    }


    // private handleError(error: any): Promise<any> {
    //     console.error('An error occurred', error); // for demo purposes only
    //     return Promise.reject(error.message || error);
    // }

    getCountyTaxRates(): Observable<CountyTaxRate[]> {

        this.countyTaxRates = this.http.get(this.salesTaxUrl).map(res => res.json());
        
        return this.countyTaxRates;
    }

    getCountyTaxRatesStream(): Observable<CountyTaxRate>{
        this.countyTaxRatesStream = this.countyTaxRates.concatMap((data) => {
            return data;
        });

        return this.countyTaxRatesStream;
    };

    getCountyTaxRate(county: string): Observable<number> {
        this.countyTaxRate = this.getCountyTaxRatesStream()
        .filter((countyTaxRate)=>{
            return countyTaxRate.county == county;
        })
        .reduce((acc, countyTaxRate) => acc + countyTaxRate.surtax, 0);
        
        return this.countyTaxRate;
    };



}
