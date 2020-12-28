import {Component, OnDestroy, OnInit} from '@angular/core';
import {SegmentsService} from '../../segments.service';
import {debounceTime, switchMap} from 'rxjs/operators';
import {BehaviorSubject, Subscription} from 'rxjs';
import {SegmentsModel} from '../../shared/models/segments.model';

@Component({
  selector: 'app-segment-search',
  templateUrl: './my-segments.component.html',
  styleUrls: ['./my-segments.component.scss']
})
export class MySegmentsComponent implements OnInit, OnDestroy {
  currentPageIndex = 1;
  private readonly subscriptions = new Subscription();
  private readonly pagination$ = new BehaviorSubject<number>(this.currentPageIndex);
  readonly columns: string[] = ['name', 'city', 'country', 'distance', 'elevation_high',
    'elevation_low', 'elevation_difference', 'state' ];
  segments: SegmentsModel[] = [];

  constructor(private segmentsService: SegmentsService) {
  }

  ngOnInit(): void {
    this.segmentsStarred();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private segmentsStarred() {
    const subscription = this.pagination$.pipe(
      debounceTime(400),
      switchMap((pageIndex) => this.segmentsService.segmentsStarred(pageIndex)),
    )
      .subscribe(segments => this.segments = segments);
    this.subscriptions.add(subscription);
  }

  pageNext() {
    this.currentPageIndex = this.currentPageIndex + 1;
    this.pagination$.next(this.currentPageIndex);
  }

  pageBefore() {
    this.currentPageIndex = this.currentPageIndex - 1;
    this.pagination$.next(this.currentPageIndex);
  }
}
