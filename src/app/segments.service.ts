import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SegmentsModel} from './shared/models/segments.model';
import {SegmentModel} from './shared/models/segment.model';
import {Altitude, SegmentAltitudeModel} from './shared/models/segment-altitude.model';
import {SegmentCoordinatesResponse} from './shared/models/segment-coordinates-model';


@Injectable({providedIn: 'root'})
export class SegmentsService {

  constructor(private http: HttpClient) {}

  segmentsStarred(page: number): Observable<SegmentsModel[]> {
    const params = {
      scope: 'read_all',
      per_page: '10',
      page: page.toString()
    };
    return this.http.get<SegmentsModel[]>(`${environment.apiUrl}segments/starred`, {params});
  }

  getSegment(id: number): Observable<SegmentModel> {
    const params = {
      scope: 'read_all'
    };
    return this.http.get<SegmentModel>(`${environment.apiUrl}segments/${id}`, {params});
  }

  getSegmentsAltitude(id: number): Observable<SegmentAltitudeModel> {
    const params = {
      scope: 'read_all',
      keys: 'altitude',
      key_by_type: true.toString(),
    };
    return this.http.get<SegmentAltitudeModel>(`${environment.apiUrl}segments/${id}/streams`, {params});
  }

  getSegmentsCoordinates(id: string): Observable<SegmentCoordinatesResponse> {
    const params = {
      scope: 'read_all',
      keys: 'latlng',
      key_by_type: true.toString(),
    };
    return this.http.get<SegmentCoordinatesResponse>(`${environment.apiUrl}segments/${id}/streams`, {params});
  }
}

