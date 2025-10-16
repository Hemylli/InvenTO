import React, { useEffect } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { initDb } from './src/database/database.js';
import AuthNavigator from './src/screens/Auth/AuthNavigator.js';
import AppNavigator from './src/screens/App/AppNavigator.js'; 
import { Alert, View, Text } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';

const AppWithProviders = () => {
  // Usa o hook para obter o estado de autenticação e carregamento
  const { isAuthenticated, isLoading } = useAuth(); 

  useEffect(() => {
    initDb()
      .then(() => {
        console.log('Banco de dados inicializado com sucesso.');
      })
      .catch((err) => {
        console.log('Falha na inicialização do banco de dados: ' + err);
        Alert.alert('Erro', 'Não foi possível inicializar o banco de dados. O aplicativo pode não funcionar corretamente.');
      });
  }, []);

  // Mostra a tela de carregamento enquanto o estado de autenticação é verificado
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando App...</Text>
      </View>
    );
  }

  // Renderiza o fluxo de autenticação (Login/Cadastro) ou o fluxo principal (Home, etc.)
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppWithProviders />
    </AuthProvider>
  );
}

