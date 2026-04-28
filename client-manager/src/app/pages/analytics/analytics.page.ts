import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, 
  IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent, IonText, IonSkeletonText,
  IonList, IonItem, IonLabel, IonBadge, IonRefresher, IonRefresherContent
} from '@ionic/angular/standalone';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { AnalyticsService } from '../../core/services/analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  standalone: true,
  providers: [
    provideCharts(withDefaultRegisterables())
  ],
  imports: [
    CommonModule, IonHeader, IonToolbar, IonButtons, IonMenuButton, 
    IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, 
    IonCardTitle, IonCardContent, IonText, IonSkeletonText,
    IonList, IonItem, IonLabel, IonBadge, IonRefresher, IonRefresherContent,
    BaseChartDirective
  ]
})
export class AnalyticsPage implements OnInit {
  private analyticsService = inject(AnalyticsService);

  data = this.analyticsService.dashboardData;
  isLoading = this.analyticsService.isLoading;

  // Sales Chart
  public lineChartData = computed<ChartData<'line'>>(() => {
    const trends = this.data()?.salesTrends || [];
    return {
      labels: trends.map(t => new Date(t.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })),
      datasets: [
        {
          data: trends.map(t => t.revenue),
          label: 'Выручка (сом)',
          fill: true,
          tension: 0.4,
          borderColor: '#3880ff',
          backgroundColor: 'rgba(56, 128, 255, 0.1)',
          pointBackgroundColor: '#3880ff'
        }
      ]
    };
  });

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  // Performance Chart
  public barChartData = computed<ChartData<'bar'>>(() => {
    const perf = this.data()?.staffPerformance || [];
    return {
      labels: perf.map(p => p.fullName),
      datasets: [
        { 
          data: perf.map(p => p.assembledCount), 
          label: 'Собрано',
          backgroundColor: '#2dd36f'
        },
        { 
          data: perf.map(p => p.deliveredCount), 
          label: 'Доставлено',
          backgroundColor: '#3880ff'
        }
      ]
    };
  });

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true }
    }
  };

  ngOnInit() {
    this.analyticsService.loadDashboardData();
  }

  async handleRefresh(event: any) {
    await this.analyticsService.loadDashboardData();
    event.target.complete();
  }
}
