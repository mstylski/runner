import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AthleteService {
  authToken = '';
  constructor(private http: HttpClient) {

  }

  requestingAccess(): Observable<any> {
    const params = {
      client_id: '57403',
      redirect_uri: 'http://localhost:4200',
      response_type: 'code',
      approval_prompt: 'force',
      scope: 'read'
    };
    return this.http.get<any>(`https://www.strava.com/oauth/authorize`, {params});
  }


  getToken(code: string): Observable<any> {

    const params = {
      client_id: '57403',
      client_secret: '91e4ea8376741e19631c1ab8c4a1fc3c5a98dee5',
      code: '836c1a229975f6556241f8c99221c4da7261ebc3',
      grant_type: 'authorization_code',
    };
    console.log(code);
    return this.http.post<any>(`https://www.strava.com/api/v3/oauth/token`, null, {params});
  }

  refreshAccessToken(): Observable<any> {
  const params = {
    client_id: '57403',
    client_secret: '91e4ea8376741e19631c1ab8c4a1fc3c5a98dee5',
    grant_type: 'refresh_token',
    refresh_token: '',
  };
  return this.http.post<any>(`https://www.strava.com/api/v3/oauth/token`, null, {params});
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }
}

