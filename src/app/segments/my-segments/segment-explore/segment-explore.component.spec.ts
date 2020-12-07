import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentExploreComponent } from './segment-explore.component';

describe('SegmentExploreComponent', () => {
  let component: SegmentExploreComponent;
  let fixture: ComponentFixture<SegmentExploreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentExploreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
