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
  pace: PaceCalculatorModel;

  milesKilometersOptions = [
    {label: 'km', value: 1000},
    {label: 'mile', value: 1609}
  ];

  distanceOptions = [
    {label: 'Marathon', value: 42195},
    {label: 'Half Marathon', value: 21095},
    {label: '5KM', value: 5000},
    {label: '8KM', value: 8000},
    {label: '10KM', value: 10000},
    {label: '15KM', value: 15000},
    {label: '20KM', value: 20000},
    {label: '25KM', value: 25000},
    {label: '30KM', value: 30000},
    {label: '10Miles', value: 16090},
    {label: '20Miles', value: 32180},
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
      kmMiles: this.milesKilometersOptions[0].value,
      distance: '',
      distanceSelect: '',
    };

    const pace = this.pace || defaultValues;
    this.modelForm = this.formBuilder.group({
      hour: [pace.hour],
      minute: [pace.minute],
      sec: [pace.sec],
      kmMiles: [pace.kmMiles],
      distance: [pace.distance],
      distanceSelect: [pace.distanceSelect],
    });
  }

  getPace(seconds: number): string {
    const secondsInOneMinute = 60;
    const minutesInHours = 60;
    const minutes = Math.floor(seconds / secondsInOneMinute);
    const hours = Math.floor(minutes / minutesInHours);
    if (hours >= 60 || minutes >= 60) {
      return hours + ':' + (minutes - hours * secondsInOneMinute).toFixed(0);
    } else {
      return minutes + ':' + (seconds - minutes * secondsInOneMinute).toFixed(0);
    }
  }

}
