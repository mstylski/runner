import {Component, OnInit} from '@angular/core';
import {AthleteService} from '../athlete.service';
import {ActivatedRoute} from '@angular/router';
import {AthleteModel} from '../shared/models/athlete.model';


@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.scss']
})
export class AthleteComponent implements OnInit {
  readonly code = this.route.snapshot.queryParamMap.get('code') as string;
  athleteModel: AthleteModel;

  constructor(private athleteService: AthleteService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.code) {
      this.athleteService.getToken(this.code).subscribe(response => {
        this.athleteService.setAuthToken(response.access_token, response.refresh_token);
      });
    }
    this.getAthlete();
  }

  getAthlete() {
    const athleteId = this.athleteModel.athlete;
    this.athleteService.getAthlete().subscribe(athlete => {
      this.athleteModel = athlete;
    });
  }
}
