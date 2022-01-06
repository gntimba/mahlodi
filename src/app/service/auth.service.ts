import { attendances } from './../interface/attendances';
import { Student } from './../interface/status';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from './../config';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { Tokens } from '../models/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();
  public readonly ACCESS_TOKEN = 'token';
  public readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  public readonly TINYTOKEN = 'TINYTOKEN';
  token: any;
  sharedTD: any;
  selectedTenant: any;


  private users: string;

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem(this.ACCESS_TOKEN) != null) {
      this.token = JSON.parse(localStorage.getItem(this.ACCESS_TOKEN));
    }
  }

  login(user): Observable<any> {
    return this.http.post<any>(`${config.apiUrl}/login`, user);
  }
  // tslint:disable-next-line: typedef





  logout() {
    return this.http.get(`${config.apiUrl}/logout`).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        console.log(error);
        return of(false);
      }));
  }

  // tslint:disable-next-line: typedef
  isLoggedIn() {
  //  console.log(localStorage.getItem(this.ACCESS_TOKEN))
    if (localStorage.getItem(this.ACCESS_TOKEN)) {
      if (this.helper.isTokenExpired(this.token.accessToken) == false) {
        return true;
      }
      return false;
    }
    return false;
  }

  // refreshToken() {
  //   return this.http.post<any>(`${config.apiUrl}/refresh`, {
  //     refreshToken: this.getRefreshToken()
  //   }).pipe(tap((tokens: Tokens) => {
  //     this.storeJwtToken(tokens.jwt);
  //   }));
  // }

  getJwtToken() {
    return JSON.parse(localStorage.getItem(this.ACCESS_TOKEN));
  }

  public decodeUser() {

    //const token = JSON.parse(localStorage.getItem(this.ACCESS_TOKEN));
    return JSON.parse(atob(this.helper.decodeToken(this.token.accessToken).auth));

  }

  public getMainTenant(){
    return this.helper.decodeToken(this.token.accessToken).tenantId
  }


  private doLogoutUser() {
    this.removeTokens();
  }


  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  storeJwtToken(jwt:any) {
    localStorage.setItem(this.ACCESS_TOKEN, JSON.stringify(jwt));
    this.token = JSON.parse(localStorage.getItem(this.ACCESS_TOKEN));
  }

  storeTokens(tokens) {
    localStorage.setItem(this.ACCESS_TOKEN, tokens);
    //  localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    this.router.navigate(['/login']);
    //  localStorage.removeItem(this.REFRESH_TOKEN);
  }

  registerStudent(data:any):Observable<any> {

    const headers= new HttpHeaders({
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem(this.ACCESS_TOKEN))})
     return this.http.post<Student>(`${config.apiUrl}/student`, data, {
       reportProgress: true,
       observe: 'events',
       headers:headers
     });
   }


  getAttendance():Observable<Student[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem(this.ACCESS_TOKEN))
      })
    };
    const headers= new HttpHeaders({
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem(this.ACCESS_TOKEN))})
     return this.http.get<Student[]>(`${config.apiUrl}/getAttendance` , httpOptions);
   }

   getWeekly():Observable<attendances[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem(this.ACCESS_TOKEN))
      })
    };
    const headers= new HttpHeaders({
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem(this.ACCESS_TOKEN))})
     return this.http.get<attendances[]>(`${config.apiUrl}/getByWeek` , httpOptions);
   }

   getAttendanceBydate(date):Observable<Student[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem(this.ACCESS_TOKEN))
      })
    };
    const headers= new HttpHeaders({
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + JSON.parse(localStorage.getItem(this.ACCESS_TOKEN))})
     return this.http.get<Student[]>(`${config.apiUrl}/getAttendance?date=${date}` , httpOptions);
   }
}


