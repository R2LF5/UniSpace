import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly API_URL = 'http://localhost:8080/api/v1/course';

  constructor(private http: HttpClient) { }

  addCourse(course: any): Observable<any> {
    return this.http.post(`${this.API_URL}/addCourse`, course);
  }

  findAllCourses(): Observable<any> {
    return this.http.get(`${this.API_URL}/findAllCourses`);
  }

  findCourseById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/findBy/${id}`);
  }

  updateCourse(id: number, course: any): Observable<any> {
    return this.http.put(`${this.API_URL}/courses/${id}`, course);
  }

  getCoursesBySection(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/courses/bySection/${id}`);
  }

  getCoursesByProfessor(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/courses/byProfessor/${id}`);
  }
}
