import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/AuthStyles';
import StyledTextInput from '../../components/StyledTextInput'; 
import { signUpApi } from '../../api/authService';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignUp = async () => {
    if (!nome || !email || !senha || !confirmaSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }
    if (senha !== confirmaSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);
    const result = await signUpApi(nome, email, senha);
    setLoading(false);

    if (result.success) {
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso! Faça login para continuar.');
      navigation.navigate('Login');
    } else {
      Alert.alert('Erro', result.message);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image 
          source={require('../../../assets/images/LogoInvento.png')}
          style={styles.logo} 
        />
        <Text style={styles.title}>InvenTO</Text>
      </View>

      <Text style={styles.signUpTitle}>Criar uma conta</Text>
      <Text style={styles.signUpSubtitle}>Cadastre-se para usar o aplicativo</Text>

      <StyledTextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={nome}
        onChangeText={setNome}
      />
      <StyledTextInput
        style={styles.input}
        placeholder="email@dominio.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <StyledTextInput
        style={styles.input}
        placeholder="senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <StyledTextInput
        style={styles.input}
        placeholder="confirme a senha"
        secureTextEntry
        value={confirmaSenha}
        onChangeText={setConfirmaSenha}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Cadastrando...' : 'Continuar'}</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Já possui uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;