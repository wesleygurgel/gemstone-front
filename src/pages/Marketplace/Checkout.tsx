import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import Breadcrumb from '@/components/marketplace/Breadcrumb';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import orderService from '@/services/orderService';
import { CreateOrderRequest, PaymentMethod } from '@/types/api';
import { useTranslation, Trans } from 'react-i18next';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, loading: cartLoading, clearCart } = useCart();
  const { showToast } = useToast();
  const { user } = useAuth();
  const { t } = useTranslation('marketplace');

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const [formData, setFormData] = useState<CreateOrderRequest>({
    shipping_address: '',
    shipping_city: '',
    shipping_state: '',
    shipping_country: t('checkout.form.countryDefault', { defaultValue: 'Brazil' }),
    shipping_postal_code: '',
    shipping_phone: '',
    payment_method: 'credit_card',
  });

  useEffect(() => {
    if (user?.profile) {
      setFormData(prevData => ({
        ...prevData,
        shipping_address: user.profile.address || '',
        shipping_city: user.profile.city || '',
        shipping_state: user.profile.state || '',
        shipping_postal_code: user.profile.postal_code || '',
        shipping_phone: user.profile.phone_number || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!cartLoading && (!cart || !cart.items || cart.items.length === 0) && !isCheckingOut) {
      showToast(t('checkout.toasts.cartEmpty'), 'error');
      navigate('/marketplace');
    }
  }, [cart, cartLoading, navigate, showToast, isCheckingOut, t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setFormData(prevData => ({ ...prevData, payment_method: method }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (
        !formData.shipping_address ||
        !formData.shipping_city ||
        !formData.shipping_state ||
        !formData.shipping_postal_code ||
        !formData.shipping_phone
      ) {
        showToast(t('checkout.errors.addressRequired'), 'error');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      try {
        setIsCheckingOut(true);
        setLoading(true);

        const order = await orderService.createOrder(formData);
        const orderId = order.id;

        showToast(t('checkout.toasts.orderSuccess'), 'success');
        setStep(3);

        await clearCart();

        const orderIdForNavigation = orderId;

        setTimeout(() => {
          if (!orderIdForNavigation) {
            navigate('/marketplace/orders');
            return;
          }
          navigate(`/marketplace/orders/${orderIdForNavigation}`);
        }, 3000);
      } catch (error) {
        showToast(t('checkout.errors.orderFail'), 'error');
        setIsCheckingOut(false);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <MarketplaceLayout>
      <Helmet>
        <title>{t('checkout.meta.title')}</title>
        <meta name="description" content={t('checkout.meta.description')} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Breadcrumb
            items={[
              { label: t('breadcrumb.marketplace'), path: '/marketplace', isLast: false },
              { label: t('checkout.title'), path: '/checkout', isLast: true },
            ]}
          />
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gem-pink via-gem-purple to-gem-blue bg-clip-text text-transparent">
            {t('checkout.title')}
          </h1>
          <p className="text-white/70">{t('checkout.subtitle')}</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 1 ? 'bg-gem-purple' : 'bg-black-800 border border-gem-purple/30'
              }`}
            >
              <span className="text-white font-medium">1</span>
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-gem-purple' : 'bg-black-800'}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 2 ? 'bg-gem-purple' : 'bg-black-800 border border-gem-purple/30'
              }`}
            >
              <span className="text-white font-medium">2</span>
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-gem-purple' : 'bg-black-800'}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 3 ? 'bg-gem-purple' : 'bg-black-800 border border-gem-purple/30'
              }`}
            >
              <span className="text-white font-medium">3</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {step === 1 && (
            <div className="bg-black-800 border border-gem-purple/20 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <Truck className="text-gem-purple mr-2" size={24} />
                <h2 className="text-xl font-semibold text-white">{t('checkout.sections.shipping.title')}</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="col-span-2">
                    <label htmlFor="shipping_address" className="block text-white/80 mb-1">
                      {t('checkout.form.address')}
                    </label>
                    <input
                      type="text"
                      id="shipping_address"
                      name="shipping_address"
                      value={formData.shipping_address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black-900 border border-gem-purple/30 rounded-md text-white focus:border-gem-purple focus:outline-none"
                      placeholder={t('checkout.form.addressPlaceholder')}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="shipping_city" className="block text-white/80 mb-1">
                      {t('checkout.form.city')}
                    </label>
                    <input
                      type="text"
                      id="shipping_city"
                      name="shipping_city"
                      value={formData.shipping_city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black-900 border border-gem-purple/30 rounded-md text-white focus:border-gem-purple focus:outline-none"
                      placeholder={t('checkout.form.cityPlaceholder')}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="shipping_state" className="block text-white/80 mb-1">
                      {t('checkout.form.state')}
                    </label>
                    <input
                      type="text"
                      id="shipping_state"
                      name="shipping_state"
                      value={formData.shipping_state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black-900 border border-gem-purple/30 rounded-md text-white focus:border-gem-purple focus:outline-none"
                      placeholder={t('checkout.form.statePlaceholder')}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="shipping_postal_code" className="block text-white/80 mb-1">
                      {t('checkout.form.postalCode')}
                    </label>
                    <input
                      type="text"
                      id="shipping_postal_code"
                      name="shipping_postal_code"
                      value={formData.shipping_postal_code}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black-900 border border-gem-purple/30 rounded-md text-white focus:border-gem-purple focus:outline-none"
                      placeholder={t('checkout.form.postalCodePlaceholder')}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="shipping_phone" className="block text-white/80 mb-1">
                      {t('checkout.form.phone')}
                    </label>
                    <input
                      type="tel"
                      id="shipping_phone"
                      name="shipping_phone"
                      value={formData.shipping_phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black-900 border border-gem-purple/30 rounded-md text-white focus:border-gem-purple focus:outline-none"
                      placeholder={t('checkout.form.phonePlaceholder')}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
                  >
                    {t('checkout.buttons.continueToPayment')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="bg-black-800 border border-gem-purple/20 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <CreditCard className="text-gem-purple mr-2" size={24} />
                <h2 className="text-xl font-semibold text-white">{t('checkout.sections.payment.title')}</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-white/80 mb-2">{t('checkout.sections.payment.method')}</label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`p-4 border rounded-md cursor-pointer transition-colors ${
                        formData.payment_method === 'credit_card'
                          ? 'border-gem-purple bg-black-700'
                          : 'border-gem-purple/30 bg-black-900 hover:bg-black-700'
                      }`}
                      onClick={() => handlePaymentMethodChange('credit_card')}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            formData.payment_method === 'credit_card' ? 'border-gem-purple' : 'border-white/30'
                          }`}
                        >
                          {formData.payment_method === 'credit_card' && (
                            <div className="w-3 h-3 rounded-full bg-gem-purple"></div>
                          )}
                        </div>
                        <span className="text-white">{t('checkout.paymentMethods.creditCard')}</span>
                      </div>
                    </div>

                    <div
                      className={`p-4 border rounded-md cursor-pointer transition-colors ${
                        formData.payment_method === 'debit_card'
                          ? 'border-gem-purple bg-black-700'
                          : 'border-gem-purple/30 bg-black-900 hover:bg-black-700'
                      }`}
                      onClick={() => handlePaymentMethodChange('debit_card')}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            formData.payment_method === 'debit_card' ? 'border-gem-purple' : 'border-white/30'
                          }`}
                        >
                          {formData.payment_method === 'debit_card' && (
                            <div className="w-3 h-3 rounded-full bg-gem-purple"></div>
                          )}
                        </div>
                        <span className="text-white">{t('checkout.paymentMethods.debitCard')}</span>
                      </div>
                    </div>

                    <div
                      className={`p-4 border rounded-md cursor-pointer transition-colors ${
                        formData.payment_method === 'bank_transfer'
                          ? 'border-gem-purple bg-black-700'
                          : 'border-gem-purple/30 bg-black-900 hover:bg-black-700'
                      }`}
                      onClick={() => handlePaymentMethodChange('bank_transfer')}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            formData.payment_method === 'bank_transfer' ? 'border-gem-purple' : 'border-white/30'
                          }`}
                        >
                          {formData.payment_method === 'bank_transfer' && (
                            <div className="w-3 h-3 rounded-full bg-gem-purple"></div>
                          )}
                        </div>
                        <span className="text-white">{t('checkout.paymentMethods.bankTransfer')}</span>
                      </div>
                    </div>

                    <div
                      className={`p-4 border rounded-md cursor-pointer transition-colors ${
                        formData.payment_method === 'paypal'
                          ? 'border-gem-purple bg-black-700'
                          : 'border-gem-purple/30 bg-black-900 hover:bg-black-700'
                      }`}
                      onClick={() => handlePaymentMethodChange('paypal')}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            formData.payment_method === 'paypal' ? 'border-gem-purple' : 'border-white/30'
                          }`}
                        >
                          {formData.payment_method === 'paypal' && (
                            <div className="w-3 h-3 rounded-full bg-gem-purple"></div>
                          )}
                        </div>
                        <span className="text-white">{t('checkout.paymentMethods.paypal')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gem-purple/20 rounded-lg p-4 mb-6 bg-black-900">
                  <h3 className="text-lg font-semibold text-white mb-3">{t('checkout.summary.title')}</h3>

                  <div className="space-y-2 mb-4">
                    {cart?.items.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-white/80">
                          <Trans
                            i18nKey="checkout.summary.itemLine"
                            values={{ name: item.product_details.name, qty: item.quantity }}
                            defaultValue="{{name}} x {{qty}}"
                          />
                        </span>
                        <span className="text-white">
                          <Trans
                            i18nKey="checkout.summary.currencyLine"
                            values={{ value: parseFloat(item.total_price).toFixed(2) }}
                            defaultValue="R$ {{value}}"
                          />
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gem-purple/20 pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span className="text-white">{t('checkout.summary.total')}</span>
                      <span className="bg-gradient-to-r from-gem-purple to-gem-pink bg-clip-text text-transparent">
                        <Trans
                          i18nKey="checkout.summary.currencyLine"
                          values={{ value: cart ? parseFloat(cart.total_price).toFixed(2) : '0.00' }}
                          defaultValue="R$ {{value}}"
                        />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-2 bg-black-700 text-white/80 rounded-md hover:text-white transition-colors"
                  >
                    {t('checkout.buttons.back')}
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                        {t('checkout.buttons.processing')}
                      </span>
                    ) : (
                      t('checkout.buttons.finishOrder')
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="bg-black-800 border border-gem-purple/20 rounded-lg p-6 mb-6 text-center">
              <div className="flex flex-col items-center mb-6">
                <CheckCircle className="text-gem-purple mb-4" size={64} />
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {t('checkout.confirmation.title')}
                </h2>
                <p className="text-white/70">{t('checkout.confirmation.subtitle')}</p>
              </div>

              <div className="animate-pulse mb-6">
                <p className="text-white/80">{t('checkout.confirmation.redirect')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MarketplaceLayout>
  );
};

export default Checkout;
