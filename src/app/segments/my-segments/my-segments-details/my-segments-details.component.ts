import {Component, OnInit} from '@angular/core';
import {SegmentsService} from '../../../segments.service';
import {SegmentModel} from '../../../shared/models/segment.model';
import {ActivatedRoute} from '@angular/router';
import * as L from 'leaflet';
import {SegmentAltitudeModel} from '../../../shared/models/segment-altitude.model';

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
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getSegmentsCoordinates();
    this.getSegment();
    this.getSegmentsAltitude();
  }

  showMap() {
    this.map = L.map('mapid').setView([54.086978, 18.608519], 12);
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' +
        ' contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      updateWhenZooming: false,
      crossOrigin: true,
      accessToken: `pk.eyJ1IjoibWljaGFsZ2QiLCJhIjoiY2tqMmZsYTFiNTZnMDJycWphbGhveDAyMiJ9.mGU2Q44LI8-UTtIOybToHA`
    }).addTo(this.map);
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
