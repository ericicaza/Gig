import React from 'react';
import { Text, View } from 'react-native';

import { styles } from '../styles/styles';

export default function EmptyState({ message }) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}
