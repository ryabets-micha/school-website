import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {server} from '../../../utils/helper';
import {UserRo} from '../../../../../school-backend/src/user/user.dto';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  public isError: boolean = false;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token)
      this.router.navigate(['news']);
  }

  public login(): void {
    this.auth.login(this.username, this.password)
      .then((res: UserRo) => {
        this.isError = false;
        localStorage.setItem('token', res.token);
        this.router.navigate(['news']);
      }).catch( ({ error }) => {
        this.isError = true;
        console.error(error.message);
      });
  }

}
