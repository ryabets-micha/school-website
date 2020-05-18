import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {server} from '../../../utils/helper';
import {AuthService} from '../../services/auth.service';
import {FormatTextService} from '../../services/format-text.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit {

  public newsArr: any = [];

  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
    this.getNews();
  }

  private getNews() {
    this.http.get(`${server.baseURL}/api/news`)
      .toPromise()
      .then(news => {
        console.log(news);
        this.newsArr = news;
      });
  }

  public formatNewsTitle(title: string): string {
    return FormatTextService.formatTextLength(title, 12);
  }

  public formatNewsBody(body: string): string {
    return FormatTextService.formatTextLength(body, 35);
  }

  public formatDate(date: string): string {
    return FormatTextService.formatDate(date);
  }

  public logout() {
    this.auth.logout();
  }

  public deleteNews(id: string) {
    const opts = { headers: { authorization: 'Bearer ' + localStorage.getItem('token') } };
    this.http.delete(`${server.baseURL}/api/news/${id}`, opts)
      .toPromise()
      .then(_ => this.newsArr = this.newsArr.filter(news => news.id !== id))
      .catch(e => console.error(e));
  }

}
