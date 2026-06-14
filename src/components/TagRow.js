import React from 'react';
import { Text, View } from 'react-native';

import { styles } from '../styles/styles';

export default function TagRow({ tags }) {
  return (
    <View style={styles.tagRow}>
      {tags.map((tag) => (
        <Text key={tag} style={styles.tag}>
          {tag}
        </Text>
      ))}
    </View>
  );
}
