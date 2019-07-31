import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public dropDown = 'none';

    @Output() dropDownMenu: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    dropDownState() {
        if (this.dropDown === 'none') {
            this.dropDown = 'block';
        } else {
            this.dropDown = 'none';
        }
    }

    onDropDownClick(paragragh: string) {
        this.dropDownMenu.emit(paragragh);
    }

}
