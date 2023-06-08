import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarpoolService {

  private API_URL = 'http://localhost:8080/api/v1/carpool'; // replace with your actual API URL

  constructor(private http: HttpClient) { }

  addCarpool(carpool: any): Observable<any> {
    return this.http.post(`${this.API_URL}/addCarpool`, carpool);
  }

  findAllCarpools(): Observable<any> {
    return this.http.get(`${this.API_URL}/findAllCarpools`);
  }

  findCarpoolById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/find/${id}`);
  }

  updateCarpool(carpool: any): Observable<any> {
    return this.http.put(`${this.API_URL}/update`, carpool);
  }

  deleteCarpoolById(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/delete/${id}`);
  }

  updateStudentRateInCarpool(carpoolId: number, studentId: number, newRate: number): Observable<any> {
    return this.http.put(`${this.API_URL}/${carpoolId}/driver/${studentId}/rate`, { params: { newRate } });
  }

  joinCarpool(carpoolId: number, riderId: number): Observable<any> {
    return this.http.post(`${this.API_URL}/${carpoolId}/riders/${riderId}`, {});
  }

  leaveCarpool(carpoolId: number, riderId: number): Observable<any> {
    return this.http.post(`${this.API_URL}/${carpoolId}/riders/${riderId}/leave`, {});
  }

  getCarpoolsByDriver(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/byDriver/${id}`);
  }

  getAllCarpoolsByRider(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/byPassenger/${id}`);
  }

}
