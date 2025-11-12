import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/AuthStyles';
import StyledTextInput from '../../components/StyledTextInput';
import { loginApi } from '../../api/authService';
import { useAuth } from '../../context/AuthContext'; // 💡 Novo: Importa o hook

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth(); // 💡 Novo: Obtém a função 'login' do contexto
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    const result = await loginApi(email, senha);
    setLoading(false);

    if (result.success) {
  const userData = result.user; // contém nome e email vindos do banco
  Alert.alert('Sucesso', 'Login realizado com sucesso!');
  login(userData); // agora salva os dados reais no contexto
 
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

      <Text style={styles.subtitle}>
        Bem-vindo(a) ao InvenTO!{'\n'}
        Faça login para continuar
      </Text>

      <StyledTextInput
        placeholder="email@dominio.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <StyledTextInput
        placeholder="senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
      </TouchableOpacity>
      
      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>ou</Text>
        <View style={styles.separatorLine} />
      </View>

      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Não tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
