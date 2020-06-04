import { Directive, HostListener, ElementRef, OnInit, Input, EventEmitter, Output } from "@angular/core";
@Directive({
    selector: '[numberAfterDecimalOnly]',
})
export class NumberAfterDecimalDirective {
    private el: any;
    @Input()
    numberAfterDecimalOnly: boolean = false;
    @Output() ngModelChange = new EventEmitter();

    constructor(private elementRef: ElementRef) {
        this.el = this.elementRef.nativeElement;
        this.el.addEventListener('keypress', (e) => {
            const keyCode = (e.keyCode ? e.keyCode : e.which);
            if (this.numberAfterDecimalOnly && keyCode === 46 && e.target.value.indexOf(".") < 0) { // check for decimal
                return true;
            }
            else if ((keyCode > 47 && keyCode < 58) || (keyCode === 8)) {
                return true;
            }
            e.preventDefault();
        });
    }

    ngOnInit() {
        this.el.value = this.el.value;
    }

    @HostListener("keyup", ["$event.target.value"])
    keyup(value) {
        if (!this.numberAfterDecimalOnly) {
            return;
        }
        if (this.numberAfterDecimalOnly && value.indexOf(".") >= 0 && value.split(".")[1].length > 5) {
            
            let result = value.substring(0, value.indexOf(".") + 6);
            this.ngModelChange.emit(result);
        }
    }
}
