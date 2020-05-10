import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  authToken: any;
  user: any;

  constructor(
    private http:HttpClient,
    private helperService: JwtHelperService
  ) { }

  //register new user
  registerUser(user): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('http://127.0.0.1:3000/users/register', user, httpOptions);
  }

  //authorise user
  authenticateUser(user): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('http://127.0.0.1:3000/users/authenticate', user, httpOptions);
  }

  //update saved encryption keys
  updateUserInfo(keyList): Observable<any> {
    this.loadToken();
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };
    return this.http.put<any>('http://127.0.0.1:3000/users/update', keyList, httpOptions);
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logoutUser(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getSavedDetails(): Observable<any> {
    this.loadToken();
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    };
    return this.http.get<any>('http://127.0.0.1:3000/users/details', httpOptions);
  }

  //get currently logged in user
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    let helperService = new JwtHelperService();
    if(localStorage.id_token == undefined){
      return false;
    }
    return !helperService.isTokenExpired(localStorage.id_token);
  }
}
