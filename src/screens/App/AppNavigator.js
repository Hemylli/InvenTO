import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ConfigScreen from './ConfigScreen';
import ManageItemScreen from './ManageItemScreen' 
// Adicionar telas futuras (gerenciar, cadastrar, editar, etc...)

const AppStack = createNativeStackNavigator();

const AppNavigator = () => {
  // Agrupa todas as telas que o usuário pode acessar APÓS o login.
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="Config" component={ConfigScreen} />
      <AppStack.Screen name="Manage Item" component={ManageItemScreen} />
      {/* Outras telas aqui (Ex: InventarioScreen) */}
    </AppStack.Navigator>
  );
};

export default AppNavigator;
