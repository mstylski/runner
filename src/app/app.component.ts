import {Component} from '@angular/core';
import {AuthService} from './auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = this.authService.isLoggedIn();

  constructor(private authService: AuthService) {
  }

}
