import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SegmentsModel} from './shared/models/segments.model';
import {SegmentModel} from './shared/models/segment.model';

@Injectable({
  providedIn: 'root'
})
export class SegmentsService {

  constructor(private http: HttpClient) {
  }

  segmentsExplore(): Observable<any> {
    const params = {
      bounds: JSON.stringify([54.50, 49.0, 14.07, 24.09])
    };
    return this.http.get<any>(`${environment.apiUrl}segments/explore`, {params});
  }

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
}

