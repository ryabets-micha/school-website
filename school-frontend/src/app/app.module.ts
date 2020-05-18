import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewsComponent } from './components/news/news.component';
import { NewsFormComponent } from './components/news-form/news-form.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './guards/auth.guard';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {AuthService} from './services/auth.service';
import { PublicNewsComponent } from './components/public-news/public-news.component';
import { PublicNewsItemComponent } from './components/public-news-item/public-news-item.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { SchoolPrideComponent } from './components/school-pride/school-pride.component';
import { AboutComponent } from './components/about/about.component';

export const getToken = _ => localStorage.getItem('token');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    NewsComponent,
    NewsFormComponent,
    PublicNewsComponent,
    PublicNewsItemComponent,
    TeachersComponent,
    TimetableComponent,
    SchoolPrideComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({ config: { tokenGetter: getToken } })
  ],
  providers: [AuthGuard, JwtHelperService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
