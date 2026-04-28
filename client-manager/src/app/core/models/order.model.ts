export enum OrderStatus {
  Preparing = 'Preparing',
  Delivering = 'Delivering',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled'
}

export interface OrderItem {
  productId: number;
  productNameRu: string;
  productImageUrl: string;
  price: number;
  quantity: number;
  isAssembled?: boolean; // Локальный статус сборки для менеджера
}

export interface Order {
  id: number;
  orderNumber: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
  items: OrderItem[];
}
