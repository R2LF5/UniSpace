import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private API_URL = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  findIdByNameAndDegree(name: string, degree: string): Observable<number> {
    const url = `${this.API_URL}/section/findId?name=${name}&degree=${degree}`;
    return this.http.get<number>(url);
  }

  findIdsByNameAndDegreeLIST(names: string[], degrees: string[]): Observable<number[]> {
    const nameParam = names.join(",");
    const degreeParam = degrees.join(",");
    const url = `${this.API_URL}/section/ids?names=${nameParam}&degrees=${degreeParam}`;
    return this.http.get<number[]>(url);
  }

}
