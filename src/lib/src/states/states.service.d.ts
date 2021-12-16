import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/reduce';
import { ConfigService } from '../config/config.service';
import { State } from './state';
export declare class StatesService {
    private http;
    private configService;
    title: string;
    private stateUrl;
    private config;
    private states;
    constructor(http: Http, configService: ConfigService);
    getStates(): Observable<State[]>;
}
