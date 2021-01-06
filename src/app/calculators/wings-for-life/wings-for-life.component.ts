import {Component, OnInit} from '@angular/core';
import {kilometers, minutes, pace} from './wings-for-life-data';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WingsForLifeModel} from '../../shared/models/wings-for-life.model';
import {MatSliderChange} from '@angular/material/slider';


@Component({
  selector: 'app-wings-for-life',
  templateUrl: './wings-for-life.component.html',
  styleUrls: ['./wings-for-life.component.scss']
})
export class WingsForLifeComponent implements OnInit {

  wingsForLifeModel: WingsForLifeModel;
  modelForm: FormGroup;
  minutes = minutes;
  kilometers = kilometers;
  pace = pace;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    const defaultValues = {
      minutes: this.minutes[0].value,
      kilometers: this.kilometers[0].value,
      pace: this.pace[0].value,
    };
    const wings = this.wingsForLifeModel || defaultValues;
    this.modelForm = this.formBuilder.group({
      minutes: [wings.minutes],
      kilometers: [wings.kilometers],
      pace: [wings.pace],
    });
    this.modelForm.get('minutes')?.valueChanges.subscribe(value => {
      this.modelForm.get('kilometers')?.patchValue(value, {emitEvent: false});
      this.modelForm.get('pace')?.patchValue(value, {emitEvent: false});
    });
    this.modelForm.get('kilometers')?.valueChanges.subscribe(value => {
      this.modelForm.get('pace')?.patchValue(value, {emitEvent: false});
      this.modelForm.get('minutes')?.patchValue(value, {emitEvent: false});
    });
    this.modelForm.get('pace')?.valueChanges.subscribe(value => {
      this.modelForm.get('kilometers')?.patchValue(value, {emitEvent: false});
      this.modelForm.get('minutes')?.patchValue(value, {emitEvent: false});
    });
  }

  updateForm(input: MatSliderChange) {
    this.modelForm.patchValue({minutes: input.value, kilometers: input.value, pace: input.value});
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'km';
    }
    return value;
  }
}

