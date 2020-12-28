import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {RoutesModel} from './shared/models/routes.model';
import {RoutesCoordinatesModel} from './shared/models/routes.coordinates.model';

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

  getRoutesCoordinates(id: string): Observable<RoutesCoordinatesModel> {
    const params = {
      scope: 'read_all'
    };
    return this.http.get<RoutesCoordinatesModel>(`${environment.apiUrl}routes/${id}/streams`, {params});
  }
}
