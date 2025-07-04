import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Package, ChevronRight, Filter, Search, AlertCircle } from 'lucide-react';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import Breadcrumb from '@/components/marketplace/Breadcrumb';
import { useToast } from '@/context/ToastContext';
import orderService from '@/services/orderService';
import { OrderDetail, OrderStatus, PaymentStatus } from '@/types/api';

const OrderList: React.FC = () => {
  const { showToast } = useToast();

  // State
  const [orders, setOrders] = useState<OrderDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<PaymentStatus | ''>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        // Create filter params
        const params: any = {};
        if (statusFilter) params.status = statusFilter;
        if (paymentStatusFilter) params.payment_status = paymentStatusFilter;

        const response = await orderService.getUserOrders(params);
        setOrders(response);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setError('Falha ao carregar pedidos. Por favor, tente novamente.');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [statusFilter, paymentStatusFilter]);

  // Handle filter changes
  const handleFilterChange = () => {
    setIsFilterOpen(false);
  };

  // Handle filter reset
  const handleFilterReset = () => {
    setStatusFilter('');
    setPaymentStatusFilter('');
    setIsFilterOpen(false);
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
  const getStatusBadgeClass = (status: OrderStatus) => {
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
  const getPaymentStatusBadgeClass = (status: PaymentStatus) => {
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
  const getStatusLabel = (status: OrderStatus) => {
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
  const getPaymentStatusLabel = (status: PaymentStatus) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'processing':
        return 'Processando';
      case 'paid':
        return 'Pago';
      case 'failed':
        return 'Falhou';
      case 'refunded':
        return 'Reembolsado';
      default:
        return status;
    }
  };

  return (
    <MarketplaceLayout>
      <Helmet>
        <title>Meus Pedidos - Gemstone</title>
        <meta name="description" content="Acompanhe seus pedidos na Gemstone" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb 
            items={[
              { label: 'Marketplace', path: '/marketplace', isLast: false },
              { label: 'Meus Pedidos', path: '/marketplace/orders', isLast: true }
            ]}
          />
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gem-pink via-gem-purple to-gem-blue bg-clip-text text-transparent">
            Meus Pedidos
          </h1>
          <p className="text-white/70">
            Acompanhe o status dos seus pedidos
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Histórico de Pedidos</h2>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center px-3 py-2 bg-black-800 rounded-lg border border-gem-purple/20 text-white/90 hover:text-gem-purple transition-colors"
            >
              <Filter size={18} className="mr-2" />
              Filtros
            </button>
          </div>

          {/* Filter panel */}
          {isFilterOpen && (
            <div className="bg-black-800 border border-gem-purple/20 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="statusFilter" className="block text-white/80 mb-1">Status do Pedido</label>
                  <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as OrderStatus | '')}
                    className="w-full px-4 py-2 bg-black-900 border border-gem-purple/30 rounded-md text-white focus:border-gem-purple focus:outline-none"
                  >
                    <option value="">Todos</option>
                    <option value="pending">Pendente</option>
                    <option value="processing">Processando</option>
                    <option value="shipped">Enviado</option>
                    <option value="delivered">Entregue</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="paymentStatusFilter" className="block text-white/80 mb-1">Status do Pagamento</label>
                  <select
                    id="paymentStatusFilter"
                    value={paymentStatusFilter}
                    onChange={(e) => setPaymentStatusFilter(e.target.value as PaymentStatus | '')}
                    className="w-full px-4 py-2 bg-black-900 border border-gem-purple/30 rounded-md text-white focus:border-gem-purple focus:outline-none"
                  >
                    <option value="">Todos</option>
                    <option value="pending">Pendente</option>
                    <option value="processing">Processando</option>
                    <option value="completed">Concluído</option>
                    <option value="failed">Falhou</option>
                    <option value="refunded">Reembolsado</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={handleFilterReset}
                  className="px-4 py-2 bg-black-700 text-white/80 rounded-md hover:text-white transition-colors"
                >
                  Limpar
                </button>

                <button
                  onClick={handleFilterChange}
                  className="px-4 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
                >
                  Aplicar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Orders list */}
        <div className="bg-black-800 border border-gem-purple/20 rounded-lg overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gem-purple"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <AlertCircle size={48} className="text-gem-pink mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">{error}</h3>
              <p className="text-white/60 mb-6">Não foi possível carregar seus pedidos.</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
              >
                Tentar Novamente
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Package size={48} className="text-gem-purple/30 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Nenhum pedido encontrado</h3>
              <p className="text-white/60 mb-6">Você ainda não realizou nenhum pedido ou nenhum pedido corresponde aos filtros selecionados.</p>
              <Link 
                to="/marketplace"
                className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
              >
                Explorar Produtos
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Pedido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Pagamento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-white/60 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gem-purple/10">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-black-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-white font-medium">#{order.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-white/80">{formatDate(order.created_at)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center justify-center min-w-[110px] px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center justify-center min-w-[110px] px-2.5 py-1 rounded-full text-xs font-medium border ${getPaymentStatusBadgeClass(order.payment_status)}`}>
                          {getPaymentStatusLabel(order.payment_status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-white font-medium">R$ {formatCurrency(order.total_price)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Link
                          to={`/marketplace/orders/${order.id}`}
                          className="inline-flex items-center text-gem-purple hover:text-gem-pink transition-colors"
                        >
                          Detalhes
                          <ChevronRight size={16} className="ml-1" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MarketplaceLayout>
  );
};

export default OrderList;
