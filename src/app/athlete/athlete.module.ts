import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AthleteComponent} from './athlete.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    AthleteComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AthleteModule { }
