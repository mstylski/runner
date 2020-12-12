import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {AthleteModel} from './shared/models/athlete.model';
import {AthleteStatsModel} from './shared/models/athlete-stats.model';

@Injectable({providedIn: 'root'})
export class AthleteService {

  constructor(private http: HttpClient) {
  }

  getAthlete(): Observable<AthleteModel> {
    return this.http.get<AthleteModel>(`${environment.apiUrl}athlete`);
  }

  getAthleteStats(athleteId: number): Observable<AthleteStatsModel> {
    return this.http.get<AthleteStatsModel>(`${environment.apiUrl}athletes/${athleteId}/stats`);
  }
}
