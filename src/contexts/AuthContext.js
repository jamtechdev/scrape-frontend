"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TEMPORARY: Auto-login bypass for testing
    // TODO: Remove this and restore proper authentication check
    const dummyUser = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      token: 'dummy-token-for-bypass'
    };
    
    // Set dummy user to bypass login
    setUser(dummyUser);
    localStorage.setItem('token', dummyUser.token);
    localStorage.setItem('user', JSON.stringify(dummyUser));
    setLoading(false);
    
    // Original code (commented out for bypass):
    // const token = localStorage.getItem('token');
    // const userData = localStorage.getItem('user');
    // 
    // if (token && userData) {
    //   try {
    //     setUser(JSON.parse(userData));
    //   } catch (error) {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user');
    //   }
    // }
    // setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}