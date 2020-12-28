import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {isSameDay, isSameMonth, parseISO} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {Activities} from '../../shared/models/list-activities.model';
import {ActivityService} from '../../activity.service';
import {colors} from './utils/colors';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-training-calendar',
  templateUrl: './training-calendar.component.html',
  styleUrls: ['./training-calendar.component.scss'],

})

export class TrainingCalendarComponent implements OnInit {
  activities: Activities[] = [];
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen = false;

  constructor(private modal: NgbModal,
              private activityService: ActivityService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen) ||
        events.length === 0);
      this.viewDate = date;
    }
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent) {
    this.router.navigate([`dashboard/my-activities/${event.id}`]);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  private getActivities() {
    this.activityService.getActivities().subscribe(activities => {
      this.activities = activities;
      this.prepareCalendarEvents();
    });
  }

  prepareCalendarEvents() {
    this.events = this.activities.map((activity) => {
      return {
        title: activity.name,
        id: activity.id,
        // @ts-ignore
        start: parseISO(activity.start_date_local),
        color: colors.blue,
      };
    });
  }

  ngOnInit() {
    this.getActivities();
  }
}







