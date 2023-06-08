import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private API_URL = 'http://localhost:8080/api/v1/event';

  constructor(private http: HttpClient) { }

  findAllEvents(): Observable<any[]> {
    const url = `${this.API_URL}/findAllEvents`;
    return this.http.get<any[]>(url);
  }

  findEventById(id: number): Observable<any> {
    const url = `${this.API_URL}/findById/${id}`;
    return this.http.get<any>(url);
  }

  createEvent(event: any): Observable<string> {
    const url = `${this.API_URL}/addEvent`;
    return this.http.post<string>(url, event);
  }

  updateEventPost(event: any, eventId: number, postedBy: number): Observable<any> {
    const url = `${this.API_URL}/update/${eventId}/by/${postedBy}`;
    return this.http.put(url, event);
  }

  deleteEvent(eventId: number, postedBy: number): Observable<any> {
    const url = `${this.API_URL}/delete/${eventId}/by/${postedBy}`;
    return this.http.delete(url);
  }

  joinEvent(eventId: string, Id: string): Observable<string> {
    const url = `${this.API_URL}/${eventId}/join/${Id}`;
    return this.http.post<string>(url, null);
  }

  leaveEvent(eventId: number, studentId: number): Observable<string> {
    const url = `${this.API_URL}/${eventId}/leave/${studentId}`;
    return this.http.post<string>(url, null);
  }

  addEventToStudentCalendar(studentId: number, eventId: number): Observable<string> {
    const url = `${this.API_URL}/addEventToStudentCalendar/${studentId}/${eventId}`;
    return this.http.post<string>(url, null);
  }

  removeEventFromStudentCalendar(studentId: number, eventId: number): Observable<string> {
    const url = `${this.API_URL}/removeEventFromStudentCalendar/${studentId}/${eventId}`;
    return this.http.delete<string>(url);
  }

  getCalendarEventsForToday(studentId: number): Observable<any[]> {
    const url = `${this.API_URL}/${studentId}/calendar/events/today`;
    return this.http.get<any[]>(url);
  }

  getCalendarEventsAfterToday(studentId: number): Observable<any[]> {
    const url = `${this.API_URL}/${studentId}/calendar/events/afterToday`;
    return this.http.get<any[]>(url);
  }

  getAllEventsByDate(date: Date): Observable<any[]> {
    const url = `${this.API_URL}/events?date=${date.toISOString()}`;
    return this.http.get<any[]>(url);
  }
}
