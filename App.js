import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initDb } from './src/database/database.js'; 
import AuthNavigator from './src/screens/Auth/AuthNavigator.js'; 
import { Alert } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
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

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}