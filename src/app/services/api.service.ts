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

  // Helper method to create headers with JWT token
  private getAuthHeaders(): HttpHeaders {
    const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibW9uZXl0b3JfYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImM2M2YyZmZmLTMzMGUtNDg0ZC1jNTNkLTA4ZGQ3MzJkY2NhMiIsImV4cCI6MTc0NDMzMDgxOCwiaXNzIjoiTW9uZXl0b3JBcHAiLCJhdWQiOiJNb25leXRvckF1ZGllbmNlIn0.b44PqM_IH6jburW5ewzWJpOhC9pIxy_wbEnHHZ3AfKk3OZqDSLKcCveS0fXu8JTiirdFrfGKlpHO93Lqanm8Cw";
     // localStorage.getItem('jwt_token'); // Retrieve token from storage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Get method with auth headers
  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${endpoint}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Post method with auth headers
  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${endpoint}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  // Put method with auth headers
  putData(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${endpoint}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete method with auth headers
  deleteData(endpoint: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${endpoint}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Method for authentication (login) - no auth headers needed
  login(endpoint: string, credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${endpoint}`, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Method to store the JWT token after login
  storeToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  // Method to check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  // Method to log out
  logout(): void {
    localStorage.removeItem('jwt_token');
  }
}
