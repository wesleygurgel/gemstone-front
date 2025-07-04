import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Package, 
  Truck, 
  CreditCard, 
  ChevronLeft, 
  AlertCircle, 
  Clock, 
  MapPin, 
  Phone,
  ShoppingBag,
  XCircle
} from 'lucide-react';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import Breadcrumb from '@/components/marketplace/Breadcrumb';
import { useToast } from '@/context/ToastContext';
import orderService from '@/services/orderService';
import { OrderDetail as OrderDetailType } from '@/types/api';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // State
  const [order, setOrder] = useState<OrderDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  // Fetch order details on component mount
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await orderService.getOrderDetails(parseInt(id));
        setOrder(response);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
        setError('Falha ao carregar detalhes do pedido. Por favor, tente novamente.');
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  // Handle order cancellation
  const handleCancelOrder = async () => {
    if (!id || !order || order.status === 'cancelled') return;

    // Confirm cancellation
    if (!window.confirm('Tem certeza que deseja cancelar este pedido?')) {
      return;
    }

    try {
      setCancelLoading(true);
      await orderService.cancelOrder(parseInt(id));
      showToast('Pedido cancelado com sucesso', 'success');

      // Refresh order details
      const updatedOrder = await orderService.getOrderDetails(parseInt(id));
      setOrder(updatedOrder);
    } catch (error) {
      console.error('Failed to cancel order:', error);
      showToast('Falha ao cancelar pedido. Por favor, tente novamente.', 'error');
    } finally {
      setCancelLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Format currency
  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return numValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'processing':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'shipped':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'delivered':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  // Get payment status badge class
  const getPaymentStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'processing':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'refunded':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  // Get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'processing':
        return 'Processando';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregue';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  // Get payment status label
  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'processing':
        return 'Processando';
      case 'completed':
        return 'Concluído';
      case 'failed':
        return 'Falhou';
      case 'refunded':
        return 'Reembolsado';
      default:
        return status;
    }
  };

  // Get payment method label
  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'credit_card':
        return 'Cartão de Crédito';
      case 'debit_card':
        return 'Cartão de Débito';
      case 'bank_transfer':
        return 'Transferência Bancária';
      case 'paypal':
        return 'PayPal';
      case 'other':
        return 'Outro';
      default:
        return method;
    }
  };

  return (
    <MarketplaceLayout>
      <Helmet>
        <title>{order ? `Pedido #${order.id}` : 'Detalhes do Pedido'} - Gemstone</title>
        <meta name="description" content="Detalhes do seu pedido na Gemstone" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb 
            items={[
              { label: 'Marketplace', path: '/marketplace', isLast: false },
              { label: 'Meus Pedidos', path: '/marketplace/orders', isLast: false },
              { label: 'Detalhes do Pedido', path: `/marketplace/orders/${id}`, isLast: true }
            ]}
          />
        </div>

        {/* Back button */}
        <div className="mb-6">
          <Link
            to="/marketplace/orders"
            className="inline-flex items-center text-white/80 hover:text-gem-purple transition-colors"
          >
            <ChevronLeft size={20} className="mr-1" />
            Voltar para Meus Pedidos
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gem-pink via-gem-purple to-gem-blue bg-clip-text text-transparent">
            {order ? `Pedido #${order.id}` : 'Detalhes do Pedido'}
          </h1>
          {order && (
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center text-white/70">
                <Clock size={16} className="mr-1 text-gem-purple" />
                Realizado em {formatDate(order.created_at)}
              </div>

              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center justify-center min-w-[120px] px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(order.status)}`}>
                  Status: {getStatusLabel(order.status)}
                </span>

                <span className={`inline-flex items-center justify-center min-w-[120px] px-2.5 py-1 rounded-full text-xs font-medium border ${getPaymentStatusBadgeClass(order.payment_status)}`}>
                  Pagamento: {getPaymentStatusLabel(order.payment_status)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gem-purple"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-black-800 border border-gem-purple/20 rounded-lg">
            <AlertCircle size={48} className="text-gem-pink mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">{error}</h3>
            <p className="text-white/60 mb-6">Não foi possível carregar os detalhes do pedido.</p>
            <div className="flex gap-4">
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
              >
                Tentar Novamente
              </button>

              <button 
                onClick={() => navigate('/marketplace/orders')}
                className="px-6 py-2 bg-black-700 text-white/80 rounded-md hover:text-white transition-colors"
              >
                Voltar para Meus Pedidos
              </button>
            </div>
          </div>
        ) : !order ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-black-800 border border-gem-purple/20 rounded-lg">
            <Package size={48} className="text-gem-purple/30 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Pedido não encontrado</h3>
            <p className="text-white/60 mb-6">O pedido que você está procurando não existe ou foi removido.</p>
            <Link 
              to="/marketplace/orders"
              className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
            >
              Voltar para Meus Pedidos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order items */}
            <div className="lg:col-span-2">
              <div className="bg-black-800 border border-gem-purple/20 rounded-lg overflow-hidden mb-6">
                <div className="p-4 border-b border-gem-purple/20 flex items-center">
                  <ShoppingBag className="text-gem-purple mr-2" size={20} />
                  <h2 className="text-lg font-semibold text-white">Itens do Pedido</h2>
                </div>

                <div className="p-4">
                  {order.items.length === 0 ? (
                    <div className="text-center py-6 text-white/60">
                      Nenhum item encontrado neste pedido.
                    </div>
                  ) : (
                    <ul className="divide-y divide-gem-purple/10">
                      {order.items.map((item) => (
                        <li key={item.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex items-start">
                            {/* Product image */}
                            <div className="w-16 h-16 bg-black-700 rounded-md overflow-hidden flex-shrink-0">
                              {item.product_details.main_image && (
                                <img 
                                  src={item.product_details.main_image.image} 
                                  alt={item.product_details.main_image.alt_text || item.product_details.name} 
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>

                            {/* Product details */}
                            <div className="ml-4 flex-1">
                              <div className="flex justify-between">
                                <h3 className="text-white font-medium">{item.product_details.name}</h3>
                                <span className="text-white font-medium">R$ {formatCurrency(item.total_price)}</span>
                              </div>

                              <div className="mt-1 flex justify-between text-sm">
                                <div className="text-white/60">
                                  Quantidade: {item.quantity}
                                </div>
                                <div className="text-white/60">
                                  R$ {formatCurrency(item.price)} cada
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="p-4 border-t border-gem-purple/20 bg-black-700">
                  <div className="flex justify-between font-medium">
                    <span className="text-white">Total</span>
                    <span className="bg-gradient-to-r from-gem-purple to-gem-pink bg-clip-text text-transparent text-lg font-bold">
                      R$ {formatCurrency(order.total_price)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order timeline */}
              <div className="bg-black-800 border border-gem-purple/20 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gem-purple/20 flex items-center">
                  <Clock className="text-gem-purple mr-2" size={20} />
                  <h2 className="text-lg font-semibold text-white">Status do Pedido</h2>
                </div>

                <div className="p-4">
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gem-purple/20"></div>

                    <div className="relative pl-10 pb-6">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gem-purple flex items-center justify-center">
                        <Package size={16} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Pedido Realizado</h3>
                        <p className="text-white/60 text-sm">{formatDate(order.created_at)}</p>
                      </div>
                    </div>

                    <div className="relative pl-10 pb-6">
                      <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center ${
                        order.status !== 'pending' ? 'bg-gem-purple' : 'bg-black-700 border border-gem-purple/30'
                      }`}>
                        <CreditCard size={16} className={order.status !== 'pending' ? 'text-white' : 'text-white/60'} />
                      </div>
                      <div>
                        <h3 className={order.status !== 'pending' ? 'text-white font-medium' : 'text-white/60 font-medium'}>
                          Pagamento {getPaymentStatusLabel(order.payment_status).toLowerCase()}
                        </h3>
                        <p className="text-white/60 text-sm">
                          {order.payment_status === 'paid' ? formatDate(order.updated_at) : 'Aguardando processamento'}
                        </p>
                      </div>
                    </div>

                    <div className="relative pl-10 pb-6">
                      <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center ${
                        order.status === 'shipped' || order.status === 'delivered' ? 'bg-gem-purple' : 'bg-black-700 border border-gem-purple/30'
                      }`}>
                        <Truck size={16} className={order.status === 'shipped' || order.status === 'delivered' ? 'text-white' : 'text-white/60'} />
                      </div>
                      <div>
                        <h3 className={order.status === 'shipped' || order.status === 'delivered' ? 'text-white font-medium' : 'text-white/60 font-medium'}>
                          {order.status === 'shipped' ? 'Enviado' : order.status === 'delivered' ? 'Enviado' : 'Aguardando Envio'}
                        </h3>
                        <p className="text-white/60 text-sm">
                          {order.status === 'shipped' || order.status === 'delivered' ? formatDate(order.updated_at) : 'Aguardando processamento'}
                        </p>
                      </div>
                    </div>

                    <div className="relative pl-10">
                      <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center ${
                        order.status === 'delivered' ? 'bg-gem-purple' : 'bg-black-700 border border-gem-purple/30'
                      }`}>
                        <Package size={16} className={order.status === 'delivered' ? 'text-white' : 'text-white/60'} />
                      </div>
                      <div>
                        <h3 className={order.status === 'delivered' ? 'text-white font-medium' : 'text-white/60 font-medium'}>
                          {order.status === 'delivered' ? 'Entregue' : 'Aguardando Entrega'}
                        </h3>
                        <p className="text-white/60 text-sm">
                          {order.status === 'delivered' ? formatDate(order.updated_at) : 'Aguardando envio'}
                        </p>
                      </div>
                    </div>

                    {order.status === 'cancelled' && (
                      <div className="relative pl-10 mt-6 pt-6 border-t border-gem-purple/10">
                        <div className="absolute left-0 top-7 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                          <XCircle size={16} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-red-300 font-medium">Pedido Cancelado</h3>
                          <p className="text-white/60 text-sm">{formatDate(order.updated_at)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Order details sidebar */}
            <div className="lg:col-span-1">
              {/* Shipping information */}
              <div className="bg-black-800 border border-gem-purple/20 rounded-lg overflow-hidden mb-6">
                <div className="p-4 border-b border-gem-purple/20 flex items-center">
                  <Truck className="text-gem-purple mr-2" size={20} />
                  <h2 className="text-lg font-semibold text-white">Informações de Entrega</h2>
                </div>

                <div className="p-4">
                  <div className="mb-4">
                    <div className="flex items-start">
                      <MapPin size={16} className="text-gem-purple mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-white">{order.shipping_address}</p>
                        <p className="text-white">{order.shipping_city}, {order.shipping_state}</p>
                        <p className="text-white">{order.shipping_postal_code}</p>
                        <p className="text-white">{order.shipping_country}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center">
                      <Phone size={16} className="text-gem-purple mr-2 flex-shrink-0" />
                      <p className="text-white">{order.shipping_phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment information */}
              <div className="bg-black-800 border border-gem-purple/20 rounded-lg overflow-hidden mb-6">
                <div className="p-4 border-b border-gem-purple/20 flex items-center">
                  <CreditCard className="text-gem-purple mr-2" size={20} />
                  <h2 className="text-lg font-semibold text-white">Informações de Pagamento</h2>
                </div>

                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-white/60">Método:</span>
                    <span className="text-white ml-2">{getPaymentMethodLabel(order.payment_method)}</span>
                  </div>

                  <div>
                    <span className="text-white/60">Status:</span>
                    <span className={`ml-2 inline-flex items-center justify-center min-w-[110px] px-2.5 py-1 rounded-full text-xs font-medium border ${getPaymentStatusBadgeClass(order.payment_status)}`}>
                      {getPaymentStatusLabel(order.payment_status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {order.status === 'pending' && (
                <div className="bg-black-800 border border-gem-purple/20 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gem-purple/20">
                    <h2 className="text-lg font-semibold text-white">Ações</h2>
                  </div>

                  <div className="p-4">
                    <button
                      onClick={handleCancelOrder}
                      disabled={cancelLoading}
                      className="w-full px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-md hover:bg-red-500/30 transition-colors"
                    >
                      {cancelLoading ? (
                        <span className="flex items-center justify-center">
                          <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-current rounded-full"></span>
                          Cancelando...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <XCircle size={16} className="mr-2" />
                          Cancelar Pedido
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </MarketplaceLayout>
  );
};

export default OrderDetail;
