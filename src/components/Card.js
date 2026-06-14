import React from 'react';
import { Pressable, View } from 'react-native';

import { styles } from '../styles/styles';

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function PressableCard({ children, onPress, style }) {
  return (
    <Pressable style={[styles.card, style]} onPress={onPress}>
      {children}
    </Pressable>
  );
}

export function SoftCard({ children, style }) {
  return <View style={[styles.cardSoft, style]}>{children}</View>;
}
