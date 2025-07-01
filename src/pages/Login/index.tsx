import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { LoginRequest } from '@/types/api';
import MainLayout from '@/components/layout/MainLayout';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(formData);
    if (success) {
      navigate('/marketplace');
    }
    // If login fails, we stay on the page and the error will be displayed
    // No need to do anything else as the error state is already set by the login function
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Login - Gemstone</title>
        <meta name="description" content="Acesse sua conta na Gemstone para gerenciar suas operações de metais preciosos." />
      </Helmet>

      <section className="py-16 bg-gradient-to-b from-black-900 to-black-800 min-h-[calc(100vh-200px)] flex items-center">
        <div className="container max-w-md mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black-800 rounded-lg shadow-xl p-8 border border-gem-purple/20"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo de volta</h1>
              <p className="text-white/70">Acesse sua conta para continuar</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-900/20 border-l-4 border-red-500 text-red-400">
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-black-900 border border-gem-purple/30 text-white focus:ring-2 focus:ring-gem-purple focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-black-900 border border-gem-purple/30 text-white focus:ring-2 focus:ring-gem-purple focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-gem-purple to-gem-blue text-white py-3 px-4 rounded-lg font-medium hover:shadow-neon-purple transition-all focus:outline-none focus:ring-2 focus:ring-gem-purple focus:ring-offset-2 disabled:opacity-70"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/70">
                Não tem uma conta?{' '}
                <Link to="/register" className="text-gem-purple hover:text-gem-pink font-medium">
                  Registre-se
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Login;
