import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { PagesRouting } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';
import { PagesComponent } from './pages.component';
import { PagesService } from './pages.service';
import { FollowUpModalComponent } from './followupModal/followupModal.component';

@NgModule({
  imports: [CommonModule, AppTranslationModule, NgbModule, NgaModule, PagesRouting, SharedModule],
  declarations: [PagesComponent,FollowUpModalComponent],
  entryComponents: [FollowUpModalComponent],
  providers: [AuthGuard,AuthService, PagesService],
})
export class PagesModule {
}
