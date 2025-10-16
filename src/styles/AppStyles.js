import { StyleSheet } from 'react-native';

const colors = {
  primary: '#FFD700', // Amarelo do logo e botões
  text: '#333333', // Cor do texto
  textSecondary: '#666666', // Cor do texto secundário
  background: '#FFFFFF', // Fundo branco
  inputBorder: '#CCCCCC', // Borda dos inputs
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
  },
  menuHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  menuContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 20,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 40,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    width: '100%',
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuButtonIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.text,
  },
});

export { styles, colors };