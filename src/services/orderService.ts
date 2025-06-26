import { ApiService } from './apiService';
import { 
  CreateOrderRequest, 
  CreateOrderResponse, 
  OrderDetail, 
  OrderFilterParams, 
  OrderStatus, 
  PaymentStatus 
} from '../types/api';
import { PaginatedResponse } from '../types/api';

/**
 * Service for order-related API operations
 */
class OrderService extends ApiService<OrderDetail, CreateOrderRequest> {
  constructor() {
    // Pass the endpoint to the parent class
    super('/orders/orders');
  }

  /**
   * Create a new order from the current cart
   * @param data The order data
   * @returns Promise resolving to the created order
   */
  createOrder = async (data: CreateOrderRequest): Promise<CreateOrderResponse> => {
    return this.create(data);
  };

  /**
   * Get orders for the current user
   * @param params Filter parameters
   * @returns Promise resolving to a paginated response of orders
   */
  getUserOrders = async (params?: OrderFilterParams): Promise<PaginatedResponse<OrderDetail>> => {
    return this.getAll(params);
  };

  /**
   * Get order details
   * @param orderId The order ID
   * @returns Promise resolving to the order details
   */
  getOrderDetails = async (orderId: number): Promise<OrderDetail> => {
    return this.getById(orderId);
  };

  /**
   * Cancel an order
   * @param orderId The order ID
   * @returns Promise resolving to the updated order
   */
  cancelOrder = async (orderId: number): Promise<OrderDetail> => {
    return this.customPost<{}, OrderDetail>(`${orderId}/cancel/`);
  };

  /**
   * Update order status (admin only)
   * @param orderId The order ID
   * @param status The new status
   * @returns Promise resolving to the updated order
   */
  updateOrderStatus = async (orderId: number, status: OrderStatus): Promise<OrderDetail> => {
    return this.patch(orderId, { status });
  };

  /**
   * Update payment status (admin only)
   * @param orderId The order ID
   * @param paymentStatus The new payment status
   * @returns Promise resolving to the updated order
   */
  updatePaymentStatus = async (orderId: number, paymentStatus: PaymentStatus): Promise<OrderDetail> => {
    return this.patch(orderId, { payment_status: paymentStatus });
  };
}

// Create a singleton instance
const orderService = new OrderService();

export default orderService;