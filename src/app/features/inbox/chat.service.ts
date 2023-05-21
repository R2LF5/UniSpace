import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private groupApiUrl = 'http://localhost:8080/groups'; // Replace with your API URL
  private messageApiUrl = 'http://localhost:8080/messages'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  createGroup(group: any): Observable<any> {
    return this.http.post(this.groupApiUrl, group);
  }

  addUserToGroup(userId: string, groupId: string): Observable<any> {
    return this.http.post(`${this.groupApiUrl}/${groupId}/users/${userId}`, {});
  }

  sendMessage(groupId: string, message: any): Observable<any> {
    return this.http.post(`${this.messageApiUrl}/${groupId}`, message);
  }

  getMessages(groupId: string): Observable<any> {
    return this.http.get(`${this.messageApiUrl}/${groupId}`);
  }


}
