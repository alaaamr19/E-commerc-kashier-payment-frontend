import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;
  public isLogined = false;
  constructor(private http: HttpClient, private roter: Router) { }
  register(data: any) {
    return this.http.post(this.baseUrl + '/users', data, {
      observe: 'body',
    });
  }

  login(data: any) {
    if (data.email !== '' && data.password !== '') {
      return this.http
        .post(
          this.baseUrl + '/users/login',
          {
            email: data.email,
            password: data.password,
          },
          {
            observe: 'body',
          }
        )
        .subscribe((response: any) => {
          if (response.token) {
            this.setToken(response);
            this.isLogined = true;
            this.roter.navigate(['']);
          }
        });
    }
  }
  setToken(data: any) {
    const userData = {
      token: data.token,
      user: data.user,
    };
    localStorage.setItem('user', JSON.stringify(userData));
  }

  getToken() {
    const userData = localStorage.getItem('user');
    return JSON.parse(userData)?.token;
  }

  logout() {
    this.http.get(this.baseUrl + '/users/logout').subscribe((response: any) => {
      localStorage.removeItem('user');
      this.isLogined = false;
      this.roter.navigate(['login']);
    });
  }
}
