// src/App.js

import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { initDb } from './api/database'; // 1. Importe a função

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [error, setError] = useState(null);

  // 2. useEffect vai rodar uma vez quando o app iniciar
  useEffect(() => {
    console.log("Tentando inicializar o banco de dados...");
    initDb()
      .then(() => {
        // 3. Se a Promise der 'resolve' (sucesso)
        console.log("Banco de dados inicializado com sucesso!");
        setDbInitialized(true);
      })
      .catch((err) => {
        // 4. Se a Promise der 'reject' (erro)
        console.error("Falha ao inicializar o banco de dados:", err);
        setError(err);
      });
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // Exibe uma mensagem na tela baseada no resultado
  let content = <Text>Inicializando banco de dados...</Text>;
  if (error) {
    content = <Text>Erro ao carregar o app. Verifique o console.</Text>;
  } else if (dbInitialized) {
    content = <Text>App pronto! O banco de dados foi criado.</Text>;
    // Aqui você renderizaria seu AppNavigator ou a tela de Login
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {content}
    </View>
  );
}
