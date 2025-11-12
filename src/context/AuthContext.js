import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Função para logar e armazenar o usuário
  const login = async (userData) => {
    try {
      setUser(userData);
      setIsAuthenticated(true);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.log('Erro ao salvar dados do usuário:', error);
    }
  };

  // Função para sair e limpar os dados
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
    } catch (error) {
      console.log('Erro ao remover dados do usuário:', error);
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  // Carrega usuário salvo ao abrir o app
  useEffect(() => {
    const clearUserData = async () => {
      await AsyncStorage.removeItem('userData');
    };
    clearUserData();
    
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userData');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log('Erro ao carregar dados salvos:', error);
      }
      setIsLoading(false);
    };

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
