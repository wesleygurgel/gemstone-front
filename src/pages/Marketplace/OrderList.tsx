// src/pages/marketplace/OrderList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Package, ChevronRight, Filter, AlertCircle } from 'lucide-react';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import Breadcrumb from '@/components/marketplace/Breadcrumb';
import orderService from '@/services/orderService';
import { OrderDetail, OrderStatus, PaymentStatus } from '@/types/api';
import { useTranslation } from 'react-i18next';

const OrderList: React.FC = () => {
  const { t } = useTranslation('marketplace');

  const [orders, setOrders] = useState<OrderDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<PaymentStatus | ''>('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const params: any = {};
        if (statusFilter) params.status = statusFilter;
        if (paymentStatusFilter) params.payment_status = paymentStatusFilter;

        const response = await orderService.getUserOrders(params);
        setOrders(response);
        setError(null);
      } catch {
        setError(t('orderList.errors.load'));
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [statusFilter, paymentStatusFilter, t]);

  const handleFilterReset = () => {
    setStatusFilter('');
    setPaymentStatusFilter('');
    setIsFilterOpen(false);
  };

  const formatDate = (d: string) =>
    new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(d));

  const formatCurrency = (v: string | number) =>
    (typeof v === 'string' ? parseFloat(v) : v).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

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

  const getPaymentStatusBadgeClass = (status: PaymentStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'processing':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'paid':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'refunded':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <MarketplaceLayout>
      <Helmet>
        <title>{t('orderList.meta.title')} - Gemstone</title>
        <meta name="description" content={t('orderList.meta.description')} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb
            items={[
              { label: t('breadcrumb.marketplace'), path: '/marketplace', isLast: false },
              { label: t('breadcrumb.myOrders'), path: '/marketplace/orders', isLast: true },
            ]}
          />
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gem-pink via-gem-purple to-gem-blue bg-clip-text text-transparent">
            {t('orderList.header.title')}
          </h1>
          <p className="text-white/70">{t('orderList.header.subtitle')}</p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">{t('orderList.history.title')}</h2>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center px-3 py-2 bg-black-800 rounded-lg border border-gem-purple/20 text-white/90 hover:text-gem-purple transition-colors"
            >
              <Filter size={18} className="mr-2" />
              {t('orderList.filters.title')}
            </button>
          </div>

          {isFilterOpen && (
            <div className="bg-black-800 border border-gem-purple/20 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="statusFilter" className="block text-white/80 mb-1">
                    {t('orderList.filters.orderStatus')}
                  </label>
                  <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as OrderStatus | '')}
                    className="w-full px-4 py-2 bg-black-900 border border-gem-purple/30 rounded-md text-white focus:border-gem-purple focus:outline-none"
                  >
                    <option value="">{t('orderList.filters.all')}</option>
                    <option value="pending">{t('order.status.pending')}</option>
                    <option value="processing">{t('order.status.processing')}</option>
                    <option value="shipped">{t('order.status.shipped')}</option>
                    <option value="delivered">{t('order.status.delivered')}</option>
                    <option value="cancelled">{t('order.status.cancelled')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="paymentStatusFilter" className="block text-white/80 mb-1">
                    {t('orderList.filters.paymentStatus')}
                  </label>
                  <select
                    id="paymentStatusFilter"
                    value={paymentStatusFilter}
                    onChange={(e) => setPaymentStatusFilter(e.target.value as PaymentStatus | '')}
                    className="w-full px-4 py-2 bg-black-900 border border-gem-purple/30 rounded-md text-white focus:border-gem-purple focus:outline-none"
                  >
                    <option value="">{t('orderList.filters.all')}</option>
                    <option value="pending">{t('order.paymentStatus.pending')}</option>
                    <option value="processing">{t('order.paymentStatus.processing')}</option>
                    <option value="paid">{t('order.paymentStatus.completed')}</option>
                    <option value="failed">{t('order.paymentStatus.failed')}</option>
                    <option value="refunded">{t('order.paymentStatus.refunded')}</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={handleFilterReset}
                  className="px-4 py-2 bg-black-700 text-white/80 rounded-md hover:text-white transition-colors"
                >
                  {t('common.clear')}
                </button>

                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="px-4 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
                >
                  {t('common.apply')}
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
              <p className="text-white/60 mb-6">{t('orderList.errors.subtitle')}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
              >
                {t('common.tryAgain')}
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Package size={48} className="text-gem-purple/30 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">
                {t('orderList.empty.title')}
              </h3>
              <p className="text-white/60 mb-6">{t('orderList.empty.subtitle')}</p>
              <Link
                to="/marketplace"
                className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
              >
                {t('orderList.empty.cta')}
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-black-700">
                  <tr>
                    {['id', 'date', 'status', 'payment', 'total', 'actions'].map((col) => (
                      <th
                        key={col}
                        className={`${
                          col === 'actions' ? 'text-right' : 'text-left'
                        } px-6 py-3 text-xs font-medium text-white/60 uppercase tracking-wider`}
                      >
                        {t(`orderList.table.${col}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gem-purple/10">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-black-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                        #{o.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white/80">
                        {formatDate(o.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center justify-center min-w-[110px] px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(
                            o.status,
                          )}`}
                        >
                          {t(`order.status.${o.status}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center justify-center min-w-[110px] px-2.5 py-1 rounded-full text-xs font-medium border ${getPaymentStatusBadgeClass(
                            o.payment_status,
                          )}`}
                        >
                          {t(`order.paymentStatus.${o.payment_status}`)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                        R$ {formatCurrency(o.total_price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Link
                          to={`/marketplace/orders/${o.id}`}
                          className="inline-flex items-center text-gem-purple hover:text-gem-pink transition-colors"
                        >
                          {t('common.details')}
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
