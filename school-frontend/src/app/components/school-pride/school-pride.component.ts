import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-school-pride',
  templateUrl: './school-pride.component.html',
  styleUrls: ['./school-pride.component.sass']
})
export class SchoolPrideComponent implements OnInit {

  public pupils: any = [];
  public graduates: any = [];
  public defaultLogo = 'https://www.ccd.edu/sites/default/files/PhotoAvatar.jpg';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('assets/mock-data/MOCK_DATA.json')
      .toPromise()
      .then((teachers: any) => {
        this.pupils = teachers.splice(0, 3);
        this.graduates = teachers;
      })
  }

  getLogo(url) {
    return url ? url : this.defaultLogo;
  }

}
