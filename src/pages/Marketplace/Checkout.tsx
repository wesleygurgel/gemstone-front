import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CreditCard, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import Breadcrumb from '@/components/marketplace/Breadcrumb';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import orderService from '@/services/orderService';
import { CreateOrderRequest, PaymentMethod } from '@/types/api';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, loading: cartLoading, clearCart } = useCart();
  const { showToast } = useToast();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation

  // Form state
  const [formData, setFormData] = useState<CreateOrderRequest>({
    shipping_address: '',
    shipping_city: '',
    shipping_state: '',
    shipping_country: 'Brasil',
    shipping_postal_code: '',
    shipping_phone: '',
    payment_method: 'credit_card',
  });

  // Pre-fill form with user data if available
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

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartLoading && (!cart || !cart.items || cart.items.length === 0)) {
      showToast('Seu carrinho está vazio', 'error');
      navigate('/marketplace');
    }
  }, [cart, cartLoading, navigate, showToast]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setFormData(prevData => ({
      ...prevData,
      payment_method: method,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      // Validate shipping information
      if (!formData.shipping_address || !formData.shipping_city || !formData.shipping_state || 
          !formData.shipping_postal_code || !formData.shipping_phone) {
        showToast('Por favor, preencha todos os campos de endereço', 'error');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Create order
      try {
        setLoading(true);
        const order = await orderService.createOrder(formData);
        await clearCart();
        showToast('Pedido realizado com sucesso!', 'success');
        setStep(3);
        // Navigate to order details after a delay
        setTimeout(() => {
          navigate(`/marketplace/orders/${order.id}`);
        }, 3000);
      } catch (error) {
        console.error('Failed to create order:', error);
        showToast('Erro ao criar pedido. Por favor, tente novamente.', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <MarketplaceLayout>
      <Helmet>
        <title>Checkout - Gemstone</title>
        <meta name="description" content="Complete sua compra na Gemstone" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-4">
          <Breadcrumb 
            items={[
              { label: 'Marketplace', path: '/marketplace', isLast: false },
              { label: 'Checkout', path: '/checkout', isLast: true }
            ]}
          />
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gem-pink via-gem-purple to-gem-blue bg-clip-text text-transparent">
            Checkout
          </h1>
          <p className="text-white/70">
            Complete sua compra em poucos passos
          </p>
        </div>

        {/* Checkout steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-gem-purple' : 'bg-black-800 border border-gem-purple/30'}`}>
              <span className="text-white font-medium">1</span>
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-gem-purple' : 'bg-black-800'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-gem-purple' : 'bg-black-800 border border-gem-purple/30'}`}>
              <span className="text-white font-medium">2</span>
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-gem-purple' : 'bg-black-800'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-gem-purple' : 'bg-black-800 border border-gem-purple/30'}`}>
              <span className="text-white font-medium">3</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-3xl mx-auto">
          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <div className="bg-black-800 border border-gem-purple/20 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <Truck className="text-gem-purple mr-2" size={24} />
                <h2 className="text-xl font-semibold text-white">Informações de Entrega</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="col-span-2">
                    <label htmlFor="shipping_address" className="block text-white/80 mb-1">Endereço</label>
                    <input
                      type="text"
                      id="shipping_address"
                      name="shipping_address"
                      value={formData.shipping_address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black-900 border border-gem-purple/30 rounded-md text-white focus:border-gem-purple focus:outline-none"
                      placeholder="Rua, número, complemento"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="shipping_city" className="block text-white/80 mb-1">Cidade</label>
                    <input
                      type="text"
                      id="shipping_city"
                      name="shipping_city"
                      value={formData.shipping_city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black-900 border border-gem-purple/30 rounded-md text-white focus:border-gem-purple focus:outline-none"
                      placeholder="Sua cidade"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="shipping_state" className="block text-white/80 mb-1">Estado</label>
                    <input
                      type="text"
                      id="shipping_state"
                      name="shipping_state"
                      value={formData.shipping_state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black-900 border border-gem-purple/30 rounded-md text-white focus:border-gem-purple focus:outline-none"
                      placeholder="Seu estado"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="shipping_postal_code" className="block text-white/80 mb-1">CEP</label>
                    <input
                      type="text"
                      id="shipping_postal_code"
                      name="shipping_postal_code"
                      value={formData.shipping_postal_code}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black-900 border border-gem-purple/30 rounded-md text-white focus:border-gem-purple focus:outline-none"
                      placeholder="00000-000"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="shipping_phone" className="block text-white/80 mb-1">Telefone</label>
                    <input
                      type="tel"
                      id="shipping_phone"
                      name="shipping_phone"
                      value={formData.shipping_phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-black-900 border border-gem-purple/30 rounded-md text-white focus:border-gem-purple focus:outline-none"
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
                  >
                    Continuar para Pagamento
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Payment Information */}
          {step === 2 && (
            <div className="bg-black-800 border border-gem-purple/20 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <CreditCard className="text-gem-purple mr-2" size={24} />
                <h2 className="text-xl font-semibold text-white">Informações de Pagamento</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-white/80 mb-2">Método de Pagamento</label>

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
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          formData.payment_method === 'credit_card' ? 'border-gem-purple' : 'border-white/30'
                        }`}>
                          {formData.payment_method === 'credit_card' && (
                            <div className="w-3 h-3 rounded-full bg-gem-purple"></div>
                          )}
                        </div>
                        <span className="text-white">Cartão de Crédito</span>
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
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          formData.payment_method === 'debit_card' ? 'border-gem-purple' : 'border-white/30'
                        }`}>
                          {formData.payment_method === 'debit_card' && (
                            <div className="w-3 h-3 rounded-full bg-gem-purple"></div>
                          )}
                        </div>
                        <span className="text-white">Cartão de Débito</span>
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
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          formData.payment_method === 'bank_transfer' ? 'border-gem-purple' : 'border-white/30'
                        }`}>
                          {formData.payment_method === 'bank_transfer' && (
                            <div className="w-3 h-3 rounded-full bg-gem-purple"></div>
                          )}
                        </div>
                        <span className="text-white">Transferência Bancária</span>
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
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          formData.payment_method === 'paypal' ? 'border-gem-purple' : 'border-white/30'
                        }`}>
                          {formData.payment_method === 'paypal' && (
                            <div className="w-3 h-3 rounded-full bg-gem-purple"></div>
                          )}
                        </div>
                        <span className="text-white">PayPal</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border border-gem-purple/20 rounded-lg p-4 mb-6 bg-black-900">
                  <h3 className="text-lg font-semibold text-white mb-3">Resumo do Pedido</h3>

                  <div className="space-y-2 mb-4">
                    {cart?.items.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-white/80">
                          {item.product_details.name} x {item.quantity}
                        </span>
                        <span className="text-white">R$ {parseFloat(item.total_price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gem-purple/20 pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span className="text-white">Total</span>
                      <span className="bg-gradient-to-r from-gem-purple to-gem-pink bg-clip-text text-transparent">
                        R$ {cart ? parseFloat(cart.total_price).toFixed(2) : '0.00'}
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
                    Voltar
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-gem-purple to-gem-blue text-white rounded-md hover:shadow-neon-purple transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                        Processando...
                      </span>
                    ) : (
                      'Finalizar Pedido'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="bg-black-800 border border-gem-purple/20 rounded-lg p-6 mb-6 text-center">
              <div className="flex flex-col items-center mb-6">
                <CheckCircle className="text-gem-purple mb-4" size={64} />
                <h2 className="text-2xl font-semibold text-white mb-2">Pedido Realizado com Sucesso!</h2>
                <p className="text-white/70">
                  Seu pedido foi recebido e está sendo processado.
                </p>
              </div>

              <div className="animate-pulse mb-6">
                <p className="text-white/80">
                  Redirecionando para os detalhes do pedido...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MarketplaceLayout>
  );
};

export default Checkout;
