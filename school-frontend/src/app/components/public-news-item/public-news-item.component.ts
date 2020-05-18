import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {server} from '../../../utils/helper';
import {Subscription} from 'rxjs';
import {FormatTextService} from '../../services/format-text.service';

@Component({
  selector: 'app-public-news-item',
  templateUrl: './public-news-item.component.html',
  styleUrls: ['./public-news-item.component.sass']
})
export class PublicNewsItemComponent implements OnInit, OnDestroy {

  private paramsSubscription: Subscription;
  public news: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(({ id }) => this.getNewsById(id));
  }

  private getNewsById(id) {
    this.http.get(`${server.baseURL}/api/news/${id}`)
      .toPromise()
      .then( news => this.news = news )
      .catch(e => console.error(e));
  }

  public formatDate(date: string): string {
    return FormatTextService.formatDate(date);
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

}
