import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons'; 

import { styles as headerStyles, colors } from '../../styles/ManageItemStyles'; 
import { styles as listStyles } from '../../styles/InventoryStyles'; 
import { buscarTodosItens } from '../../controller/manageItemController';
import { useAuth } from '../../context/AuthContext';

const imagePlaceholderIcon = require('../../../assets/icons/icone_fotos.png');

const ItemCard = ({ item }) => (
  <TouchableOpacity style={listStyles.itemCard}>
    <Image 
      source={item.imagem_path ? { uri: item.imagem_path } : imagePlaceholderIcon} 
      style={listStyles.itemImage} 
    />
    <View style={listStyles.itemTextContainer}>
      <Text style={listStyles.itemLocal}>{item.local}</Text>
      <Text style={listStyles.itemName}>{item.nome}</Text>
      {item.descricao ? <Text style={listStyles.itemDescription} numberOfLines={2}>{item.descricao}</Text> : null}
      <Text style={listStyles.itemQuantity}>Quantidade: {item.quantidade}</Text>
    </View>
  </TouchableOpacity>
);

const InventoryScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadItens = useCallback(async () => {
    setLoading(true);
    try {
      const data = await buscarTodosItens();
      setItens(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os itens do inventário.");
    } finally {
      setLoading(false);
    }
  }, []);

  // useFocusEffect recarrega os dados toda vez que a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      loadItens();
    }, [loadItens])
  );

  return (
    <SafeAreaView style={headerStyles.container} edges={['top']}>
      {/* 1. Cabeçalho (Reutilizado do ManageItemStyles) */}
      <View style={headerStyles.headerWithBack}>
        <TouchableOpacity 
          style={headerStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={headerStyles.headerTitle}>Inventário</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1 }} />
      ) : itens.length === 0 ? (
        <View style={listStyles.emptyContainer}>
          <Text style={listStyles.emptyText}>Seu inventário está vazio.</Text>
          <Text style={listStyles.emptySubText}>Adicione um novo item para começar!</Text>
        </View>
      ) : (
        <FlatList
          data={itens}
          renderItem={({ item }) => <ItemCard item={item} />}
          keyExtractor={item => String(item.id)}
          style={listStyles.listContainer}
          onRefresh={loadItens} // Permite "puxar para atualizar"
          refreshing={loading}
        />
      )}

      {/* 3. Botões Flutuantes (FABs) */}
      <View style={listStyles.fabContainer}>
        <TouchableOpacity 
          style={listStyles.fab}
          onPress={() => { /* Lógica de Filtro */ }}
        >
          <Ionicons name="filter" size={28} color={colors.text} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={listStyles.fab}
          onPress={() => { /* Lógica de Busca */ }}
        >
          <Feather name="search" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InventoryScreen;