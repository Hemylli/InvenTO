// PÁGINA ADICIONAR ITEM  
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../AppStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; 
import { ScrollView } from 'react-native/types_generated/index';

const AddItemScreen = () => {
    const navigation = useNavigation();
    const [local, setLocal] = useState('');
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagem, setImagem] = useState(null);


    const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão requerida', 'Permita acesso à galeria.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled && result.assets?.length > 0) {
        setImagem(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
      console.log(error);
    }
  };

    const handleAddItem = async () => {
        if (!local || !nome || !quantidade || !descricao) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        const novoItem = {
            local,
            nome,
            quantidade: parseInt(quantidade),
            descricao
        };

         Alert.alert('Oba', 'Novo Item adicionado no IvenTO.');
    };

    return (
        <SafeAreaView style={styles.menuContainer}>
            <View style={localStyles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={localStyles.headerText}>Adicionar Item</Text>
            </View>

            <TouchableOpacity style={localStyles.imageBox} onPress={pickImage}>
                {imagem ? (
            <Image
              source={{ uri: imagem }}
              style={localStyles.previewImage}
              resizeMode="cover"
            />
          ) : (
            <View style={localStyles.placeholder}>
              <Ionicons name="image-outline" size={60} color="#999" />
              <Text style={{ color: '#777', marginTop: 5 }}>Adicionar imagem</Text>
            </View>
          )}
            </TouchableOpacity>

            <TextInput
              placeholder="Localização"
              style={localStyles.input}
              value={local}
              onChangeText={setLocal}
            />

            <TextInput
              placeholder="Nome do Item"
              style={localStyles.input}
              value={nome}
              onChangeText={setNome}
            />

            <TextInput
              placeholder="Quantidade"
              style={localStyles.input}
              keyboardType="numeric"
              value={quantidade}
              onChangeText={setQuantidade}
            />

            <TextInput
              placeholder="Descrição"
              style={[localStyles.input, localStyles.textArea]}
              multiline
              value={descricao}
              onChangeText={setDescricao}
            />

            <TouchableOpacity style={localStyles.button} onPress={handleAddItem}>
                <Text style={localStyles.buttonText}>Salvar Item</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const localStyles = {
    container: {padding: 20},
    header: {
        backgroundColor: '#FFD600',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    imageBox: {
        width: '100%',
        height: 150,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#FFD600',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
};

export default AddItemScreen;