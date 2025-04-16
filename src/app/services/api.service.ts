import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Get method with auth headers
  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${endpoint}`);
  }

  // Post method with auth headers
  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${endpoint}`, data);
  }

  // Put method with auth headers
  putData(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${endpoint}`, data);
  }

  // Delete method with auth headers
  deleteData(endpoint: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${endpoint}`);
  }

}
