import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PaceCalculatorModel} from '../../shared/models/pace-calculator.model';
import {distanceOptions, milesKilometersOptions} from './pace-data';

@Component({
  selector: 'app-pace-calculator',
  templateUrl: './pace-calculator.component.html',
  styleUrls: ['./pace-calculator.component.scss']
})
export class PaceCalculatorComponent implements OnInit {
  modelForm: FormGroup;
  paceModel: PaceCalculatorModel;
  milesKilometersOptions = milesKilometersOptions;
  distanceOptions = distanceOptions;
  pace: string;
  hour: number;
  minute: number;
  seconds: number;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    this.updateDistance();
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
    const speed = paceTimeBase / Number(formValue.distance);
    const speedMinutesBase = Math.floor(speed);
    const secondsRestFraction = speed % 1 * 60;
    this.pace = `${speedMinutesBase}:${secondsRestFraction.toFixed(0)}`;
  }

  updateDistance() {
    this.modelForm.get('distanceType')?.valueChanges.subscribe(value => this.modelForm.get('distance')?.patchValue(value));
  }
}
