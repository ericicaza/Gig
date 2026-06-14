import React from 'react';
import { Text } from 'react-native';

import { SoftCard } from './Card';
import TagRow from './TagRow';
import { styles } from '../styles/styles';

export default function ProfileSummary({ title, subtitle, tags }) {
  return (
    <SoftCard>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.bodyText}>{subtitle}</Text>
      <TagRow tags={tags} />
    </SoftCard>
  );
}
