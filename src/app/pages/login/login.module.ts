import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { SharedModule } from '../../shared/shared.module';
import { Login } from './login.component';
import { LoginRouting } from './login.routing';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    LoginRouting,
    SharedModule
  ],
  declarations: [ Login ],
  providers: [ LoginService ]
})
export class LoginModule { }
