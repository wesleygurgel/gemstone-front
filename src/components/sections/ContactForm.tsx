import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { Send } from 'lucide-react';
import { COMPANY_FULL_NAME } from '../../utils/env';

const ContactForm = () => {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ type: 'error', message: t('contact.form.status_error_fields') });
      return;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormData({ name: '', email: '', company: '', message: '' });
      setFormStatus({ type: 'success', message: t('contact.form.status_success') });
    } catch (error) {
      setFormStatus({ type: 'error', message: t('contact.form.status_error_general') });
    }
  };

  return (
    <section id="contact" className="py-20 bg-black-800 relative overflow-hidden">
      {/* Fundo decorativo */}
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 /* ... */>
              <Trans i18nKey="contact.title" values={{ company: COMPANY_FULL_NAME }} />
            </motion.h2>
            <motion.p /* ... */>
              {t('contact.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div /* ... */>
              <a href="..." /* ... */>
                <div className="relative flex flex-col h-full">
                  <div className="bg-gradient-to-r from-gem-pink to-gem-purple text-white p-6 flex items-center">
                    <h3 className="text-xl font-bold">{t('contact.address_title')}</h3>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-center items-center text-center">
                    <p className="text-white/90 text-lg mb-1">{t('contact.address_line1')}</p>
                    <p className="text-white/90 text-lg mb-1">{t('contact.address_line2')}</p>
                    <p className="text-white/90 text-lg">{t('contact.address_line3')}</p>
                  </div>
                  <div className="p-4 ...">
                    {t('contact.view_map')}
                  </div>
                </div>
              </a>
            </motion.div>

            <motion.div /* ... */>
              <a href="..." /* ... */>
                <div className="relative flex flex-col h-full">
                  <div className="bg-gradient-to-r from-gem-blue to-gem-cyan ...">
                    <h3 className="text-xl font-bold">{t('contact.email_title')}</h3>
                  </div>
                  <div className="p-6 ...">
                    <p className="text-white/90 text-xl font-medium">contact@gemstonemiami.com</p>
                    <p className="text-white/60 mt-2">{t('contact.email_response')}</p>
                  </div>
                  <div className="p-4 ...">
                    {t('contact.send_email')}
                  </div>
                </div>
              </a>
            </motion.div>
          </div>

          <motion.div /* ... */>
            <iframe /* ... */></iframe>
          </motion.div>

          <motion.div /* ... */>
            <div className="relative">
              {formStatus.type && (
                <div className={`mb-6 p-4 rounded-lg ${formStatus.type === 'success' ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
                  {formStatus.message}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">{t('contact.form.name_label')}</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="..." placeholder={t('contact.form.name_placeholder')} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">{t('contact.form.email_label')}</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="..." placeholder={t('contact.form.email_placeholder')} />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="company" className="block text-white mb-2">{t('contact.form.company_label')}</label>
                  <input type="text" id="company" name="company" value={formData.company || ''} onChange={handleChange} className="..." placeholder={t('contact.form.company_placeholder')} />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-white mb-2">{t('contact.form.message_label')}</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className="..." placeholder={t('contact.form.message_placeholder')}></textarea>
                </div>
                <button type="submit" className="...">
                  <Send size={18} className="mr-2" />
                  {t('contact.form.submit_button')}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;