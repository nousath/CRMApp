import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    styleUrls: ['./followupModal.component.scss'],
    templateUrl: './followupModal.component.html',
})

export class FollowUpModalComponent {

    BUTTONS = { OK: 'OK', Cancel: 'Cancel' };
    showCancel: boolean = false;
    showCross: boolean = false;
    modalHeader: string;
    modalContent: string = `modal content`;
	modalData:any = [];

    closeModalHandler: Function;
    dismissHandler: Function;
    constructor(private activeModal: NgbActiveModal) {
    }

    closeModal() {
        this.activeModal.close();
        if (this.closeModalHandler) {
            this.closeModalHandler();
        }
    }

    dismiss() {
        this.activeModal.dismiss('cancel');
        if (this.dismissHandler) {
            this.dismissHandler();
        }
    }
}