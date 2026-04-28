import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User, UserRole } from '../models/auth.model';
import { firstValueFrom } from 'rxjs';

export interface CreateUserRequest {
  username: string;
  password?: string;
  phone: string;
  name: string;
  role: UserRole;
}

export interface UpdateUserRequest {
  name: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Users`;

  async getAll(includeDeleted: boolean = false) {
    const params = new HttpParams().set('includeDeleted', includeDeleted);
    return await firstValueFrom(this.http.get<User[]>(this.apiUrl, { params }));
  }

  async create(user: CreateUserRequest) {
    return await firstValueFrom(this.http.post<User>(this.apiUrl, user));
  }

  async update(id: number, user: UpdateUserRequest) {
    return await firstValueFrom(this.http.put<User>(`${this.apiUrl}/${id}`, user));
  }

  async delete(id: number) {
    return await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));
  }

  async restore(id: number) {
    return await firstValueFrom(this.http.post<User>(`${this.apiUrl}/${id}/restore`, {}));
  }
}
