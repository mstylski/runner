import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.authService.authToken ||
      window.localStorage.getItem('token') as string;
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });
    return next.handle(authRequest);
  }
}

