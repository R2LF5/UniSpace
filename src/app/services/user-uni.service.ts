import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserUniService {

  constructor(private http: HttpClient) { }

  loginService(formLogin: any){
    return this.http.post<any>('http://localhost:8080/api/v1/auth/authenticate',formLogin);
  }
  resetService(formReset: any) {
    const emailParam = formReset.email;
    const url = `http://localhost:8080/api/v1/user/request?email=${emailParam}`;
    return this.http.post(url, formReset, { responseType: 'text' });
  }
  resetPasswordService(formReset: any) {
    const emailParam = formReset.email;
    const url = `http://localhost:8080/api/v1/user/reset?email=${emailParam}`;
  }

}
