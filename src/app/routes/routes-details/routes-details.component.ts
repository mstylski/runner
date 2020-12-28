import {Component, OnInit} from '@angular/core';
import {RoutesService} from '../../routes.service';
import {RoutesCoordinatesModel} from '../../shared/models/routes.coordinates.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-routes-details',
  templateUrl: './routes-details.component.html',
  styleUrls: ['./routes-details.component.scss']
})
export class RoutesDetailsComponent implements OnInit {
  coordinates: RoutesCoordinatesModel;

  constructor(private routesService: RoutesService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getRoutesCoordinates();
  }


  getRoutesCoordinates() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.routesService.getRoutesCoordinates(id).subscribe(coordinates => this.coordinates = coordinates);
  }
}
