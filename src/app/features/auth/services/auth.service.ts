import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIURLConstants } from 'src/app/core/constants/api-url.constant';

const baseUrl = `${environment.apiURL}`;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private userDetails: any = null;
  private usersKey = 'LoginUserDetail';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {
    this.userDetails = this.getUserDet(); 
  }

  signupUser(registerPwdDet: any) {
    return this.http.post<any>(`${baseUrl}${APIURLConstants.Authenticate.Register}`, registerPwdDet, this.httpOptions)
  }

  signinUser(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${baseUrl}${APIURLConstants.Authenticate.Login}`, { Username: email, Password: password }, this.httpOptions)
  }

  resetPassword(resetPwdDet: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}${APIURLConstants.Authenticate.ResetPassword}`, resetPwdDet, this.httpOptions)
  }

  sendEmailForChangePassword(email: any[]): Observable<any> {
    return this.http.post<any>(`${baseUrl}${APIURLConstants.Authenticate.SendEmailForChangePassword}`, email, this.httpOptions)
  }


  isAuthenticated() {
    let users: any = this.getUserDet();
    if (!users) {
      return false;
    } else {
      return true;
    }
  }
  getUserToken() {
    if (!this.userDetails) {
      this.userDetails = this.getUserDet();
    }
    return this.userDetails?.token || "";
  }
  getUserDet(): any {
    return JSON.parse(localStorage.getItem(this.usersKey) || null);
  }

  logout() {
    this.userDetails = null;
    localStorage.removeItem(this.usersKey);
  }

}
