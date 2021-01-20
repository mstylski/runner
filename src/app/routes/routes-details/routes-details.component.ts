import {Component, OnInit, ViewChild} from '@angular/core';
import {RoutesService} from '../../routes.service';
import {ElevationGrade, RouteCoordinates} from '../../shared/models/route-coordinates.model';
import {ActivatedRoute} from '@angular/router';
import {RouteData, Segment} from '../../shared/models/route.model';
import * as L from 'leaflet';
import {ChartDataSets, ChartType} from 'chart.js';
import {BaseChartDirective, Label} from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-routes-details',
  templateUrl: './routes-details.component.html',
  styleUrls: ['./routes-details.component.scss']
})
export class RoutesDetailsComponent implements OnInit {
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  lineChartType: ChartType = 'line';
  lineChartPlugins = [pluginAnnotations];
  coordinates: RouteCoordinates;
  elevationGrade: ElevationGrade[] = [];
  routeData: RouteData;
  segments: Segment;
  map: L.Map;

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;
  constructor(private routesService: RoutesService,
              private route: ActivatedRoute,
              private translate: TranslateService) {}

  ngOnInit(): void {
    this.showMap();
    this.getRoute();
    this.getRoutesCoordinates();
    this.getElevationGrade();
  }

  getFormattedTime(seconds: number) {
    const secondsInOneMinute = 60;
    const minutesInHours = 60;
    const minutes = Math.floor(seconds / secondsInOneMinute);
    const hours = Math.floor(minutes / minutesInHours);
    if (hours >= 60 || minutes >= 60) {
      return hours + ':' + (minutes - hours * secondsInOneMinute).toFixed(0);
    } else {
      return minutes + ':' + (seconds - minutes * secondsInOneMinute).toFixed(0);
    }
  }

  getDistance(distance: number) {
    return (distance / 1000).toFixed(1);
  }

  private getRoutesCoordinates() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.routesService.getRoutesCoordinates(id).subscribe(coordinates => {
      this.coordinates = coordinates[0];
      this.drawActivityOnMap();
    });
  }

  private showMap() {
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

  private drawActivityOnMap() {
    const config = {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
    };
    L.polyline(this.coordinates.data, config).addTo(this.map);
    this.map.setView(this.coordinates.data[0], 11);
  }

  private getRoute() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.routesService.getRoute(id).subscribe(route => this.routeData = route);
  }

  private prepareLineChartLabels() {
    this.lineChartLabels = this.elevationGrade[1].data.map(v => `${(v / 1000).toFixed(1)} km`);
  }

  private prepareDistanceChartData() {
    this.lineChartData = [
      {
        data: this.elevationGrade[2].data, label: `${this.translate.instant('ELEVATION-GRADE')}`,
        borderColor: 'rgb(214,8,8)',
        borderWidth: 1.2,
        showLine: true,
        pointRadius: 0,
      }
    ];
  }

  private getElevationGrade() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.routesService.getElevationGrade(id).subscribe(elevationGrade => {
      this.elevationGrade = elevationGrade;
      this.prepareDistanceChartData();
      this.prepareLineChartLabels();
    });
  }
}
