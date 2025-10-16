import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Qualquer componente aninhado poderá chamar login ou logout.
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  useEffect(() => {
    // adicionar um token no AsyncStorage para verificar se o usuário já estava logado.
    setTimeout(() => {
      // Por enquanto, apenas define isLoading para false após um pequeno atraso.
      setIsLoading(false);
    }, 1000);
  }, []);

  // Define o estado e as funções que serão acessíveis para qualquer componente que usar este contexto.
  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook Personalizado
export const useAuth = () => {
  return useContext(AuthContext);
};
