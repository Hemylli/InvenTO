import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../styles/AppStyles';
import { Ionicons } from '@expo/vector-icons';

const ConfigScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setTimeout(() => {}, 300);
  };

  return (
    <View style={styles.menuContainer}>
      {/* Cabeçalho com seta de voltar */}
      <View style={styles.menuHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.menuHeaderText}>Configurações</Text>
      </View>

      {/* Conteúdo */}
      <View style={styles.menuContent}>
        <Image
          source={require('../../../assets/images/LogoInvento.png')}
          style={styles.logo}
        />

        <View style={styles.infoBox}>
          <Text style={styles.label}>Nome Completo</Text>
          <Text style={styles.infoText}>{user?.nome || 'Usuário'}</Text>

          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.infoText}>{user?.email || 'email@dominio.com'}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  menuHeader: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  menuContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  infoBox: {
    width: '100%',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 10,
    padding: 20,
    marginBottom: 40,
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoText: {
    fontSize: 18,
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  logoutText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfigScreen;




