import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { RegisterRequest } from '@/types/api';
import MainLayout from '@/components/layout/MainLayout';

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState<RegisterRequest>({
    email: '',
    password: '',
    password_confirm: ''
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [validations, setValidations] = useState({
    length: false,
    notNumeric: false,
    notCommon: true, // Assume true until we check against common passwords
    notSimilarToEmail: true, // Assume true until we check against email
    passwordsMatch: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear password error when user types in password fields
    if (name === 'password' || name === 'password_confirm') {
      setPasswordError(null);
    }
  };

  // Check if password is common
  const isCommonPassword = (password: string): boolean => {
    const commonPasswords = [
      '123456', 'password', '12345678', 'qwerty', '123456789', 
      '12345', '1234', '111111', '1234567', 'dragon', 
      '123123', 'baseball', 'abc123', 'football', 'monkey', 
      'letmein', '696969', 'shadow', 'master', '666666', 
      'qwertyuiop', '123321', 'mustang', '1234567890', 'michael', 
      '654321', 'superman', '1qaz2wsx', '7777777', 'fuckyou', 
      '121212', '000000', 'qazwsx', '123qwe', 'killer', 
      'trustno1', 'jordan', 'jennifer', 'hunter', 'buster', 
      'soccer', 'harley', 'batman', 'andrew', 'tigger', 
      'sunshine', 'iloveyou', 'fuckme', '2000', 'charlie',
      'teste123', 'teste', 'admin', 'admin123'
    ];
    return commonPasswords.includes(password.toLowerCase());
  };

  // Check if password is similar to email
  const isSimilarToEmail = (password: string, email: string): boolean => {
    if (!email) return false;

    const emailParts = email.split('@')[0].toLowerCase();
    const passwordLower = password.toLowerCase();

    // Check if password contains email username or vice versa
    return emailParts.includes(passwordLower) || passwordLower.includes(emailParts);
  };

  // Check if password is entirely numeric
  const isEntirelyNumeric = (password: string): boolean => {
    return /^\d+$/.test(password);
  };

  // Validate password against all rules
  const validatePassword = (password: string, email: string, confirmPassword: string) => {
    setValidations({
      length: password.length >= 8,
      notNumeric: !isEntirelyNumeric(password),
      notCommon: !isCommonPassword(password),
      notSimilarToEmail: !isSimilarToEmail(password, email),
      passwordsMatch: password === confirmPassword
    });
  };

  // Validate password whenever form data changes
  useEffect(() => {
    validatePassword(formData.password, formData.email, formData.password_confirm);
  }, [formData.password, formData.email, formData.password_confirm]);

  const validateForm = (): boolean => {
    // Check all validations
    if (!validations.length) {
      setPasswordError('A senha deve ter pelo menos 8 caracteres');
      return false;
    }

    if (!validations.notNumeric) {
      setPasswordError('A senha não pode ser inteiramente numérica');
      return false;
    }

    if (!validations.notCommon) {
      setPasswordError('A senha é muito comum e fácil de adivinhar');
      return false;
    }

    if (!validations.notSimilarToEmail) {
      setPasswordError('A senha não pode ser similar ao seu email');
      return false;
    }

    if (!validations.passwordsMatch) {
      setPasswordError('As senhas não coincidem');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const success = await registerUser(formData);
    if (success) {
      navigate('/login');
    }
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Criar Conta - Gemstone</title>
        <meta name="description" content="Crie sua conta na Gemstone para acessar nossos serviços de metais preciosos." />
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
              <h1 className="text-3xl font-bold text-white mb-2">Crie sua conta</h1>
              <p className="text-white/70">Junte-se à Gemstone hoje</p>
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
                  minLength={8}
                />
                <div className="mt-2 space-y-1">
                  <p className={`text-sm ${validations.length ? 'text-green-400' : 'text-white/50'}`}>
                    {validations.length ? '✓' : '○'} Mínimo de 8 caracteres
                  </p>
                  <p className={`text-sm ${validations.notNumeric ? 'text-green-400' : 'text-white/50'}`}>
                    {validations.notNumeric ? '✓' : '○'} Não pode ser inteiramente numérica
                  </p>
                  <p className={`text-sm ${validations.notCommon ? 'text-green-400' : 'text-white/50'}`}>
                    {validations.notCommon ? '✓' : '○'} Não pode ser uma senha comum
                  </p>
                  <p className={`text-sm ${validations.notSimilarToEmail ? 'text-green-400' : 'text-white/50'}`}>
                    {validations.notSimilarToEmail ? '✓' : '○'} Não pode ser similar ao seu email
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="password_confirm" className="block text-sm font-medium text-white/80 mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="password_confirm"
                  name="password_confirm"
                  value={formData.password_confirm}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-black-900 border border-gem-purple/30 text-white focus:ring-2 focus:ring-gem-purple focus:border-transparent"
                  required
                />
                <p className={`mt-1 text-sm ${validations.passwordsMatch && formData.password_confirm ? 'text-green-400' : 'text-white/50'}`}>
                  {validations.passwordsMatch && formData.password_confirm ? '✓' : '○'} As senhas devem coincidir
                </p>
                {passwordError && (
                  <p className="mt-1 text-sm text-red-400">{passwordError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-gem-purple to-gem-blue text-white py-3 px-4 rounded-lg font-medium hover:shadow-neon-purple transition-all focus:outline-none focus:ring-2 focus:ring-gem-purple focus:ring-offset-2 disabled:opacity-70"
              >
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/70">
                Já tem uma conta?{' '}
                <Link 
                  to="/login" 
                  className="text-gem-purple hover:text-gem-pink font-medium"
                  onClick={clearError}
                >
                  Faça login
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Register;
