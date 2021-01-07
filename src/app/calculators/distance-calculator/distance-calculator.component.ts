import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DistanceCalculatorModel} from '../../shared/models/distance-calculator.model';

@Component({
  selector: 'app-distance-calculator',
  templateUrl: './distance-calculator.component.html',
  styleUrls: ['./distance-calculator.component.scss']
})
export class DistanceCalculatorComponent implements OnInit {
  distanceKM: string;
  distanceMiles: string;
  modelForm: FormGroup;
  distanceModel: DistanceCalculatorModel;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
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
    const distance = this.distanceModel || defaultValues;
    this.modelForm = this.formBuilder.group({
      hour: [distance.hour],
      minute: [distance.minute],
      sec: [distance.sec],
      distance: [distance.distance],
      paceMinutes: [distance.paceMinutes],
      paceSeconds: [distance.paceSeconds],
    });
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
    this.distanceKM = `${distanceBaseKM} KM : ${metersRestFractionKM.toFixed(0)} METERS`;
    this.distanceMiles = `${distanceBaseMiles} MILES : ${metersRestFractionMiles.toFixed(0)} METERS`;
  }
}
