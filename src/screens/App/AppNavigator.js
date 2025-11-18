import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ConfigScreen from './ConfigScreen';
import ManageItemScreen from './ManageItemScreen';
import AddItemScreen from './AddItemScreen';
import InventoryScreen from './InventoryScreen'; // Importa a nova tela

const AppStack = createNativeStackNavigator();

const AppNavigator = () => {
  // Agrupa todas as telas que o usuário pode acessar APÓS o login.
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="Config" component={ConfigScreen} />
      <AppStack.Screen name="Manage Item" component={ManageItemScreen} />
      <AppStack.Screen name="Add Item" component={AddItemScreen} />
      <AppStack.Screen name="Inventory" component={InventoryScreen} />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
