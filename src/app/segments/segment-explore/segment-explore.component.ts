import {Component, OnInit} from '@angular/core';
import {SegmentsService} from '../../segments.service';

@Component({
  selector: 'app-segment-explore',
  templateUrl: './segment-explore.component.html',
  styleUrls: ['./segment-explore.component.scss']
})
export class SegmentExploreComponent implements OnInit {

  constructor(private segmentsService: SegmentsService) {
  }

  ngOnInit(): void {
    this.segmentsExplore();
  }


  segmentsExplore() {
    this.segmentsService.segmentsExplore().subscribe();
  }

}
