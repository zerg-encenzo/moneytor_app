// services/user.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user-profile.interface';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  // BehaviorSubject holds the current value and emits it to new subscribers
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  
  // Observable that components can subscribe to
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  
  constructor() {
    // Try to load user from localStorage on service initialization
    this.loadUserFromStorage();
  }
  
  // Get the current user value without subscribing
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
  
  // Set the logged-in user
  setCurrentUser(user: User): void {
    // Save to localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(user));
    // Update the BehaviorSubject
    this.currentUserSubject.next(user);
  }
  
  // Clear the logged-in user (on logout)
  clearCurrentUser(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  
  // Load user from localStorage (called in constructor)
  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (e) {
        console.error('Error parsing stored user data');
        localStorage.removeItem('currentUser');
      }
    }
  }
}