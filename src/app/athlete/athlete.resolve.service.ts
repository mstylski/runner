import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {AthleteService} from '../athlete.service';
import {AthleteModel} from '../shared/models/athlete.model';

@Injectable({ providedIn: 'root' })
export class AthleteResolveService implements Resolve<AthleteModel> {

  constructor(private athleteService: AthleteService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<AthleteModel> {
    return this.athleteService.getAthlete(route.params.id);
  }
}
