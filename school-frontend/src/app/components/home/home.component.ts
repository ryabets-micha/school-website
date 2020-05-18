import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {server} from '../../../utils/helper';
import {FormatTextService} from '../../services/format-text.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public newsArr: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getNews();
  }

  private getNews() {
    this.http.get(`${server.baseURL}/api/news`)
      .toPromise()
      .then((news: any[]) => this.newsArr = news.splice(0, 3))
      .catch(e => console.error(e));
  }

  public formatNewsTitle(title: string): string {
    return FormatTextService.formatTextLength(title, 10);
  }

  public formatNewsBody(body: string): string {
    return FormatTextService.formatTextLength(body, 20);
  }

  public formatDate(date: string): string {
    return FormatTextService.formatDate(date);
  }

}
