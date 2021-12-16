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
export declare class SalesTaxService {
    private http;
    private configService;
    title: string;
    private salesTaxUrl;
    private config;
    private countyTaxRates;
    private countyTaxRatesStream;
    private countyTaxRate;
    constructor(http: Http, configService: ConfigService);
    getCountyTaxRates(): Observable<CountyTaxRate[]>;
    getCountyTaxRatesStream(): Observable<CountyTaxRate>;
    getCountyTaxRate(county: string): Observable<number>;
}
