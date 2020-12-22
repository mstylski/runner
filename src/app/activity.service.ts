import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {Activities} from './shared/models/list-activities.model';
import {ActivityModel} from './shared/models/activity-model';
import {HttpClient} from '@angular/common/http';
import {ActivityCoordinateResponse} from './shared/models/activity-coordinates.model';

@Injectable({providedIn: 'root'})
export class ActivityService {

  constructor(private http: HttpClient) {
  }

  getActivitiesWithPagination(page: number): Observable<Activities[]> {
    const params = {
      per_page: '20',
      page: page.toString(),
    };

    return this.http.get<Activities[]>(`${environment.apiUrl}athlete/activities`, {params});
  }

  getActivities(before: () => string, after: number): Observable<Activities[]> {
    const params = {
      after: after.toString(),
      before: before.toString(),
    };
    return this.http.get<Activities[]>(`${environment.apiUrl}athlete/activities`, {params});
  }

  getActivity(id: number): Observable<ActivityModel> {
    const params = {
      scope: 'activity:read_all'
    };
    return this.http.get<ActivityModel>(`${environment.apiUrl}activities/${id}`, {params});
  }

  getActivityCoordinates(id: number): Observable<ActivityCoordinateResponse> {
    const params = {
      scope: 'activity:read_all'
    };
    return this.http.get<ActivityCoordinateResponse>(`${environment.apiUrl}activities/${id}/streams/latlng`, {params});
  }
}

