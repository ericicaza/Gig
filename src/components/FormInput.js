import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { styles } from '../styles/styles';

export default function FormInput({
  label,
  value,
  onChangeText,
  multiline = false,
  ...props
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        style={[styles.input, multiline && styles.textArea]}
        {...props}
      />
    </View>
  );
}
