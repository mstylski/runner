import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DistanceCalculator} from '../../shared/models/distance-calculator.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-distance-calculator',
  templateUrl: './distance-calculator.component.html',
  styleUrls: ['./distance-calculator.component.scss']
})
export class DistanceCalculatorComponent implements OnInit {
  distanceKM: string;
  distanceMiles: string;
  modelForm: FormGroup;
  distance: DistanceCalculator;

  constructor(private formBuilder: FormBuilder,
              private translate: TranslateService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  getDistance() {
    const formValue = this.modelForm.value;
    const changePaceIntoSeconds = Number(formValue.paceMinutes * 60) + Number(formValue.paceSeconds);
    const changeTimeIntoSeconds = Number(formValue.hour * 3600) + Number(formValue.minute * 60) + Number(formValue.sec);
    const distanceWithRestKM = Number((changeTimeIntoSeconds) / Number(changePaceIntoSeconds));
    const distanceWithRestMiles = Number((changeTimeIntoSeconds) / Number(changePaceIntoSeconds) / 1.609);
    const distanceBaseMiles = Math.floor(distanceWithRestMiles);
    const metersRestFractionMiles = distanceWithRestMiles % 1 * 1000;
    const distanceBaseKM = Math.floor(distanceWithRestKM);
    const metersRestFractionKM = distanceWithRestKM % 1 * 1000;
    this.distanceKM = `${distanceBaseKM} KM : ${metersRestFractionKM.toFixed(0)} ${this.translate.instant('METERS')}`;
    this.distanceMiles = `${distanceBaseMiles} ${this.translate.instant('MILES')} : ${metersRestFractionMiles.toFixed(0)} ${this.translate.instant('METERS')}`;
  }

  private buildForm(): void {
    const defaultValues = {
      hour: '',
      minute: '',
      sec: '',
      distance: '',
      paceMinutes: '',
      paceSeconds: ''
    };
    const distance = this.distance || defaultValues;
    this.modelForm = this.formBuilder.group({
      hour: [distance.hour],
      minute: [distance.minute],
      sec: [distance.sec],
      distance: [distance.distance],
      paceMinutes: [distance.paceMinutes],
      paceSeconds: [distance.paceSeconds],
    });
  }
}
