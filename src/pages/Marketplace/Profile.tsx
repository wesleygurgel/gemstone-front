import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import Breadcrumb from '@/components/marketplace/Breadcrumb';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { UserProfile, UserProfileData } from '@/types/api/auth.types';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Initialize form with user data when available
  useEffect(() => {
    console.log('user: ', user)
    if (user && user.profile) {
      setProfileData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone_number: user.profile.phone_number || '',
        address: user.profile.address || '',
        city: user.profile.city || '',
        state: user.profile.state || '',
        country: user.profile.country || '',
        postal_code: user.profile.postal_code || '',
      });
    }
  }, [user]);

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Extract profile data and user data
      const { first_name, last_name, ...profileFields } = profileData;

      const success = await updateProfile({
        first_name,
        last_name,
        profile: profileFields as UserProfileData
      });

      if (success) {
        showToast('Perfil atualizado com sucesso!', 'success');
        setEditMode(false);
      } else {
        showToast('Erro ao atualizar perfil. Tente novamente.', 'error');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      showToast('Erro ao atualizar perfil. Tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Cancel edit mode
  const handleCancel = () => {
    if (user && user.profile) {
      setProfileData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone_number: user.profile.phone_number || '',
        address: user.profile.address || '',
        city: user.profile.city || '',
        state: user.profile.state || '',
        country: user.profile.country || '',
        postal_code: user.profile.postal_code || '',
      });
    }
    setEditMode(false);
  };

  if (!user) {
    return (
      <MarketplaceLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-white/70">Carregando perfil...</p>
          </div>
        </div>
      </MarketplaceLayout>
    );
  }

  return (
    <MarketplaceLayout>
      <Helmet>
        <title>Meu Perfil | Gemstone Marketplace</title>
        <meta name="description" content="Gerencie suas informações de perfil no Gemstone Marketplace" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-4">
            <Breadcrumb items={[
              {
                label: 'Marketplace',
                path: '/marketplace',
                isLast: false
              },
              {
                label: 'Profile',
                path: '/marketplace/profile',
                isLast: true
              }
            ]} />
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gem-pink via-gem-purple to-gem-blue bg-clip-text text-transparent">
              Meu Perfil
            </h1>
            <p className="text-white/70">
              Gerencie suas informações pessoais e endereço
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-black-800 border border-gem-purple/20 rounded-lg overflow-hidden shadow-lg mb-8">
            {/* User Info Section */}
            <div className="p-6 border-b border-gem-purple/20">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gem-pink to-gem-purple flex items-center justify-center text-white">
                  <User size={40} />
                </div>

                {/* Basic Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {user.first_name} {user.last_name}
                  </h2>
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    <Mail size={16} className="text-gem-purple" />
                    <span className="text-white/80">{user.email}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-gem-pink" />
                      <span className="text-sm text-white/60">Membro desde {formatDate(user.profile.created_at)}</span>
                    </div>
                    {user.last_login && (
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-gem-blue" />
                        <span className="text-sm text-white/60">Último acesso {formatDate(user.last_login)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Edit Button */}
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 bg-gem-purple/20 hover:bg-gem-purple/30 text-white rounded-md flex items-center gap-2 transition-colors"
                  >
                    <Edit size={16} />
                    <span>Editar</span>
                  </button>
                )}
              </div>
            </div>

            {/* Profile Details Section */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="text-gem-pink" />
                Informações de Contato e Endereço
              </h3>

              {editMode ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">Nome</label>
                      <input
                        type="text"
                        name="first_name"
                        value={profileData.first_name}
                        onChange={handleInputChange}
                        className="w-full bg-black-900 border border-gem-purple/30 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gem-purple/50"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">Sobrenome</label>
                      <input
                        type="text"
                        name="last_name"
                        value={profileData.last_name}
                        onChange={handleInputChange}
                        className="w-full bg-black-900 border border-gem-purple/30 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gem-purple/50"
                        placeholder="Seu sobrenome"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">Telefone</label>
                      <input
                        type="text"
                        name="phone_number"
                        value={profileData.phone_number}
                        onChange={handleInputChange}
                        className="w-full bg-black-900 border border-gem-purple/30 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gem-purple/50"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">Endereço</label>
                      <input
                        type="text"
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                        className="w-full bg-black-900 border border-gem-purple/30 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gem-purple/50"
                        placeholder="Rua, número, complemento"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">Cidade</label>
                      <input
                        type="text"
                        name="city"
                        value={profileData.city}
                        onChange={handleInputChange}
                        className="w-full bg-black-900 border border-gem-purple/30 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gem-purple/50"
                        placeholder="Sua cidade"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">Estado</label>
                      <input
                        type="text"
                        name="state"
                        value={profileData.state}
                        onChange={handleInputChange}
                        className="w-full bg-black-900 border border-gem-purple/30 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gem-purple/50"
                        placeholder="Seu estado"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">País</label>
                      <input
                        type="text"
                        name="country"
                        value={profileData.country}
                        onChange={handleInputChange}
                        className="w-full bg-black-900 border border-gem-purple/30 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gem-purple/50"
                        placeholder="Seu país"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">CEP</label>
                      <input
                        type="text"
                        name="postal_code"
                        value={profileData.postal_code}
                        onChange={handleInputChange}
                        className="w-full bg-black-900 border border-gem-purple/30 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gem-purple/50"
                        placeholder="00000-000"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 bg-black-900 hover:bg-black-700 text-white/80 rounded-md flex items-center gap-2 transition-colors"
                      disabled={loading}
                    >
                      <X size={16} />
                      <span>Cancelar</span>
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-gem-pink to-gem-purple hover:from-gem-purple hover:to-gem-pink text-white rounded-md flex items-center gap-2 transition-all"
                      disabled={loading}
                    >
                      <Save size={16} />
                      <span>{loading ? 'Salvando...' : 'Salvar Alterações'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white/70 text-sm">Telefone</h4>
                    <p className="text-white">{user.profile?.phone_number || 'Não informado'}</p>
                  </div>
                  <div>
                    <h4 className="text-white/70 text-sm">Endereço</h4>
                    <p className="text-white">{user.profile?.address || 'Não informado'}</p>
                  </div>
                  <div>
                    <h4 className="text-white/70 text-sm">Cidade</h4>
                    <p className="text-white">{user.profile?.city || 'Não informado'}</p>
                  </div>
                  <div>
                    <h4 className="text-white/70 text-sm">Estado</h4>
                    <p className="text-white">{user.profile?.state || 'Não informado'}</p>
                  </div>
                  <div>
                    <h4 className="text-white/70 text-sm">País</h4>
                    <p className="text-white">{user.profile?.country || 'Não informado'}</p>
                  </div>
                  <div>
                    <h4 className="text-white/70 text-sm">CEP</h4>
                    <p className="text-white">{user.profile?.postal_code || 'Não informado'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional sections could be added here, such as:
           * - Order history
           * - Saved payment methods
           * - Wishlist
           * - Security settings
           */}
        </div>
      </div>
    </MarketplaceLayout>
  );
};

export default Profile;
