import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:8080/api/v1/course';

  constructor(private http: HttpClient) { }

  addCourse(course: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addCourse`, course);
  }

  findAllCourses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/findAllCourses`);
  }

  findCourseById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findBy/${id}`);
  }

  updateCourse(id: number, course: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/courses/${id}`, course);
  }

  getCoursesBySection(sectionId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/courses/bySection/${sectionId}`);
  }

  getCoursesByProfessor(professorId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/courses/byProfessor/${professorId}`);
  }
}
