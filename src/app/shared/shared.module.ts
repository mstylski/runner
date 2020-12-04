import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material/material.module';

const Modules = [
  RouterModule,
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  MaterialModule,
];

@NgModule({
  declarations: [],
  imports: [
    ...Modules,
    CommonModule
  ],
  exports: [
    ...Modules,
  ]
})
export class SharedModule {}
