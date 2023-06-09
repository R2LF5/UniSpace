import { HttpClient,  HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserUniService {

  constructor(private http: HttpClient) { }

  loginService(formLogin: any){
    return this.http.post<any>('http://localhost:8080/api/v1/auth/authenticate', formLogin);
  }

  resetService(formReset: any) {
    const emailParam = formReset.email;
    const url = `http://localhost:8080/api/v1/user/request?email=${emailParam}`;
    return this.http.post(url, formReset, { responseType: 'text' });
  }

  newPasswordService(token: any, pass1:any, pass2:any) {
    let httpParams = new HttpParams();
    httpParams=httpParams.append('token',token);
    httpParams=httpParams.append('password',pass1);
    httpParams=httpParams.append('confirmedPassword',pass2);

    const url = 'http://localhost:8080/api/v1/user/reset';
    return this.http.get(url,  { responseType: 'text' , params: httpParams });
  }

  getAllUsers() {
    return this.http.get<User[]>('http://localhost:8080/api/v1/user/findAllUsers');
  }

  findUserById(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/api/v1/user/find/${id}`);
  }

  updateUserFirstLogin(id: string, user: User): Observable<User> {
    const url = `http://localhost:8080/api/v1/professor/update/`+id;
    return this.http.put<User>(url, user);
  }

  updateProfessor(id:string , user: User){
     return this.http.put<User>(`http://localhost:8080/api/v1/professor/update/${id}`, user);
  }

  updateStudent(id:string , user: User){
    return this.http.put<User>(`http://localhost:8080/api/v1/student/update/${id}`, user);
  }

  updateAdmin(id:string , user: User){
    return this.http.put<User>(`http://localhost:8080/api/v1/admin/update/${id}`, user);
  }

  changePasswordService(id: string, currentPassword: string, newPassword: string) {
    const url = `http://localhost:8080/api/v1/user/${id}/changePassword?currentPassword=${currentPassword}&newPassword=${newPassword}`;
    return this.http.put(url, { responseType: 'text' });
  }

  activateUserService(id: string) {
    const url = `http://localhost:8080/api/v1/user/${id}/activate`;
    return this.http.post(url, { responseType: 'text' });
  }

  deactivateUserService(id: string) {
    const url = `http://localhost:8080/api/v1/user/${id}/deactivate`;
    return this.http.put(url, { responseType: 'text' });
  }

  addUser(user: User): Observable<User> {
    const url = 'http://localhost:8080/api/v1/user/add';
    return this.http.post<User>(url, user);
  }

  registerUser(user: any): Observable<User> {
    const url = 'http://localhost:8080/api/v1/auth/register';
    return this.http.post<any>(url, user);
  }

  deleteUserById(id: string): Observable<{}> {
    const url = `http://localhost:8080/api/v1/user/delete/${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  updateUser(user: User): Observable<User> {
    const url = 'http://localhost:8080/api/v1/user/updateUser';
    return this.http.put<User>(url, user);
  }
}
