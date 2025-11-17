import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen'; 
import AddItemScreen from './AddItemScreen'; 
// Adicionar telas futuras (gerenciar, cadastrar, editar, etc...)

const AppStack = createNativeStackNavigator();

const AppNavigator = () => {
  // Agrupa todas as telas que o usuário pode acessar APÓS o login.
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="AddItem" component={AddItemcreen} />
      {/* Outras telas aqui (Ex: InventarioScreen) */}
    </AppStack.Navigator>
  );
};

export default AppNavigator;
