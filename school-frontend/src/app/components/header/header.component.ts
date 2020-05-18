import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public toggleMenu() {
    const menu = document.querySelector('#ftco-nav');
    menu.classList.toggle('collapse');
  }

  public closeMenu() {
    const menu = document.querySelector('#ftco-nav');
    menu.classList.remove('collapse');
  }

}
