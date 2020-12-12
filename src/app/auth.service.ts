import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {AthleteModel} from './shared/models/athlete.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  athlete: AthleteModel;
  accessToken = '';
  refreshToken = '';

  constructor(private http: HttpClient) {}

  isLoggedIn() {
    return this.accessToken || window.localStorage.getItem('accessToken');
  }

  getAccessToken(code: string): Observable<any> {
    const params = {
      client_id: environment.stravaClientID,
      client_secret: '91e4ea8376741e19631c1ab8c4a1fc3c5a98dee5',
      code,
      grant_type: 'authorization_code',
    };
    return this.http.post<any>(`${environment.apiUrl}oauth/token`, null, {params}); // FIXME otypować response, wywalic any
  }

  getRefreshToken(token: string): Observable<any> {
    const params = {
      client_id: environment.stravaClientID,
      client_secret: '91e4ea8376741e19631c1ab8c4a1fc3c5a98dee5',
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
    return this.athlete || JSON.parse(window.localStorage.getItem('loggedAthlete') as string); // sprowadzic string spowrotem do obiektu JS
  }

  setAthlete(athlete: AthleteModel) {
    this.athlete = athlete;
    window.localStorage.setItem('loggedAthlete', JSON.stringify(this.athlete)); // stringify bo do Localstorage ttrzeba zapisac string mozna tylko, stringify sprowadza obiekt do stringa
  }
}
