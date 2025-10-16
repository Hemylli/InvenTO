# 💡 InvenTO: Gestão de Materiais de Terapia Ocupacional

<div align="center">
  <img src="assets/images/logoInvento.png" alt="Logo InvenTO" width="150"/>
</div>

> Aplicativo para controle e gestão de materiais para Terapeutas Ocupacionais.

## 🎯 Sobre o Projeto

Este projeto visa a criação e o desenvolvimento de um aplicativo móvel para o controle e gestão digital de materiais utilizados por Terapeutas Ocupacionais. O foco é proporcionar uma ferramenta eficiente para o acompanhamento e a localização rápida de todos os recursos do inventário.

*Projeto desenvolvido para a matéria extensionista "Programação para Dispositivos Móveis em Android".*

## 🛠️ Tecnologias Utilizadas

| Categoria     |Tecnologia                                                              | Uso Principal                         |
|---------------|-------------------------------------------------------------------------|---------------------------------------|
| **Framework** | [React Native (Expo)](https://reactnative.dev/)                         | Desenvolvimento Mobile Cross-Platform |
| **Linguagem** | [JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | Lógica da Aplicação                   |
| **Banco de Dados** | [SQLite (Expo SQLite)](https://docs.expo.dev/versions/latest/sdk/sqlite/) | Persistência de Dados Local           |
| **Navegação** | [React Navigation](https://reactnavigation.org/)                        | Gerenciamento de Telas e Fluxos       |

## 🚀 Como Iniciar o Aplicativo

Este é um projeto [Expo](https://expo.dev/) criado com `create-expo-app`.

### 1. Instalação

Instale as dependências do projeto:
```bash
npm install
```

### 2. Execução

Inicie o servidor de desenvolvimento:
```bash
npx expo start
```

Na saída do terminal, você encontrará opções para abrir o aplicativo no **Expo Go**, um ambiente para testes rápidos em dispositivos móveis (recomendado).

## ⚙️ Scripts Disponíveis

### Limpar e Reiniciar o Projeto

Se encontrar problemas de inicialização ou cache, você pode executar o seguinte comando para limpar o cache do Metro Bundler:
```bash
npx expo start --clear
```

> **Nota**: O script `npm run reset-project` mencionado anteriormente parece ser de um template. O comando `npx expo start --clear` é a forma padrão do Expo para limpar o cache.

