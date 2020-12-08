import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AthleteService} from '../../athlete.service';
import {WorkoutData} from '../../shared/models/activity.model';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})
export class MyActivitiesComponent implements OnInit {
  readonly displayedColumns: string[] = ['name'];
  workoutData: WorkoutData;
  modelForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private athleteService: AthleteService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.fetchTypeOfSports();
  }

  private buildForm(): void {
    this.modelForm = this.formBuilder.group({
      kindOfSport: this.workoutData
    });
  }

  private fetchTypeOfSports() {
    return this.athleteService.getActivities().subscribe(activities => {
      this.workoutData = activities;
    });
  }
}
