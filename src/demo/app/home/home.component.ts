import { Component } from '@angular/core';

import { ConfigService, CartService } from '22ndtech-angular-lib';

@Component({
    selector: 'my-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    pageName: string = 'Home';
    private config: any;

    constructor(
        private configService: ConfigService,
        private cartService: CartService
    ) {


    }


}
