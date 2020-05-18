import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {server} from '../../utils/helper';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  public login(username: string, password: string): Promise<any> {
    return this.http.post(`${server.baseURL}/login`, { username, password }).toPromise();
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
