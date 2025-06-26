/**
 * Payment related type definitions
 */
import { PaymentMethod, PaymentStatus } from './order.types';

/**
 * Payment details
 */
export interface PaymentDetails {
  card_last4?: string;
  card_brand?: string;
  [key: string]: any;
}

/**
 * Create payment request
 */
export interface CreatePaymentRequest {
  order: number;
  payment_id: string;
  amount: number;
  status: PaymentStatus;
  payment_method: PaymentMethod;
  payment_details: PaymentDetails;
}

/**
 * Payment response
 */
export interface PaymentResponse {
  id: number;
  order: number;
  payment_id: string;
  amount: string;
  status: PaymentStatus;
  payment_method: PaymentMethod;
  payment_details: PaymentDetails;
  created_at: string;
}