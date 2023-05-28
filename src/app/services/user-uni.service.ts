import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

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
  // add service named new password service
  newPasswordService(formNewPass: any) {
    const url= 'http://localhost:8080/api/v1/user/reset'
    return this.http.post(url, formNewPass, { responseType: 'text' });

  }
  getAllUsers() {
     return this.http.get<User[]>('http://localhost:8080/api/v1/user/findAll');
  }


  findUserById(id: string): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/api/v1/user/find/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>('http://localhost:8080/api/v1/user/updateUser', user);
  }



}
