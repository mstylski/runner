import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {AthleteModel} from './shared/models/athlete.model';
import {isAfter} from 'date-fns';

@Injectable({providedIn: 'root'})
export class AuthService {
  expiredAt: number;
  athlete: AthleteModel;
  accessToken = '';
  refreshToken = '';

  constructor(private http: HttpClient) {
  }

  isLoggedIn() {
    return this.accessToken || window.localStorage.getItem('accessToken');
  }

  isTokenExpired() {
    return isAfter(new Date(), new Date(this.getExpiredAt() * 1000));
  }

  getExpiredAt() {
    return this.expiredAt || Number(window.localStorage.getItem('expiredAt'));
  }

  getAccessToken(code: string): Observable<any> {
    const params = {
      client_id: environment.stravaClientID,
      client_secret: '76b36b39f12ea4f411ad874067bf4955864b1dcc',
      code,
      grant_type: 'authorization_code',
    };
    return this.http.post<any>(`${environment.apiUrl}oauth/token`, null, {params}); // FIXME otypować response, wywalic any
  }

  getRefreshToken(token: string): Observable<any> {
    const params = {
      client_id: environment.stravaClientID,
      client_secret: '76b36b39f12ea4f411ad874067bf4955864b1dcc',
      grant_type: 'refresh_token',
      refresh_token: token,
    };
    return this.http.post<any>(`${environment.apiUrl}oauth/token`, null, {params}); // FIXME otypować response, wywalic any
  }

  setAuthToken(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    window.localStorage.setItem('accessToken', this.accessToken);
    window.localStorage.setItem('refreshToken', this.refreshToken);
  }

  getLoggedAthlete() {
    return this.athlete || JSON.parse(window.localStorage.getItem('loggedAthlete') as string);
  }

  setAthlete(athlete: AthleteModel) {
    this.athlete = athlete;
    window.localStorage.setItem('loggedAthlete', JSON.stringify(this.athlete));
  }

  setExpiredAt(expiredAt: number) {
    this.expiredAt = expiredAt;
    window.localStorage.setItem('expiredAt', expiredAt.toString());
  }
}
