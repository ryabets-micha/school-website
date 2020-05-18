import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  public activeUrl: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.activeUrl = event.url;
        }
      });
  }

  public publicLayout(): boolean {
    return !(this.activeUrl && (this.activeUrl.includes('/login') || this.activeUrl.includes('/news')));

  }

  ngOnDestroy(): void {
    this.router.events.subscribe();
  }
}
