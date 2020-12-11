import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {WorkoutData} from './shared/models/list-activities.model';
import {ActivityModel} from './shared/models/activity-model';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ActivityService {

  constructor(private http: HttpClient) {
  }

  getActivities(page: string): Observable<WorkoutData[]> {
    const params = {
      per_page: '20',
      page,
    };
    return this.http.get<WorkoutData[]>(`${environment.apiUrl}athlete/activities`, {params});
  }

  getActivity(id: number): Observable<ActivityModel> {
    const params = {
      scope: 'activity:read_all'
    };
    return this.http.get<ActivityModel>(`${environment.apiUrl}activities/${id}`, {params});
  }
}

