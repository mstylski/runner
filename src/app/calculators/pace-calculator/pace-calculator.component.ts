import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PaceCalculatorModel} from '../../shared/models/pace-calculator.model';

@Component({
  selector: 'app-pace-calculator',
  templateUrl: './pace-calculator.component.html',
  styleUrls: ['./pace-calculator.component.scss']
})
export class PaceCalculatorComponent implements OnInit {
  modelForm: FormGroup;
  paceModel: PaceCalculatorModel;
  pace: string;
  hour: number;
  minute: number;
  seconds: number;

  readonly milesKilometersOptions = [
    {label: 'km', value: 1},
    {label: 'mile', value: 1.609}
  ];

  readonly distanceOptions = [
    {label: 'Marathon', value: 42.195},
    {label: 'Half Marathon', value: 21.095},
    {label: '5KM', value: 5},
    {label: '8KM', value: 8},
    {label: '10KM', value: 10},
    {label: '15KM', value: 15},
    {label: '20KM', value: 20},
    {label: '25KM', value: 25},
    {label: '30KM', value: 30},
    {label: '10Miles', value: 16.090},
    {label: '20Miles', value: 32.180},
  ];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    const defaultValues = {
      hour: '',
      minute: '',
      sec: '',
      distanceUnit: this.milesKilometersOptions[0].value,
      distance: '',
      distanceType: '',
    };
    const pace = this.paceModel || defaultValues;
    this.modelForm = this.formBuilder.group({
      hour: [pace.hour],
      minute: [pace.minute],
      sec: [pace.sec],
      distanceUnit: [pace.distanceUnit],
      distance: [pace.distance],
      distanceType: [pace.distanceType],
    });
  }

  getPace() {
    const formValue = this.modelForm.value;
    const secondsFraction = Number(formValue.sec) / 60;
    const paceTimeBase = (Number(formValue.hour) * 60) + Number(formValue.minute) + secondsFraction;
    const speed = paceTimeBase / Number(formValue.distance) || Number(formValue.distanceType);
    const speedMinutesBase = Math.floor(speed);
    const secondsRestFraction = speed % 1 * 60;
    this.pace = `${speedMinutesBase}:${secondsRestFraction.toFixed(0)}`;
  }
}
