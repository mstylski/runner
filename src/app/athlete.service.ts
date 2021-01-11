import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {Athlete} from './shared/models/athlete.model';
import {AthleteStats} from './shared/models/athlete-stats.model';

@Injectable({providedIn: 'root'})
export class AthleteService {

  constructor(private http: HttpClient) {}

  getAthlete(): Observable<Athlete> {
    return this.http.get<Athlete>(`${environment.apiUrl}athlete`);
  }

  getAthleteStats(athleteId: number): Observable<AthleteStats> {
    return this.http.get<AthleteStats>(`${environment.apiUrl}athletes/${athleteId}/stats`);
  }
}
