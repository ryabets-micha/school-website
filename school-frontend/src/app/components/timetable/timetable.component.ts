import { Component, OnInit } from '@angular/core';

export class TimetableHour {
  public start;
  public end;
  public pause;

  constructor(start = null, end = null, pause = null) {
    this.start = start;
    this.end = end;
    this.pause = pause;
  }
}

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.sass']
})
export class TimetableComponent implements OnInit {

  public hours = [
    new TimetableHour('8:00', '8:45', '0:10'),
    new TimetableHour('8:55', '9:40', '0:20'),
    new TimetableHour('10:00', '10:45', '0:10'),
    new TimetableHour('10:55', '11:40', '0:10'),
    new TimetableHour('11:50', '12:35', '0:20'),
    new TimetableHour('12:55', '13:40', '0:10'),
    new TimetableHour('13:50', '14:35', '0:10'),
    new TimetableHour('14:45', '15:30','0:10'),
    new TimetableHour('15:40', '16:25', '0:10')
  ];

  constructor() { }

  ngOnInit(): void {
  }



}
