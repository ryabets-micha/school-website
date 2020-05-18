import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {NewsComponent} from './components/news/news.component';
import {AuthGuard} from './guards/auth.guard';
import {NewsFormComponent} from './components/news-form/news-form.component';
import {PublicNewsComponent} from './components/public-news/public-news.component';
import {PublicNewsItemComponent} from './components/public-news-item/public-news-item.component';
import {TeachersComponent} from './components/teachers/teachers.component';
import {TimetableComponent} from './components/timetable/timetable.component';
import {SchoolPrideComponent} from './components/school-pride/school-pride.component';
import {AboutComponent} from './components/about/about.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'public-news', component: PublicNewsComponent },
  { path: 'public-news/:id', component: PublicNewsItemComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'timetable', component: TimetableComponent },
  { path: 'school-pride', component: SchoolPrideComponent },
  { path: 'about', component: AboutComponent },

  { path: 'login', component: LoginComponent },
  { path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
  { path: 'news/:id', component: NewsFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
