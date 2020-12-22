import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoutesService} from '../../routes.service';
import {RoutesModel} from '../../shared/models/routes.model';

@Component({
  selector: 'app-routes-details',
  templateUrl: './routes-details.component.html',
  styleUrls: ['./routes-details.component.scss']
})
export class RoutesDetailsComponent implements OnInit {
routes: RoutesModel;
  constructor(private route: ActivatedRoute,
              private routesService: RoutesService) { }

  ngOnInit(): void {
    this.getRoutes();
  }


  getRoutes() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.routesService.getRoute(id).subscribe(
      route => {
        this.routes = route;
      });
  }
}
