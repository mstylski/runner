import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {RoutesModel} from './shared/models/routes.model';
import {
  DistanceAndLatitude,
  ElevationGradeResponse,
  RouteCoordinatesModel,
  RouteCoordinatesResponse
} from './shared/models/route-coordinates.model';
import {RouteModel} from './shared/models/route.model';
import {ActivityCoordinateResponse} from './shared/models/activity.coordinates.model';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private http: HttpClient) {
  }

  getRoutes(): Observable<RoutesModel[]> {
    const params = {
      scope: 'read_all'
    };
    return this.http.get<RoutesModel[]>(`${environment.apiUrl}athletes/32974624/routes`, {params});
  }

  getRoute(id: string): Observable<RouteModel> {
    const params = {
      scope: 'read_all'
    };
    return this.http.get<RouteModel>(`${environment.apiUrl}routes/${id}`, {params});
  }

  getRoutesCoordinates(id: string): Observable<RouteCoordinatesResponse> {
    const params = {
      scope: 'read_all'
    };
    return this.http.get<RouteCoordinatesResponse>(`${environment.apiUrl}routes/${id}/streams`, {params});
  }

  getElevationGrade(id: string): Observable<ElevationGradeResponse> {
    const params = {
      scope: 'read_all'
    };
    return this.http.get<ElevationGradeResponse>(`${environment.apiUrl}routes/${id}/streams`, {params});
  }

  exportGPX(id: string): Observable<any> {
    const params = {
      scope: 'read_all'
    };
    return this.http.get<any>(`${environment.apiUrl}routes/${id}/export_gpx`, {params});
  }

  exportTCX(id: string): Observable<any> {
    const params = {
      scope: 'read_all'
    };
    return this.http.get<any>(`${environment.apiUrl}routes/${id}/export_tcx`, {params});
  }

}
