import { useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import { LoginRequest, RegisterRequest, UserProfile } from '../types/api';
import { handleApiError, getErrorMessage } from '../utils/errorHandler';

/**
 * Hook for authentication functionality
 */
export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load the current user if authenticated
   */
  const loadUser = useCallback(async () => {
    if (!authService.isAuthenticated()) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userData = await authService.getCurrentUser();
      setUser(userData);
      setError(null);
    } catch (err) {
      const handledError = handleApiError(err);
      setError(getErrorMessage(handledError));
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load user on initial mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  /**
   * Register a new user
   */
  const register = async (userData: RegisterRequest): Promise<boolean> => {
    try {
      setLoading(true);
      await authService.register(userData);
      setError(null);
      return true;
    } catch (err) {
      const handledError = handleApiError(err);
      setError(getErrorMessage(handledError));
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login a user
   */
  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      setLoading(true);
      const userData = await authService.login(credentials);
      setUser(userData);
      setError(null);
      return true;
    } catch (err) {
      const handledError = handleApiError(err);
      setError(getErrorMessage(handledError));
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout the current user
   */
  const logout = (): void => {
    authService.logout();
    setUser(null);
  };

  /**
   * Update the user's profile
   */
  const updateProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
    try {
      setLoading(true);
      const updatedUser = await authService.updateProfile(profileData);
      setUser(updatedUser);
      setError(null);
      return true;
    } catch (err) {
      const handledError = handleApiError(err);
      setError(getErrorMessage(handledError));
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Change the user's password
   */
  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      setLoading(true);
      await authService.changePassword(oldPassword, newPassword);
      setError(null);
      return true;
    } catch (err) {
      const handledError = handleApiError(err);
      setError(getErrorMessage(handledError));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    loadUser,
  };
};