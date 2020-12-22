import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {RoutesModel} from '../shared/models/routes.model';
import {RoutesService} from '../routes.service';

@Injectable({providedIn: 'root'})
export class RoutesResolverService implements Resolve<RoutesModel> {

  constructor(private routesService: RoutesService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<RoutesModel> {
    return this.routesService.getRoute(route.params.id);
  }
}
