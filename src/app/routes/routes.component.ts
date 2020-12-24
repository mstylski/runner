import {Component, OnInit} from '@angular/core';
import {RoutesService} from '../routes.service';
import {RoutesModel} from '../shared/models/routes.model';
import {ActivatedRoute} from '@angular/router';
import {RoutesCoordinatesModel} from '../shared/models/routes.coordinates.model';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {
  runningRoutes: RoutesModel[] = [];
  coordinates: RoutesCoordinatesModel;

  constructor(private routesService: RoutesService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getRoutes();
    this.getRoutesCoordinates();
  }

  getDistance(distance: number) {
    return (distance / 1000).toFixed(1);
  }

  getRoutes() {
    this.routesService.getRoutes().subscribe(route => this.runningRoutes = route);
  }

  getRoutesCoordinates() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.routesService.getRoutesCoordinates(id).subscribe(coordinates => this.coordinates = coordinates);
  }
  }
