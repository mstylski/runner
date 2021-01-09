import {Component} from '@angular/core';
import {AuthService} from '../../auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isLoggedIn = this.authService.isLoggedIn();
  readonly code = this.route.snapshot.queryParamMap.get('code') as string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
    if (this.code && !this.isLoggedIn) {
      this.authService.getAccessToken(this.code).subscribe(response => {

        this.authService.setAuthToken(response.access_token, response.refresh_token);
        this.authService.setAthlete(response.athlete);
        this.authService.setExpiredAt(response.expires_at);
        this.isLoggedIn = this.authService.isLoggedIn();
        if (this.authService.isTokenExpired()) {
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
