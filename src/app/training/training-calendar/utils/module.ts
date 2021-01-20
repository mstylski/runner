import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'angular-calendar';
import {TrainingCalendarComponent} from '../training-calendar.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [FormsModule, CalendarModule, CommonModule, RouterModule, TranslateModule],
  declarations: [TrainingCalendarComponent],
  exports: [TrainingCalendarComponent],
})
export class UtilsModule {
}
