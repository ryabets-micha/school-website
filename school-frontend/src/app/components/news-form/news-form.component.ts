import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsRo} from '../../../../../school-backend/src/news/news.dto';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {server} from '../../../utils/helper';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.sass']
})
export class NewsFormComponent implements OnInit, OnDestroy {

  private paramsSubscription: Subscription;
  private newsId: string;
  public newsData: NewsRo = new NewsRo();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(({ id }) => this.getNewsById(id));
  }

  private getNewsById(id: string) {
    this.newsId = id;

    if (id !== '-1') {
      this.http.get(`${server.baseURL}/api/news/${id}`)
        .toPromise()
        .then((news: NewsRo) => this.newsData = news)
        .catch(e => console.error(e));
    }
  }

  private createOrUpdate() {
    const opts = {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    if (this.newsId === '-1') {
      return this.http.post(`${server.baseURL}/api/news`, this.newsData, opts);
    } else {
      return this.http.put(`${server.baseURL}/api/news/${this.newsId}`, this.newsData, opts);
    }
  }

  public goBack() {
    this.router.navigate(['news']);
  }

  public createOrUpdateNews() {
    this.createOrUpdate()
      .toPromise()
      .then(news => this.goBack())
      .catch(e => console.error(e));
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
