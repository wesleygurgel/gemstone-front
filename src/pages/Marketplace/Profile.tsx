import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { User, Mail, MapPin, Calendar, Edit, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MarketplaceLayout from '@/components/marketplace/MarketplaceLayout';
import Breadcrumb from '@/components/marketplace/Breadcrumb';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { UserProfileData } from '@/types/api/auth.types';

const Profile = () => {
  const { t } = useTranslation('marketplace');
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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return t('profile.notAvailable');
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { first_name, last_name, ...profileFields } = profileData;

      const success = await updateProfile({
        first_name,
        last_name,
        profile: profileFields as UserProfileData
      });

      if (success) {
        showToast(t('profile.toasts.updateSuccess'), 'success');
        setEditMode(false);
      } else {
        showToast(t('profile.toasts.updateError'), 'error');
      }
    } catch {
      showToast(t('profile.toasts.updateError'), 'error');
    } finally {
      setLoading(false);
    }
  };

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
            <p className="text-white/70">{t('profile.loading')}</p>
          </div>
        </div>
      </MarketplaceLayout>
    );
  }

  return (
    <MarketplaceLayout>
      <Helmet>
        <title>{t('profile.title')} | Gemstone Marketplace</title>
        <meta name="description" content={t('profile.metaDescription')} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <Breadcrumb
              items={[
                { label: t('breadcrumb.marketplace'), path: '/marketplace', isLast: false },
                { label: t('profile.breadcrumb'), path: '/marketplace/profile', isLast: true }
              ]}
            />
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gem-pink via-gem-purple to-gem-blue bg-clip-text text-transparent">
              {t('profile.title')}
            </h1>
            <p className="text-white/70">{t('profile.subtitle')}</p>
          </div>

          <div className="bg-black-800 border border-gem-purple/20 rounded-lg overflow-hidden shadow-lg mb-8">
            <div className="p-6 border-b border-gem-purple/20">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gem-pink to-gem-purple flex items-center justify-center text-white">
                  <User size={40} />
                </div>

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
                      <span className="text-sm text-white/60">
                        {t('profile.memberSince', { date: formatDate(user.profile.created_at) })}
                      </span>
                    </div>
                    {user.last_login && (
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-gem-blue" />
                        <span className="text-sm text-white/60">
                          {t('profile.lastLogin', { date: formatDate(user.last_login) })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 bg-gem-purple/20 hover:bg-gem-purple/30 text-white rounded-md flex items-center gap-2 transition-colors"
                  >
                    <Edit size={16} />
                    <span>{t('profile.actions.edit')}</span>
                  </button>
                )}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="text-gem-pink" />
                {t('profile.section.contact')}
              </h3>

              {editMode ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {['first_name', 'last_name', 'phone_number', 'address', 'city', 'state', 'country', 'postal_code'].map((field) => (
                      <div key={field}>
                        <label className="block text-white/70 mb-1 text-sm">
                          {t(`profile.fields.${field}.label`)}
                        </label>
                        <input
                          type="text"
                          name={field}
                          value={(profileData as any)[field]}
                          onChange={handleInputChange}
                          className="w-full bg-black-900 border border-gem-purple/30 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gem-purple/50"
                          placeholder={t(`profile.fields.${field}.placeholder`)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 bg-black-900 hover:bg-black-700 text-white/80 rounded-md flex items-center gap-2 transition-colors"
                      disabled={loading}
                    >
                      <X size={16} />
                      <span>{t('profile.actions.cancel')}</span>
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-gem-pink to-gem-purple hover:from-gem-purple hover:to-gem-pink text-white rounded-md flex items-center gap-2 transition-all"
                      disabled={loading}
                    >
                      <Save size={16} />
                      <span>{loading ? t('profile.actions.saving') : t('profile.actions.save')}</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['phone_number', 'address', 'city', 'state', 'country', 'postal_code'].map((field) => (
                    <div key={field}>
                      <h4 className="text-white/70 text-sm">
                        {t(`profile.fields.${field}.label`)}
                      </h4>
                      <p className="text-white">
                        {(user.profile as any)?.[field] || t('profile.notProvided')}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MarketplaceLayout>
  );
};

export default Profile;
