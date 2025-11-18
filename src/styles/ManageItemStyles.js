import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#FFD700',
  text: '#333333',
  textSecondary: '#666666',
  background: '#FFFFFF',
  lightGray: '#F5F5F5',
  dark: '#000000',
  borderColor: '#CCCCCC',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerWithBack: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingTop: 60, 
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  mainScrollContainer: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: colors.text,
  },
  clearIcon: {
    padding: 5,
  },
  imagePicker: {
    height: 200,
    width: '100%',
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    tintColor: colors.textSecondary,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  inputMultiline: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  
  // Botões
  primaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  secondaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.dark,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  primaryButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;