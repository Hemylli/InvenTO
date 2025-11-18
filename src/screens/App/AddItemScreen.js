import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import { styles, colors } from '../../styles/ManageItemStyles'; 
import StyledTextInput from '../../components/StyledTextInput'; 
import * as ImagePicker from 'expo-image-picker';
import { criarItem } from '../../controller/manageItemController';
import { useAuth } from '../../context/AuthContext';

const imagePlaceholderIcon = require('../../../assets/icons/icone_fotos.png'); 

const AddItemScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth(); // Para pegar o ID do usuário logado

  // Estados do formulário
  const [local, setLocal] = useState('');
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  const [loading, setLoading] = useState(false);

  // Refs para controlar o foco dos inputs
  const nomeInputRef = useRef(null);
  const quantidadeInputRef = useRef(null);
  const descricaoInputRef = useRef(null);


  const handleChooseImage = async () => {
    Alert.alert(
      "Selecionar Imagem",
      "Escolha de onde você quer adicionar a imagem:",
      [
        {
          text: "Câmera",
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permissão necessária', 'É preciso permitir o acesso à câmera.');
              return;
            }
            let result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
            if (!result.canceled) {
              setImagem(result.assets[0].uri);
            }
          },
        },
        {
          text: "Galeria",
          onPress: async () => {
            const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (mediaStatus !== 'granted') {
                Alert.alert('Permissão necessária', 'É preciso permitir o acesso à galeria.');
                return;
              }
              let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });
              if (!result.canceled) {
                setImagem(result.assets[0].uri);
              }
          },
        },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  const handleSaveNewItem = async () => {
    if (!nome || !local || !quantidade) {
      Alert.alert('Campos Obrigatórios', 'Por favor, preencha Nome, Local e Quantidade.');
      return;
    }

    const newItem = {
      nome,
      local,
      quantidade: parseInt(quantidade, 10) || 0,
      descricao,
      imagem_path: imagem,
    };

    setLoading(true);
    try {
      const success = await criarItem(newItem, Number(user.id));
      if (success) {
        Alert.alert('Sucesso!', 'Novo item cadastrado.', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Erro', 'Não foi possível cadastrar o item.');
      }
    } catch (error) {
      Alert.alert('Erro no Cadastro', 'Ocorreu um erro ao tentar salvar o item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.headerWithBack}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={28} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cadastro de Item</Text>
        </View>

        <ScrollView style={styles.mainScrollContainer} contentContainerStyle={{ paddingBottom: 40 }}>
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

          <StyledTextInput 
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

          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleSaveNewItem}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>{loading ? 'Salvando...' : 'Salvar item'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddItemScreen;