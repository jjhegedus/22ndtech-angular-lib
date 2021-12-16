import { Component, Input } from '@angular/core';

import { CartService } from '22ndtech-angular-lib';

@Component({
    selector: 'my-nav', // <my-app></my-app>
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
    title: string;

    constructor(
        private cartService: CartService
    ) {
        this.title = "nav";
    }

}
