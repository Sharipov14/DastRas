import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User, AuthResponse } from '../models/auth.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;

  currentUser = signal<User | null>(null);
  isAuthenticated = computed(() => !!this.currentUser());
  
  constructor() {
    console.log('AuthService initializing...');
    this.loadStoredAuth();
  }

  private loadStoredAuth() {
    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (storedUser && token) {
        const user = JSON.parse(storedUser);
        // Проверяем наличие обязательных полей (role может быть 0)
        if (user && user.id !== undefined && user.role !== undefined) {
          this.currentUser.set(user);
        } else {
          this.logout();
        }
      }
    } catch (e) {
      console.error('Error loading auth state', e);
      this.logout();
    }
  }

  async sendCode(phone: string) {
    return await firstValueFrom(this.http.post(`${this.apiUrl}/StaffAuth/send-code`, { phone }));
  }

  async login(phone: string, code: string) {
    const response = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.apiUrl}/StaffAuth/verify-code`, { phone, code })
    );
    return this.handleAuthResponse(response);
  }

  async loginWithPassword(username: string, password: string) {
    console.log('Attempting login for:', username);
    const response = await firstValueFrom(
      this.http.post<AuthResponse>(`${this.apiUrl}/StaffAuth/login`, { username, password })
    );
    console.log('Server response:', response);
    return this.handleAuthResponse(response);
  }

  private handleAuthResponse(response: AuthResponse) {
    console.log('Auth success, handling response...');
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.currentUser.set(response.user);
    
    console.log('Navigating to /assembly...');
    this.router.navigate(['/assembly']);
    return response;
  }

  async updateProfile(data: any) {
    const response = await firstValueFrom(
      this.http.put<User>(`${this.apiUrl}/StaffAuth/me`, data)
    );
    this.currentUser.set(response);
    localStorage.setItem('user', JSON.stringify(response));
    return response;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  hasRole(roles: any[]): boolean {
    const user = this.currentUser();
    if (!user || user.role === undefined) return false;
    // Сравниваем как строки для универсальности (C# enum может быть числом или строкой)
    return roles.some(role => String(role) === String(user.role));
  }
}
