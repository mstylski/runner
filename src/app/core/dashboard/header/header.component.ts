import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private translate: TranslateService) {
    translate.use('en');
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
