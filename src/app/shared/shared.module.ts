import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material/material.module';
import {CommonModule} from '@angular/common';

const Modules = [
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
  MaterialModule,
  CommonModule
];

@NgModule({
  declarations: [],
  imports: [
    ...Modules,
  ],
  exports: [
    ...Modules,

  ]
})
export class SharedModule {
}
