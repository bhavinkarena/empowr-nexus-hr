
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate checking for existing session
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('hr_portal_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Mock login function - would connect to API in real implementation
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      const mockUser = {
        id: '1',
        fullName: email === 'admin@example.com' ? 'Admin User' : 'Employee User',
        email,
        role: email === 'admin@example.com' ? 'admin' : 'employee',
        avatar: '/placeholder.svg',
      };
      
      setUser(mockUser);
      localStorage.setItem('hr_portal_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      const mockUser = {
        id: '2',
        fullName: userData.fullName,
        email: userData.email,
        role: 'employee',
      };
      
      setUser(mockUser);
      localStorage.setItem('hr_portal_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hr_portal_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
