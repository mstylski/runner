import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ActivityService} from './activity.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth-interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {MaterialModule} from './shared/material/material.module';
import {AthleteModule} from './athlete/athlete.module';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {DetailActivityComponent} from './training/detail-activity/detail-activity.component';
import {AuthService} from './auth.service';
import {AthleteService} from './athlete.service';
import {ChartsModule} from 'ng2-charts';
import {UtilsModule} from './training/training-calendar/utils/module';
import {CommonModule} from '@angular/common';
import {RoutesDetailsComponent} from './routes/routes-details/routes-details.component';
import {MySegmentsDetailsComponent} from './segments/my-segments/my-segments-details/my-segments-details.component';
import {IvyGalleryModule} from 'angular-gallery';
import {LoginComponent} from './login/login.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    DetailActivityComponent,
    RoutesDetailsComponent,
    MySegmentsDetailsComponent,
    LoginComponent,
  ],
  imports: [
    [IvyGalleryModule],
    CommonModule,
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AthleteModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    UtilsModule
  ],
  providers: [
    AuthService,
    ActivityService,
    AthleteService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
