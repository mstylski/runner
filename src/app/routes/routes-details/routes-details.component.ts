import {Component, OnInit, ViewChild} from '@angular/core';
import {RoutesService} from '../../routes.service';
import {ElevationGradeModel, RouteCoordinatesModel} from '../../shared/models/route-coordinates.model';
import {ActivatedRoute} from '@angular/router';
import {RouteModel, Segment} from '../../shared/models/route.model';
import * as L from 'leaflet';
import {ChartDataSets, ChartType} from 'chart.js';
import {BaseChartDirective, Label} from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {MapService} from '../../shared/map.service';
import {FormatTimeService} from '../../shared/format-time.service';

@Component({
  selector: 'app-routes-details',
  templateUrl: './routes-details.component.html',
  styleUrls: ['./routes-details.component.scss']
})
export class RoutesDetailsComponent implements OnInit {
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  public lineChartLegend = {
    display: false,
  };
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;
  coordinates: RouteCoordinatesModel;
  elevationGrade: ElevationGradeModel[] = [];
  routeModel: RouteModel;
  segments: Segment;
  map: L.Map;

  constructor(private routesService: RoutesService,
              private route: ActivatedRoute,
              private mapService: MapService,
              private formatTimeService: FormatTimeService) {
  }

  ngOnInit(): void {
    this.getRoute();
    this.getRoutesCoordinates();
    this.getElevationGrade();
    this.showMap();
  }

  getRoutesCoordinates() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.routesService.getRoutesCoordinates(id).subscribe(coordinates => {
      this.coordinates = coordinates[0];
      this.drawActivityOnMap();
    });
  }

  showMap() {
    this.mapService.showMap();
  }

  drawActivityOnMap() {
    const config = {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
    };
    L.polyline(this.coordinates.data, config).addTo(this.map);
    this.map.setView(this.coordinates.data[0], 11);
  }

  getRoute() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.routesService.getRoute(id).subscribe(route => this.routeModel = route);
  }

  getFormattedTime() {
    this.formatTimeService.formatTime(this.routeModel.estimated_moving_time);
  }

  getDistance(distance: number) {
    return (distance / 1000).toFixed(1);
  }

  prepareLineChartLabels() {
    this.lineChartLabels = this.elevationGrade[1].data.map(v => `${(v / 1000).toFixed(1)} km`);
  }

  prepareDistanceChartData() {
    this.lineChartData.push({
      data: this.elevationGrade[2].data, label: 'Elevation Grade',
      borderColor: 'rgb(214,8,8)',
      borderWidth: 1.2,
      showLine: true,
      pointRadius: 0,
    });
  }

  getElevationGrade() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.routesService.getElevationGrade(id).subscribe(elevationGrade => {
      this.elevationGrade = elevationGrade;
      this.prepareDistanceChartData();
      this.prepareLineChartLabels();
    });
  }
}
