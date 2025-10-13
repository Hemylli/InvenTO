import React from 'react';
import { TextInput } from 'react-native';
import styles from '../styles/AuthStyles';

// Estilo padrão para text input
const StyledTextInput = (props) => {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#888" 
      {...props}
    />
  );
};

export default StyledTextInput;