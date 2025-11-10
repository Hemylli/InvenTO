//PÁGINA INICIAL DO APP 
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/AppStyles';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const icons = {
  inventory: require('../../../assets/icons/icone_inventario.png'),
  add: require('../../../assets/icons/icone-adicionar.png'),
  manage: require('../../../assets/icons/icone-editar.png'),
  settings: require('../../../assets/icons/icone-configuracao.png'),
};

const HomeScreen = () => {
  const navigation = useNavigation();

  // Função para lidar com o clique nos botões
  const handleButtonPress = (screenName) => {
    // Navegação para as telas correspondentes
    // Alterar após criação das próximas telas
    console.log(`Botão '${screenName}' pressionado!`);
  };

  return (
    <SafeAreaView style={styles.menuContainer}>
      <View style={styles.menuHeader}>
        <Text style={styles.menuHeaderText}>Olá, Terapeuta!</Text>
      </View>

      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>O que você gostaria de fazer?</Text>

        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => handleButtonPress('VerInventario')}
        >
          <Image source={icons.inventory} style={styles.menuButtonIcon} />
          <Text style={styles.menuButtonText}>Ver Inventário</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => handleButtonPress('AdicionarItem')}
        >
          <Image source={icons.add} style={styles.menuButtonIcon} />
          <Text style={styles.menuButtonText}>Adicionar Item</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => handleButtonPress('GerenciarRecursos')}
        >
          <Image source={icons.manage} style={styles.menuButtonIcon} />
          <Text style={styles.menuButtonText}>Gerenciar Recursos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={() => navigation.navigate('Config')}
        >
          <Image source={icons.settings} style={styles.menuButtonIcon} />
          <Text style={styles.menuButtonText}>Configurações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;