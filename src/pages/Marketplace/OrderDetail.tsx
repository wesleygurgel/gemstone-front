// src/pages/marketplace/OrderDetail.tsx
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
  XCircle,
} from 'lucide-react';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import Breadcrumb from '@/components/marketplace/Breadcrumb';
import { useToast } from '@/context/ToastContext';
import orderService from '@/services/orderService';
import { OrderDetail as OrderDetailType } from '@/types/api';
import { useTranslation } from 'react-i18next';

const OrderDetail: React.FC = () => {
  const { t } = useTranslation('marketplace'); // default language is English (see i18n config)
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [order, setOrder] = useState<OrderDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  // --- Helpers: formats ---
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Keep BR formatting for now to preserve UX expectation on prices/dates in marketplace
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return numValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // --- Helpers: status classes and labels (keep explicit blocks to avoid breaking UI) ---
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

  const getPaymentStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'processing':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'completed':
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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return t('order.status.pending');
      case 'processing':
        return t('order.status.processing');
      case 'shipped':
        return t('order.status.shipped');
      case 'delivered':
        return t('order.status.delivered');
      case 'cancelled':
        return t('order.status.cancelled');
      default:
        return status;
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return t('order.paymentStatus.pending');
      case 'processing':
        return t('order.paymentStatus.processing');
      case 'completed':
      case 'paid':
        return t('order.paymentStatus.completed');
      case 'failed':
        return t('order.paymentStatus.failed');
      case 'refunded':
        return t('order.paymentStatus.refunded');
      default:
        return status;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'credit_card':
        return t('order.paymentMethod.credit_card');
      case 'debit_card':
        return t('order.paymentMethod.debit_card');
      case 'bank_transfer':
        return t('order.paymentMethod.bank_transfer');
      case 'paypal':
        return t('order.paymentMethod.paypal');
      case 'other':
        return t('order.paymentMethod.other');
      default:
        return method;
    }
  };

  // --- Data load ---
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await orderService.getOrderDetails(parseInt(id));
        setOrder(response);
        setError(null);
      } catch (e) {
        setError(t('order.errors.loadDetails'));
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id, t]);

  // --- Cancel order ---
  const handleCancelOrder = async () => {
    if (!id || !order || order.status === 'cancelled') return;

    // confirm dialog
    // Keep string in i18n
    const confirmed = window.confirm(t('order.actions.confirmCancel'));
    if (!confirmed) return;

    try {
      setCancelLoading(true);
      await orderService.cancelOrder(parseInt(id));
      showToast(t('order.actions.cancelSuccess'), 'success');
      const updatedOrder = await orderService.getOrderDetails(parseInt(id));
      setOrder(updatedOrder);
    } catch (e) {
      showToast(t('order.actions.cancelFail'), 'error');
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <MarketplaceLayout>
      <Helmet>
        <title>
          {order
            ? `${t('order.pageTitleWithId', { id: order.id })}`
            : `${t('order.pageTitleGeneric')}`} - Gemstone
        </title>
        <meta name="description" content={t('order.meta.description')} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb
            items={[
              { label: t('breadcrumb.marketplace'), path: '/marketplace', isLast: false },
              { label: t('breadcrumb.myOrders'), path: '/marketplace/orders', isLast: false },
              {
                label: order
                  ? t('breadcrumb.orderDetailsId', { id: order.id })
                  : t('breadcrumb.orderDetails'),
                path: `/marketplace/orders/${id}`,
                isLast: true,
              },
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
            {t('order.backToOrders')}
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gem-pink via-gem-purple to-gem-blue bg-clip-text text-transparent">
            {order
              ? t('order.header.titleWithId', { id: order.id })
              : t('order.header.titleGeneric')}
          </h1>

          {order && (
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center text-white/70">
                <Clock size={16} className="mr-1 text-gem-purple" />
                {t('order.header.placedAt', { date: formatDate(order.created_at) })}
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center justify-center min-w-[120px] px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClass(
                    order.status,
                  )}`}
                >
                  {t('order.header.status')}: {getStatusLabel(order.status)}
                </span>

                <span
                  className={`inline-flex items-center justify-center min-w-[120px] px-2.5 py-1 rounded-full text-xs font-medium border ${getPaymentStatusBadgeClass(
                    order.payment_status,
                  )}`}
                >
                  {t('order.header.payment')}: {getPaymentStatusLabel(order.payment_status)}
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
            <p className="text-white/60 mb-6">{t('order.errors.loadDetailsHint')}</p>
            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
              >
                {t('common.tryAgain')}
              </button>

              <button
                onClick={() => navigate('/marketplace/orders')}
                className="px-6 py-2 bg-black-700 text-white/80 rounded-md hover:text-white transition-colors"
              >
                {t('order.backToOrders')}
              </button>
            </div>
          </div>
        ) : !order ? (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-black-800 border border-gem-purple/20 rounded-lg">
            <Package size={48} className="text-gem-purple/30 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">{t('order.empty.title')}</h3>
            <p className="text-white/60 mb-6">{t('order.empty.subtitle')}</p>
            <Link
              to="/marketplace/orders"
              className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
            >
              {t('order.backToOrders')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order items */}
            <div className="lg:col-span-2">
              <div className="bg-black-800 border border-gem-purple/20 rounded-lg overflow-hidden mb-6">
                <div className="p-4 border-b border-gem-purple/20 flex items-center">
                  <ShoppingBag className="text-gem-purple mr-2" size={20} />
                  <h2 className="text-lg font-semibold text-white">{t('order.items.title')}</h2>
                </div>

                <div className="p-4">
                  {order.items.length === 0 ? (
                    <div className="text-center py-6 text-white/60">
                      {t('order.items.empty')}
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
                                  alt={
                                    item.product_details.main_image.alt_text ||
                                    item.product_details.name
                                  }
                                  className="w-full h-full object-cover"
                                />
                              )}
                            </div>

                            {/* Product details */}
                            <div className="ml-4 flex-1">
                              <div className="flex justify-between">
                                <h3 className="text-white font-medium">
                                  {item.product_details.name}
                                </h3>
                                <span className="text-white font-medium">
                                  R$ {formatCurrency(item.total_price)}
                                </span>
                              </div>

                              <div className="mt-1 flex justify-between text-sm">
                                <div className="text-white/60">
                                  {t('order.items.quantity')}: {item.quantity}
                                </div>
                                <div className="text-white/60">
                                  R$ {formatCurrency(item.price)} {t('order.items.each')}
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
                    <span className="text-white">{t('order.summary.total')}</span>
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
                  <h2 className="text-lg font-semibold text-white">
                    {t('order.timeline.title')}
                  </h2>
                </div>

                <div className="p-4">
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gem-purple/20"></div>

                    {/* Step 1: Placed */}
                    <div className="relative pl-10 pb-6">
                      <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gem-purple flex items-center justify-center">
                        <Package size={16} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{t('order.timeline.placed')}</h3>
                        <p className="text-white/60 text-sm">{formatDate(order.created_at)}</p>
                      </div>
                    </div>

                    {/* Step 2: Payment */}
                    <div className="relative pl-10 pb-6">
                      <div
                        className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center ${
                          order.status !== 'pending'
                            ? 'bg-gem-purple'
                            : 'bg-black-700 border border-gem-purple/30'
                        }`}
                      >
                        <CreditCard
                          size={16}
                          className={
                            order.status !== 'pending' ? 'text-white' : 'text-white/60'
                          }
                        />
                      </div>
                      <div>
                        <h3
                          className={
                            order.status !== 'pending'
                              ? 'text-white font-medium'
                              : 'text-white/60 font-medium'
                          }
                        >
                          {t('order.timeline.payment')}{' '}
                          {getPaymentStatusLabel(order.payment_status).toLowerCase()}
                        </h3>
                        {/* <p className="text-white/60 text-sm">
                          {order.payment_status === 'paid' || order.payment_status === 'completed'
                            ? formatDate(order.updated_at)
                            : t('order.timeline.waiting')}
                        </p> */}
                        <p className="text-white/60 text-sm">
                          {['completed', 'paid'].includes(String(order.payment_status))
                            ? formatDate(order.updated_at)
                            : t('order.timeline.waiting')}
                        </p>

                      </div>
                    </div>

                    {/* Step 3: Shipped */}
                    <div className="relative pl-10 pb-6">
                      <div
                        className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center ${
                          order.status === 'shipped' || order.status === 'delivered'
                            ? 'bg-gem-purple'
                            : 'bg-black-700 border border-gem-purple/30'
                        }`}
                      >
                        <Truck
                          size={16}
                          className={
                            order.status === 'shipped' || order.status === 'delivered'
                              ? 'text-white'
                              : 'text-white/60'
                          }
                        />
                      </div>
                      <div>
                        <h3
                          className={
                            order.status === 'shipped' || order.status === 'delivered'
                              ? 'text-white font-medium'
                              : 'text-white/60 font-medium'
                          }
                        >
                          {order.status === 'shipped'
                            ? t('order.status.shipped')
                            : order.status === 'delivered'
                            ? t('order.status.shipped')
                            : t('order.timeline.waitingShipment')}
                        </h3>
                        <p className="text-white/60 text-sm">
                          {order.status === 'shipped' || order.status === 'delivered'
                            ? formatDate(order.updated_at)
                            : t('order.timeline.waiting')}
                        </p>
                      </div>
                    </div>

                    {/* Step 4: Delivered */}
                    <div className="relative pl-10">
                      <div
                        className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center ${
                          order.status === 'delivered'
                            ? 'bg-gem-purple'
                            : 'bg-black-700 border border-gem-purple/30'
                        }`}
                      >
                        <Package
                          size={16}
                          className={order.status === 'delivered' ? 'text-white' : 'text-white/60'}
                        />
                      </div>
                      <div>
                        <h3
                          className={
                            order.status === 'delivered'
                              ? 'text-white font-medium'
                              : 'text-white/60 font-medium'
                          }
                        >
                          {order.status === 'delivered'
                            ? t('order.status.delivered')
                            : t('order.timeline.waitingDelivery')}
                        </h3>
                        <p className="text-white/60 text-sm">
                          {order.status === 'delivered'
                            ? formatDate(order.updated_at)
                            : t('order.timeline.waitingSend')}
                        </p>
                      </div>
                    </div>

                    {/* Cancelled */}
                    {order.status === 'cancelled' && (
                      <div className="relative pl-10 mt-6 pt-6 border-t border-gem-purple/10">
                        <div className="absolute left-0 top-7 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                          <XCircle size={16} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-red-300 font-medium">{t('order.status.cancelled')}</h3>
                          <p className="text-white/60 text-sm">{formatDate(order.updated_at)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Shipping info */}
              <div className="bg-black-800 border border-gem-purple/20 rounded-lg overflow-hidden mb-6">
                <div className="p-4 border-b border-gem-purple/20 flex items-center">
                  <Truck className="text-gem-purple mr-2" size={20} />
                  <h2 className="text-lg font-semibold text-white">
                    {t('order.shipping.title')}
                  </h2>
                </div>

                <div className="p-4">
                  <div className="mb-4">
                    <div className="flex items-start">
                      <MapPin size={16} className="text-gem-purple mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-white">{order.shipping_address}</p>
                        <p className="text-white">
                          {order.shipping_city}, {order.shipping_state}
                        </p>
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

              {/* Payment info */}
              <div className="bg-black-800 border border-gem-purple/20 rounded-lg overflow-hidden mb-6">
                <div className="p-4 border-b border-gem-purple/20 flex items-center">
                  <CreditCard className="text-gem-purple mr-2" size={20} />
                  <h2 className="text-lg font-semibold text-white">
                    {t('order.payment.title')}
                  </h2>
                </div>

                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-white/60">{t('order.payment.method')}:</span>
                    <span className="text-white ml-2">
                      {getPaymentMethodLabel(order.payment_method)}
                    </span>
                  </div>

                  <div>
                    <span className="text-white/60">{t('order.payment.status')}:</span>
                    <span
                      className={`ml-2 inline-flex items-center justify-center min-w-[110px] px-2.5 py-1 rounded-full text-xs font-medium border ${getPaymentStatusBadgeClass(
                        order.payment_status,
                      )}`}
                    >
                      {getPaymentStatusLabel(order.payment_status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {order.status === 'pending' && (
                <div className="bg-black-800 border border-gem-purple/20 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gem-purple/20">
                    <h2 className="text-lg font-semibold text-white">
                      {t('order.actions.title')}
                    </h2>
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
                          {t('order.actions.cancelling')}
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <XCircle size={16} className="mr-2" />
                          {t('order.actions.cancelOrder')}
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
