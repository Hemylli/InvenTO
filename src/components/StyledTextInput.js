import React from 'react';
import { TextInput } from 'react-native';

const StyledTextInput = ({ style, ...rest }) => {
  return (
    <TextInput
      style={style}
      placeholderTextColor="#888" 
      {...rest}
    />
  );
};

export default StyledTextInput;