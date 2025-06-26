import { ApiService } from './apiService';
import { CreatePaymentRequest, PaymentResponse } from '../types/api';

/**
 * Service for payment-related API operations
 */
class PaymentService extends ApiService<PaymentResponse, CreatePaymentRequest> {
  constructor() {
    // Pass the endpoint to the parent class
    super('/payments/payments');
  }

  /**
   * Create a new payment for an order
   * @param data The payment data
   * @returns Promise resolving to the created payment
   */
  createPayment = async (data: CreatePaymentRequest): Promise<PaymentResponse> => {
    return this.create(data);
  };

  /**
   * Get payment details
   * @param paymentId The payment ID
   * @returns Promise resolving to the payment details
   */
  getPaymentDetails = async (paymentId: number): Promise<PaymentResponse> => {
    return this.getById(paymentId);
  };

  /**
   * Get payments for an order
   * @param orderId The order ID
   * @returns Promise resolving to an array of payments
   */
  getOrderPayments = async (orderId: number): Promise<PaymentResponse[]> => {
    return this.customGet<PaymentResponse[]>(`by-order/${orderId}/`);
  };

  /**
   * Process a payment (webhook handler)
   * @param paymentId The payment ID
   * @param status The payment status
   * @returns Promise resolving to the updated payment
   */
  processPayment = async (paymentId: string, status: string): Promise<PaymentResponse> => {
    return this.customPost<{ status: string }, PaymentResponse>(`process/${paymentId}/`, { status });
  };
}

// Create a singleton instance
const paymentService = new PaymentService();

export default paymentService;