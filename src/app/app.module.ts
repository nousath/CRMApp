import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleNotificationsModule } from 'angular2-notifications';
/*
 * Platform and Environment providers/directives/pipes
 */
import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';
import { CacheService } from 'app/shared/cache.service';
import { LoginService } from './pages/login/login.service';
import { SignoutService } from './shared/signout.service';
import { AuthHttpInterceptor } from './shared/http.interceptor';
// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void,
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
  
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    AppRouting,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
  ],
  
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
    CacheService,
    SignoutService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    }
  ],
})

export class AppModule {

  constructor(public appState: AppState) {
}
}