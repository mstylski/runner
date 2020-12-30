import {Component, OnInit} from '@angular/core';
import {SegmentsService} from '../../segments.service';
import {SegmentsExploreModel} from '../../shared/models/segments-explore.model';
import * as L from 'leaflet';

@Component({
  selector: 'app-segment-explore',
  templateUrl: './segment-explore.component.html',
  styleUrls: ['./segment-explore.component.scss']
})
export class SegmentExploreComponent implements OnInit {
  map: L.Map;
  segmentExplore: SegmentsExploreModel[] = [];

  constructor(private segmentsService: SegmentsService) {
  }

  ngOnInit(): void {
    this.segmentsExplore();
    this.showMap();
  }


  segmentsExplore() {
    this.segmentsService.segmentsExplore().subscribe(segments => this.segmentExplore = segments);
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


}
