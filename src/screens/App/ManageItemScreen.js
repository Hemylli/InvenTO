import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import { styles, colors } from '../../styles/ManageItemStyles'; 
import StyledTextInput from '../../components/StyledTextInput'; 
import { buscarItem, salvarItem, excluirItem } from '../../controller/manageItemController';
import * as ImagePicker from 'expo-image-picker';

const imagePlaceholderIcon = require('../../../assets/icons/icone_fotos.png'); 

const ManageItemScreen = () => {
  const navigation = useNavigation();

  // Estados
  const [searchQuery, setSearchQuery] = useState('');
  const [currentItem, setCurrentItem] = useState(null); // Guarda o item encontrado
  const [local, setLocal] = useState('');
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null); // Para a imagem
  const [loading, setLoading] = useState(false);

  // Refs para controlar o foco dos inputs
  const localInputRef = useRef(null);
  const nomeInputRef = useRef(null);
  const quantidadeInputRef = useRef(null);
  const descricaoInputRef = useRef(null);

  const clearForm = (clearSearch = false) => {
    if (clearSearch) setSearchQuery('');
    setCurrentItem(null);
    setNome('');
    setLocal('');
    setQuantidade('');
    setDescricao('');
    setImagem(null);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      Alert.alert('Busca', 'Por favor, digite um nome ou local para buscar.');
      return;
    }
    setLoading(true);
    try {
      const item = await buscarItem(searchQuery);
      if (item) {
        setCurrentItem(item);
        setNome(item.nome);
        setLocal(item.local);
        setQuantidade(String(item.quantidade)); // Converte para string para o TextInput
        setDescricao(item.descricao);
        setImagem(item.imagem_path);
        Alert.alert('Sucesso', 'Item encontrado!');
      } else {
        clearForm();
        Alert.alert('Não encontrado', 'Nenhum item corresponde à sua busca.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao buscar o item.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentItem) {
      Alert.alert('Erro', 'Nenhum item selecionado. Busque um item antes de salvar.');
      return;
    }
    if (!nome || !local || !quantidade) {
      Alert.alert('Erro', 'Os campos Nome, Local e Quantidade são obrigatórios.');
      return;
    }

    const itemToSave = {
      id: currentItem.id,
      nome,
      local,
      quantidade: parseInt(quantidade, 10), // Converte de volta para número
      descricao,
      imagem_path: imagem, // Corrigido para usar o nome da coluna do DB
    };

    setLoading(true);
    try {
      const success = await salvarItem(itemToSave);
      if (success) {
        Alert.alert('Sucesso', 'Item atualizado com sucesso!');
      } else {
        Alert.alert('Erro', 'Não foi possível atualizar o item.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar as alterações.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!currentItem) {
      Alert.alert('Erro', 'Nenhum item selecionado para excluir.');
      return;
    }

    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir o item "${currentItem.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              const success = await excluirItem(currentItem.id);
              if (success) {
                Alert.alert('Sucesso', 'Item excluído com sucesso!');
                clearForm(true); // Limpa todo o formulário, incluindo a busca
              } else {
                Alert.alert('Erro', 'Não foi possível excluir o item.');
              }
            } catch (error) {
              Alert.alert('Erro', 'Ocorreu um erro ao tentar excluir.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleChooseImage = async () => {
    console.log("handleChooseImage: Mostrando alerta de seleção.");
    Alert.alert(
      "Selecionar Imagem",
      "Escolha de onde você quer adicionar a imagem:",
      [
        {
          text: "Câmera",
          onPress: async () => {
            console.log("Opção 'Câmera' selecionada.");
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              console.log("Permissão da câmera negada.");
              Alert.alert('Permissão necessária', 'É preciso permitir o acesso à câmera para tirar uma foto.');
              return;
            }
            console.log("Abrindo a câmera...");
            let result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            if (!result.canceled) {
              console.log("Imagem da câmera selecionada:", result.assets[0].uri);
              setImagem(result.assets[0].uri);
            }
          },
        },
        {
          text: "Galeria",
          onPress: async () => {
            console.log("Opção 'Galeria' selecionada.");
            const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (mediaStatus !== 'granted') {
                console.log("Permissão da galeria negada.");
                Alert.alert('Permissão necessária', 'É preciso permitir o acesso à galeria para escolher uma imagem.');
                return;
              }
              console.log("Abrindo a galeria...");
              let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });
              if (!result.canceled) {
                console.log("Imagem da galeria selecionada:", result.assets[0].uri);
                setImagem(result.assets[0].uri);
              }
          },
        },
        { text: "Cancelar", style: "cancel", onPress: () => console.log("Seleção de imagem cancelada.") },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* 1. Cabeçalho */}
        <View style={styles.headerWithBack}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={28} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Gerenciar Item</Text>
        </View>

        <ScrollView style={styles.mainScrollContainer} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* 2. Barra de Busca */}
          <View style={styles.searchContainer}>
            <StyledTextInput 
              placeholder="Digite o nome ou local do item"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput} 
              onSubmitEditing={handleSearch} // Permite buscar com o "Enter" do teclado
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              {loading ? <ActivityIndicator color={colors.primary} /> : <Ionicons name="search" size={24} color={colors.textSecondary} />}
            </TouchableOpacity>

            {searchQuery.length > 0 && (
              <TouchableOpacity 
                style={styles.clearIcon}
                onPress={() => clearForm(true)}
              >
                <Ionicons name="close-circle" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          {/* 3. Placeholder da Imagem */}
          <TouchableOpacity 
            style={styles.imagePicker}
            onPress={handleChooseImage}
          >
            <Image 
              source={imagem ? { uri: imagem } : imagePlaceholderIcon}
              style={imagem ? styles.imagePreview : styles.imagePlaceholder}
              resizeMode="contain" 
            />
          </TouchableOpacity>

          {/* 4. Formulário */}
          <StyledTextInput 
            ref={localInputRef}
            placeholder="Onde está localizado"
            value={local}
            onChangeText={setLocal}
            returnKeyType="next"
            onSubmitEditing={() => nomeInputRef.current?.focus()}
            style={styles.input} 
          />
          <StyledTextInput 
            ref={nomeInputRef}
            placeholder="Nome do Item"
            value={nome}
            onChangeText={setNome}
            returnKeyType="next"
            onSubmitEditing={() => quantidadeInputRef.current?.focus()}
            style={styles.input} 
          />
          <StyledTextInput 
            ref={quantidadeInputRef}
            placeholder="Quantidade"
            value={quantidade}
            onChangeText={setQuantidade}
            keyboardType="numeric" 
            returnKeyType="next"
            onSubmitEditing={() => descricaoInputRef.current?.focus()}
            style={styles.input} 
          />
          <StyledTextInput 
            ref={descricaoInputRef}
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            multiline={true} 
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            style={[styles.input, styles.inputMultiline]} 
          />

          {/* 5. Botões de Ação */}
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleSave}
            disabled={loading || !currentItem}
          >
            <Text style={styles.primaryButtonText}>{loading ? 'Salvando...' : 'Salvar Alterações'}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleDelete}
            disabled={loading || !currentItem}
          >
            <Text style={styles.secondaryButtonText}>{loading ? 'Excluindo...' : 'Excluir item'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ManageItemScreen;