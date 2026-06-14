import React from 'react';
import { Text } from 'react-native';

import { styles } from '../styles/styles';

export default function StatusPill({ status }) {
  return <Text style={styles.statusPill}>{status.toUpperCase()}</Text>;
}
