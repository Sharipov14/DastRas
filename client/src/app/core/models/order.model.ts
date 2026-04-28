export interface OrderItem {
  productId: number;
  productNameRu: string;
  productImageUrl: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  total: number;
  createdAt: string;
  items: OrderItem[];
}

export interface CreateOrderRequest {
  addressId?: number;
}
