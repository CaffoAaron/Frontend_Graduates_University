import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = 'https://homemade20201124161107.azurewebsites.net/api/user/';
const AUTH_API2 = 'https://homemade20201124161107.azurewebsites.net/api/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'authenticate', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }
  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'sign-up', {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
  postUser(): Observable<any>{
    return this.http.post(AUTH_API2 + 'userchef',
      {
        name: 'aaron',
        lastname: 'string',
        password: 'string',
        email: 'pepe@hotmail.com',
        picture: 'string',
        date: '2020-11-27T17:54:31.570Z',
        gender: true,
        certificate: ''
      });
  }
}
