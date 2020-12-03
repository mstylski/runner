import {Component, OnInit} from '@angular/core';
import {AthleteService} from '../athlete.service';
import {AthleteModel} from '../athlete.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.scss']
})
export class AthleteComponent implements OnInit{
athlete: AthleteModel[] = [];
  readonly code = this.route.snapshot.queryParamMap.get('code') as string;
  constructor(private athleteService: AthleteService,
              private route: ActivatedRoute) {}

ngOnInit(): void {
  this.athleteService.getToken(this.code).subscribe(response => {
    this.athleteService.setAuthToken(response.access_token);
  });
}

  getAthlete(): void {
    this.athleteService.requestingAccess().subscribe();
  }
}
