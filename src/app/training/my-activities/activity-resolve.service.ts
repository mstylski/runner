import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ActivityService} from '../../activity.service';
import {ActivityModel} from '../../shared/models/activity-model';

@Injectable({providedIn: 'root'})
export class ActivityResolveService implements Resolve<ActivityModel> {

  constructor(private activityService: ActivityService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<ActivityModel> {
    return this.activityService.getActivity(route.params.id);
  }
}
