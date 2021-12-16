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
import { State } from './state';

@Injectable()
export class StatesService {
    title = 'State Service';
    private stateUrl = '';
    private config: any;
    private states: Observable<State[]>;

    constructor(
        private http: Http,
        private configService: ConfigService
    ) {
        this.configService.getConfig((configuration:any) => {
            this.config = configuration;
            this.stateUrl = this.config.baseUrl + '/states';

            this.getStates();
        });
    }

    getStates(): Observable<State[]> {

        this.states = this.http.get(this.stateUrl).map(res => res.json());
        
        return this.states;
    }

}
