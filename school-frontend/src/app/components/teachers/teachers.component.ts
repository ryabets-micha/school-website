import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.sass']
})
export class TeachersComponent implements OnInit {

  public teachers: any = [];
  public defaultLogo = 'https://www.ccd.edu/sites/default/files/PhotoAvatar.jpg';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('assets/mock-data/teachers.json')
      .toPromise()
      .then(teachers => this.teachers = teachers)
  }

  getLogo(url) {
    return url ? url : this.defaultLogo;
  }

}
