import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AthleteService} from './athlete.service';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private athleteService: AthleteService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.athleteService.authToken ||
      window.localStorage.getItem('token') as string;
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
    return next.handle(authRequest).pipe(catchError((err) => {
      return this.athleteService.refreshAccessToken(token).pipe(switchMap(refreshResponse => {
        this.athleteService.setAuthToken(refreshResponse.refresh_token, refreshResponse.refresh_token);
        const authRefreshRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${refreshResponse.refresh_token}`,
          }
        });
        return next.handle(authRefreshRequest);
      }));
    }));
  }
}

