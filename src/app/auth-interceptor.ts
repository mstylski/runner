import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AthleteService} from './athlete.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private athleteService: AthleteService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.athleteService.authToken;
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
    return next.handle(authRequest);
  }
}
