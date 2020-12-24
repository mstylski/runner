import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActivityModel} from '../../shared/models/activity.model';
import {ActivityService} from '../../activity.service';
import {AthleteService} from '../../athlete.service';
import {AthleteModel} from '../../shared/models/athlete.model';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as L from 'leaflet';
import {ActivityCoordinatesModel} from '../../shared/models/activity.coordinates.model';
import {ActivityHeartrateModel} from '../../shared/models/activity.heartrate.distance.model';


@Component({
  selector: 'app-detail-activity',
  templateUrl: './detail-activity.component.html',
  styleUrls: ['./detail-activity.component.scss']
})
export class DetailActivityComponent implements OnInit {
  map: L.Map;

  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];

  // @ts-ignore
  lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgb(200,165,165)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

  activity: ActivityModel;
  athlete: AthleteModel;
  coordinates: ActivityCoordinatesModel;
  heartrateDistance: ActivityHeartrateModel[];

  constructor(private route: ActivatedRoute,
              private activityService: ActivityService,
              private athleteService: AthleteService) {
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
        this.prepareDistanceChartData();
        this.prepareLineChartLabels();
      });
  }

  getAthlete() {
    this.athleteService.getAthlete().subscribe(athlete => this.athlete = athlete);
  }

  formatTime(seconds: number): string {
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

  getAvgTime(distance: number, movingTime: number) {
    const secondsFor1KM = 1000 / (distance / movingTime);
    return `${this.formatTime(secondsFor1KM)}/km`;
  }

  getAvgSplit(distance: number, movingTime: number) {
    const secondsFor1KM = 1000 / (distance / movingTime);
    return `${this.formatTime(secondsFor1KM)}/km`;
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
    const distance = this.heartrateDistance.map((data) => data.data[0]);
    return this.lineChartLabels.push(`Label ${distance}`);
  }

  prepareDistanceChartData() {
    const heartrate = this.heartrateDistance.map((data) => data.data[1]);
    return this.lineChartData.push(
      {data: heartrate, label: 'Heartrate'});
  }

  getActivityHeartrateDistance() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.activityService.getActivityHeartrateDistance(id).subscribe(heartrate => {
      this.heartrateDistance = heartrate;
    });
  }
}
