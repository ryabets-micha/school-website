import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {server} from '../../../utils/helper';
import {FormatTextService} from '../../services/format-text.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-public-news',
  templateUrl: './public-news.component.html',
  styleUrls: ['./public-news.component.sass']
})
export class PublicNewsComponent implements OnInit {

  public newsArr: any = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getNews();
  }

  private getNews() {
    this.http.get(`${server.baseURL}/api/news`)
      .toPromise()
      .then((news: any[]) => this.newsArr = news)
      .catch(e => console.error(e));
  }

  public formatNewsTitle(title: string): string {
    return FormatTextService.formatTextLength(title, 20);
  }

  public formatNewsBody(body: string): string {
    return FormatTextService.formatTextLength(body, 40);
  }

  public formatDate(date: string): string {
    return FormatTextService.formatDate(date);
  }

  public goToNewsDetails(id: string) {
    this.router.navigate(['public-news', id]);
  }

}
