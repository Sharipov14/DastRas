export interface GeneralStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  lowStockProductsCount: number;
}

export interface SalesTrend {
  date: string;
  orderCount: number;
  revenue: number;
}

export interface StaffPerformance {
  staffId: number;
  fullName: string;
  role: string;
  assembledCount: number;
  deliveredCount: number;
}

export interface StockAlert {
  productId: number;
  productName: string;
  stockQuantity: number;
  unit: string;
}

export interface DashboardData {
  stats: GeneralStats;
  salesTrends: SalesTrend[];
  staffPerformance: StaffPerformance[];
  lowStockProducts: StockAlert[];
}
