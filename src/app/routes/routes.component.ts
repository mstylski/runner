import {Component, OnInit} from '@angular/core';
import {RoutesService} from '../routes.service';
import {RoutesModel} from '../shared/models/routes.model';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {
  runningRoutes: RoutesModel[] = [];

  constructor(private routesService: RoutesService) {}

  ngOnInit(): void {
    this.getRoutes();
  }

  getDistance(distance: number) {
    return (distance / 1000).toFixed(1);
  }

  getRoutes() {
    this.routesService.getRoutes().subscribe(route => this.runningRoutes = route);
  }
}
