import {Component, OnInit} from '@angular/core';
import {SegmentsService} from '../../../segments.service';
import {SegmentModel} from '../../../shared/models/segment.model';
import {ActivatedRoute} from '@angular/router';
import * as L from 'leaflet';
import {SegmentAltitudeModel} from '../../../shared/models/segment-altitude.model';
import {MapService} from '../../../shared/map.service';

@Component({
  selector: 'app-my-segments-details',
  templateUrl: './my-segments-details.component.html',
  styleUrls: ['./my-segments-details.component.scss']
})
export class MySegmentsDetailsComponent implements OnInit {
  map: L.Map;
  segment: SegmentModel;
  coordinates: any;
  altitude: SegmentAltitudeModel;

  constructor(private segmentsService: SegmentsService,
              private route: ActivatedRoute,
              private mapService: MapService) {
  }

  ngOnInit(): void {
    this.getSegmentsCoordinates();
    this.getSegment();
    this.getSegmentsAltitude();
  }

  showMap() {
    this.mapService.showMap();
  }

  getSegmentsCoordinates() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.segmentsService.getSegmentsCoordinates(id).subscribe(data => {
      this.coordinates = data;
      this.drawActivityOnMap();
      this.showMap();
    });
  }

  drawActivityOnMap() {
    const config = {
      color: 'red',
      fillColor: '#ff0033',
      fillOpacity: 0.5,
    };
    L.polyline(this.coordinates, config).addTo(this.map);
    this.map.setView(this.coordinates.latlng.data[0], 12);
  }

  getSegment() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.segmentsService.getSegment(id).subscribe(segments => this.segment = segments);
  }

  getSegmentsAltitude() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.segmentsService.getSegmentsAltitude(id).subscribe(segments => this.altitude = segments);
  }
}
