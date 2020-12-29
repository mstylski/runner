import {Component, OnInit} from '@angular/core';
import {RoutesService} from '../../routes.service';
import {RouteCoordinatesModel} from '../../shared/models/route-coordinates.model';
import {ActivatedRoute} from '@angular/router';
import {RouteModel} from '../../shared/models/route.model';
import * as L from 'leaflet';

@Component({
  selector: 'app-routes-details',
  templateUrl: './routes-details.component.html',
  styleUrls: ['./routes-details.component.scss']
})
export class RoutesDetailsComponent implements OnInit {
  coordinates: RouteCoordinatesModel;
  routeModels: RouteModel;
  map: L.Map;
  readonly columns: string[] = [
    'name', 'distance', 'avg_grade', 'elevation_high', 'elevation_low'];

  constructor(private routesService: RoutesService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getRoutesCoordinates();
    this.getRoute();
    // this.showMap();
    this.exportGPX();
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

  getRoutesCoordinates() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.routesService.getRoutesCoordinates(id).subscribe(coordinates => {
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
    this.map.setView(this.coordinates.data[0], 11);
  }

  getRoute() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.routesService.getRoute(id).subscribe(route => this.routeModels = route);
  }

  exportGPX() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.routesService.exportGPX(id).subscribe();
  }

  exportTCX() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.routesService.exportTCX(id).subscribe();
  }

  getDistance(distance: number) {
    return (distance / 1000).toFixed(1);
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
}
