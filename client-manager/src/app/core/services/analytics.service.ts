import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DashboardData } from '../models/analytics.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Analytics`;

  dashboardData = signal<DashboardData | null>(null);
  isLoading = signal<boolean>(false);

  async loadDashboardData(from?: string, to?: string) {
    this.isLoading.set(true);
    try {
      let params: any = {};
      if (from) params.from = from;
      if (to) params.to = to;

      const data = await firstValueFrom(
        this.http.get<DashboardData>(`${this.apiUrl}/dashboard`, { params })
      );
      this.dashboardData.set(data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
