import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import {TrainingCalendarComponent} from '../training/training-calendar/training-calendar.component';

@NgModule({
  imports: [CommonModule, FormsModule, CalendarModule],
  declarations: [TrainingCalendarComponent],
  exports: [TrainingCalendarComponent],
})
export class DemoUtilsModule {}
