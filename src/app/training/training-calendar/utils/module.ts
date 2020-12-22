import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'angular-calendar';
import {TrainingCalendarComponent} from '../training-calendar.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [FormsModule, CalendarModule, CommonModule],
  declarations: [TrainingCalendarComponent],
  exports: [TrainingCalendarComponent],
})
export class UtilsModule {
}
