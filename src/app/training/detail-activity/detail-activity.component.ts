import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActivityModel} from '../../shared/models/activity.model';
import {ActivityService} from '../../activity.service';
import {AthleteService} from '../../athlete.service';
import {AthleteModel} from '../../shared/models/athlete.model';
import {ChartDataSets, ChartType} from 'chart.js';
import {BaseChartDirective, Label} from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as L from 'leaflet';
import {ActivityCoordinatesModel} from '../../shared/models/activity-coordinates.model';
import {ActivityHeartrateModel} from '../../shared/models/activity-heartrate.distance.model';
import {Gallery} from 'angular-gallery';
import {MapService} from '../../shared/map.service';
import {FormatTimeService} from '../../shared/format-time.service';

@Component({
  selector: 'app-detail-activity',
  templateUrl: './detail-activity.component.html',
  styleUrls: ['./detail-activity.component.scss']
})

export class DetailActivityComponent implements OnInit {
  map: L.Map;
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  activity: ActivityModel;
  athlete: AthleteModel;
  coordinates: ActivityCoordinatesModel;
  heartrateDistance: ActivityHeartrateModel[] = [];
  public lineChartLegend = {
    display: false,
  };
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

  constructor(private route: ActivatedRoute,
              private activityService: ActivityService,
              private athleteService: AthleteService,
              private gallery: Gallery,
              private mapService: MapService,
              private formatTimeService: FormatTimeService) {
  }

  ngOnInit(): void {
    this.getAthlete();
    this.getActivity();
    this.showMap();
    this.getActivityCoordinates();
    this.getActivityHeartrateDistance();
  }

  getActivity() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.activityService.getActivity(id).subscribe(
      activity => {
        this.activity = activity;
      });
  }

  showGallery(index: number = 0) {
    const prop: any = {};
    prop.images = [
      {path: `${this.fetchBigPhoto()}`},
    ];
    prop.index = index;
    this.gallery.load(prop);
  }

  fetchBigPhoto() {
    return this.activity.photos.primary?.urls['600'];
  }

  getAthlete() {
    this.athleteService.getAthlete().subscribe(athlete => this.athlete = athlete);
  }

  getAvgTime(distance: number, movingTime: number) {
    const secondsFor1KM = 1000 / (distance / movingTime);
    return `${this.getFormattedTime(secondsFor1KM)}/km`;
  }

  getAvgSplit(distance: number, movingTime: number) {
    const secondsFor1KM = 1000 / (distance / movingTime);
    return `${this.getFormattedTime(secondsFor1KM)}/km`;
  }

  getFormattedTime(data: number) {
    this.formatTimeService.formatTime(data);
  }

  getDistance(distance: number) {
    return (distance / 1000).toFixed(1);
  }

  getSpeed(speed: number) {
    const SPEED_FACTOR = 3.6;
    return `${(speed * SPEED_FACTOR).toFixed(1)} km/h`;
  }

  getHeartrate(heartrate: number) {
    return `${(heartrate).toFixed(0)} bpm`;
  }

  showMap() {
    this.mapService.showMap();
  }

  getActivityCoordinates() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.activityService.getActivityCoordinates(id).subscribe(coordinates => {
      this.coordinates = coordinates[0];
      this.drawActivityOnMap();
    });
  }

  drawActivityOnMap() {
    const config = {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
    };
    L.polyline(this.coordinates.data, config).addTo(this.map);
    this.map.setView(this.coordinates.data[0], 12);
  }

  prepareLineChartLabels() {
    this.lineChartLabels = this.heartrateDistance[0].data.map(v => `${(v / 1000).toFixed(1)} km`);
  }

  prepareDistanceChartData() {
    this.lineChartData.push({
      data: this.heartrateDistance[1].data, label: 'Heartrate',
      borderColor: 'rgb(214,8,8)',
      borderWidth: 1.2,
      showLine: true,
      pointRadius: 0,
    });
  }

  getActivityHeartrateDistance() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.activityService.getActivityHeartrateDistance(id).subscribe(heartrate => {
      this.heartrateDistance = heartrate;
      this.prepareDistanceChartData();
      this.prepareLineChartLabels();
    });
  }
}
