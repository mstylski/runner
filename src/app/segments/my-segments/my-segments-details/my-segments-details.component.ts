import {Component, OnInit} from '@angular/core';
import {SegmentsService} from '../../../segments.service';
import {SegmentModel} from '../../../shared/models/segment.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-my-segments-details',
  templateUrl: './my-segments-details.component.html',
  styleUrls: ['./my-segments-details.component.scss']
})
export class MySegmentsDetailsComponent implements OnInit {
  segments: SegmentModel;

  constructor(private segmentsService: SegmentsService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getSegment();
  }

  getSegment() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.segmentsService.getSegment(id).subscribe(segments => this.segments = segments);
  }
}
