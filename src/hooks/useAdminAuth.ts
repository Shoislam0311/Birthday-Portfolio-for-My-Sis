import { useState, useEffect, useCallback } from 'react';
import { fetchSetting } from '@/lib/api';
import { siteConfig } from '@/config/site.config';

const SESSION_KEY = 'admin_authenticated';

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    setIsAuthenticated(stored === 'true');
    setChecking(false);
  }, []);

  const login = useCallback(async (password: string): Promise<boolean> => {
    const stored = await fetchSetting('admin_password');
    const expected = stored ?? siteConfig.defaultAdminPassword;

    if (password === expected) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, checking, login, logout };
}
