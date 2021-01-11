import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {Activities} from './shared/models/list-activities.model';
import {Activity} from './shared/models/activity.model';
import {HttpClient} from '@angular/common/http';
import {ActivityCoordinateResponse} from './shared/models/activity-coordinates.model';
import {ActivityHeartrate} from './shared/models/activity-heartrate.distance.model';

@Injectable({providedIn: 'root'})
export class ActivityService {

  constructor(private http: HttpClient) {}

  getActivitiesWithPagination(page: number): Observable<Activities[]> {
    const params = {
      per_page: '3',
      page: page.toString(),
    };
    return this.http.get<Activities[]>(`${environment.apiUrl}athlete/activities`, {params});
  }

  getActivitiesWithPagination2(page: number): Observable<Activities[]> {
    const params = {
      per_page: '10',
      page: page.toString(),
    };
    return this.http.get<Activities[]>(`${environment.apiUrl}athlete/activities`, {params});
  }

  getActivities(): Observable<Activities[]> {
    const after = Math.round(new Date().getTime() / 1000);
    const params = {
      before: after.toString(),
      after: '1514809418',
      per_page: '50',
    };
    return this.http.get<Activities[]>(`${environment.apiUrl}athlete/activities`, {params});
  }

  getActivity(id: number): Observable<Activity> {
    const params = {
      scope: 'activity:read_all'
    };
    return this.http.get<Activity>(`${environment.apiUrl}activities/${id}`, {params});
  }

  getActivityCoordinates(id: number): Observable<ActivityCoordinateResponse> {
    const params = {
      scope: 'activity:read_all'
    };
    return this.http.get<ActivityCoordinateResponse>(`${environment.apiUrl}activities/${id}/streams/latlng`, {params});
  }

  getActivityHeartrateDistance(id: number): Observable<ActivityHeartrate[]> {
    const params = {
      scope: 'activity:read_all'
    };
    return this.http.get<ActivityHeartrate[]>(`${environment.apiUrl}activities/${id}/streams/heartrate`, {params});
  }
}
