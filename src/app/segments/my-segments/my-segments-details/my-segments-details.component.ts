import {Component, OnInit, ViewChild} from '@angular/core';
import {SegmentsService} from '../../../segments.service';
import {SegmentModel} from '../../../shared/models/segment.model';
import {ActivatedRoute} from '@angular/router';
import * as L from 'leaflet';
import {Altitude, Distance, SegmentAltitudeModel} from '../../../shared/models/segment-altitude.model';
import {MapService} from '../../../shared/map.service';
import {ChartDataSets, ChartType} from 'chart.js';
import {BaseChartDirective, Label} from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-my-segments-details',
  templateUrl: './my-segments-details.component.html',
  styleUrls: ['./my-segments-details.component.scss']
})
export class MySegmentsDetailsComponent implements OnInit {
  map: L.Map;
  segment: SegmentModel;
  coordinates: any;
  altitudeData: SegmentAltitudeModel[] = [];
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;


  constructor(private segmentsService: SegmentsService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.showMap();
    this.getSegmentsAltitude();
    this.getAltitude();
    this.getSegmentsCoordinates();
    this.getSegment();
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
    });
  }

  drawActivityOnMap() {
    const config = {
      color: 'red',
      fillColor: '#ff0033',
      fillOpacity: 0.5,
    };
    L.polyline(this.coordinates.latlng.data, config).addTo(this.map);
    console.log(this.coordinates);
    this.map.setView(this.coordinates.latlng.data[0], 12);
  }

  getSegment() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.segmentsService.getSegment(id).subscribe(segments => this.segment = segments);
  }

  getSegmentsAltitude() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.segmentsService.getSegmentsAltitude(id).subscribe(segments => this.altitudeData = segments);
  }

  prepareLineChartLabels() {
    this.lineChartLabels = this.altitudeData[0].distance.data.map(v => `${(v / 1000).toFixed(1)} km`);
  }

  prepareDistanceChartData() {
    this.lineChartData = [
      {
        data: this.altitudeData[1].altitude.data, label: 'Elevation Grade',
        borderColor: 'rgb(214,8,8)',
        borderWidth: 1.2,
        showLine: true,
        pointRadius: 0,
      }
    ];
  }

  getAltitude() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.segmentsService.getSegmentsAltitude(id).subscribe(data => {
      this.altitudeData = data;
      this.prepareDistanceChartData();
      this.prepareLineChartLabels();
    });
  }
}
