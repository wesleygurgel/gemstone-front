/**
 * Order related type definitions
 */
import { ProductListItem } from './product.types';

/**
 * Order item
 */
export interface OrderItem {
  id: number;
  product: number;
  product_details: ProductListItem;
  quantity: number;
  price: string;
  total_price: string;
}

/**
 * Order status
 */
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

/**
 * Payment status
 */
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';

/**
 * Payment method
 */
export type PaymentMethod = 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer' | 'other';

/**
 * Create order request
 */
export interface CreateOrderRequest {
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_country: string;
  shipping_postal_code: string;
  shipping_phone: string;
  payment_method: PaymentMethod;
}

/**
 * Create order response
 */
export interface CreateOrderResponse {
  id: number;
  user: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  total_price: string;
  created_at: string;
}

/**
 * Order detail
 */
export interface OrderDetail {
  id: number;
  user: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_country: string;
  shipping_postal_code: string;
  shipping_phone: string;
  payment_method: PaymentMethod;
  payment_details: any | null;
  total_price: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

/**
 * Order filter parameters
 */
export interface OrderFilterParams {
  status?: OrderStatus;
  payment_status?: PaymentStatus;
}