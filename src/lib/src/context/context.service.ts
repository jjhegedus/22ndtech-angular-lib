import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ConfigService } from '../config/config.service';

@Injectable()
export class ContextService {
    title = 'ContextService';
    private config: any;
    selectedCategory: BehaviorSubject<string> = new BehaviorSubject<string>('All');

    constructor(
        private configService: ConfigService
    ) {
        console.log('constructing ContextService')
        this.configService.getConfig((configuration:any) => {
            this.config = configuration;
        });
    }

    setSelectedCategory(newSelectedCategory: string)
    {
        this.selectedCategory.next(newSelectedCategory);
    }


}
