import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActivityModel} from '../shared/models/activity-model';
import {AuthService} from '../auth.service';
import {AthleteService} from '../athlete.service';
import {AthleteModel} from '../shared/models/athlete.model';
import {AthleteStatsModel} from '../shared/models/athlete-stats.model';

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.scss']
})
export class AthleteComponent implements OnInit {
  activity: ActivityModel;
  athlete: AthleteModel;
  stats: AthleteStatsModel;

  constructor(
    private athleteService: AthleteService,
    private authService: AuthService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAthlete();
    this.getStats();
  }

  getAthlete() {
    this.athleteService.getAthlete().subscribe(athlete => this.athlete = athlete);
  }

  getStats() {
    this.athleteService.getAthleteStats(this.authService.getLoggedAthlete().id).subscribe(stats => this.stats = stats);
  }
}
