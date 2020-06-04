import { CurrencyFormatter } from './pipes/currency-pipe';
import { ModelPopupComponent } from './components/model-popup/model-popup.component';
import { AlphaNumeric } from './directives/alpha-numeric.directive';
import { ConcatStringPipe } from './pipes/concat-string.pipe';
import { SelectComponent } from './components/multiple-select/multiple-select';
import { CutStringPipe } from './pipes/cut-string.pipe';
import { TicketTypePipe } from './pipes/ticket-type.pipe';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { NumberAfterDecimalDirective } from './directives/numberafterdecimal.directive';
import { MinValueValidatorDirective } from './directives/min-value.directive';
import { SharedService } from './shared.service';
import { NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';
import { UserService } from './user.service';
import { GenericSort } from './pipes/generic-sort.pipe';
import { HttpService } from './http.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NumberDecimalDirective } from './directives/number-decimal.directive';
import { GenericFilter } from './pipes/generic-filter.pipe';
import { NgModule } from '@angular/core';
import { DatePicker } from './components/date-picker/date-picker.component';
import { FormsModule } from '@angular/forms';
import { TruncateZero } from 'app/shared/pipes/truncateZero.pipe';
import {EncrDecrService} from './encr-decr.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './http.interceptor';
import { VersionCheckService } from './version-check.service';

@NgModule({
    declarations: [
        GenericFilter,
        GenericSort,
        ModalComponent,
        PaginationComponent,
        MinValueValidatorDirective,
        NumberOnlyDirective,
        NumberDecimalDirective,
        NumberAfterDecimalDirective,
        TicketTypePipe,
        CutStringPipe,
        SelectComponent,
        AlphaNumeric,
        ConcatStringPipe,
        ModelPopupComponent,
        CurrencyFormatter,
        TruncateZero,
        DatePicker
    ],
    exports: [
        GenericFilter,
        GenericSort,
        ModalComponent,
        PaginationComponent,
        MinValueValidatorDirective,
        TicketTypePipe,
        CutStringPipe,
        NumberOnlyDirective,
        NumberAfterDecimalDirective,
        NumberDecimalDirective,
        SelectComponent,
        AlphaNumeric,
        ConcatStringPipe,
        ModelPopupComponent,
        CurrencyFormatter,
        TruncateZero,
        DatePicker
    ],
    entryComponents: [
        ModalComponent,
        ModelPopupComponent
    ],
    imports: [CommonModule, NgbModalModule, NgbModule, FormsModule],
    providers: [HttpService, UserService, SharedService,VersionCheckService, EncrDecrService, {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthHttpInterceptor,
        multi: true,
      }],
})
export class SharedModule {

}
