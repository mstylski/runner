import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ActivityService} from '../../activity.service';
import {Activity} from '../../shared/models/activity.model';

@Injectable({providedIn: 'root'})
export class ActivityResolveService implements Resolve<Activity> {

  constructor(private activityService: ActivityService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Activity> {
    return this.activityService.getActivity(route.params.id);
  }
}
