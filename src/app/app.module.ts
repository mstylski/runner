import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ActivityService} from './activity.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    DetailActivityComponent,
  ],
  imports: [
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
