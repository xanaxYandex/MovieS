import { Directive, OnInit, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
    selector: '[appSetImage]'
})
export class SetImageDirective implements OnChanges {

    @Input() backImage: string;

    constructor(private element: ElementRef) { }

    public ngOnChanges(): void {
        if (this.backImage) {
            this.element.nativeElement.style.backgroundImage = `url(${this.backImage})`;
        }
    }
}
