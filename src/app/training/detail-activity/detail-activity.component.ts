import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActivityModel} from '../../shared/models/activity-model';
import {ActivityService} from '../../activity.service';
import {AthleteService} from '../../athlete.service';
import {AthleteModel} from '../../shared/models/athlete.model';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {BaseChartDirective, Color} from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-detail-activity',
  templateUrl: './detail-activity.component.html',
  styleUrls: ['./detail-activity.component.scss']
})
export class DetailActivityComponent implements OnInit {
  lineChartData: ChartDataSets[] = [];
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
            color: 'rgba(255,0,0,0.3)',
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
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
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

  constructor(private route: ActivatedRoute,
              private activityService: ActivityService,
              private athleteService: AthleteService) {
  }

  ngOnInit(): void {
    this.getAthlete();
    this.getActivity();
  }

  getActivity() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.activityService.getActivity(id).subscribe(
      activity => {
        this.activity = activity;
        this.prepareEleveationChartData();
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

  prepareEleveationChartData() {
    const elevations = this.activity.splits_metric.map((metric) => metric.elevation_difference * 30);
    return this.lineChartData.push({data: elevations, label: 'Elevation'});
  }
}
