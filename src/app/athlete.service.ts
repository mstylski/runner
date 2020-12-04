import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AthleteService {
  authToken = '';
  refreshToken = '';
  constructor(private http: HttpClient) {

  }

  getToken(code: string): Observable<any> {
    const params = {
      client_id: '57403',
      client_secret: '91e4ea8376741e19631c1ab8c4a1fc3c5a98dee5',
      code,
      grant_type: 'authorization_code',
    };
    return this.http.post<any>(`https://www.strava.com/api/v3/oauth/token`, null, {params});
  }

  refreshAccessToken(token: string): Observable<any> {
  const params = {
    client_id: '57403',
    client_secret: '91e4ea8376741e19631c1ab8c4a1fc3c5a98dee5',
    grant_type: 'refresh_token',
    refresh_token: token,
  };
  return this.http.post<any>(`https://www.strava.com/api/v3/oauth/token`, null, {params});
  }

  setAuthToken(token: string, refreshToken: string) {
    this.authToken = token;
    this.refreshToken = refreshToken;
    window.localStorage.setItem('token', refreshToken);
  }
}

