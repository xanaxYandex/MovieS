import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    public dropDown = false;

    constructor() { }

    public dropDownState(): void {
        if (this.dropDown === false) {
            this.dropDown = true;
        } else {
            this.dropDown = false;
        }
    }
}
