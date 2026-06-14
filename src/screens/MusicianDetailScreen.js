import React from 'react';
import { ScrollView, Text } from 'react-native';

import { PrimaryButton, SecondaryButton } from '../components/AppButton';
import { Card } from '../components/Card';
import EmptyState from '../components/EmptyState';
import Header from '../components/Header';
import TagRow from '../components/TagRow';
import { styles } from '../styles/styles';

export default function MusicianDetailScreen({
  selectedMusician,
  getOrCreateDirectConversationWithMusician,
  navigate,
}) {
  if (!selectedMusician) return <EmptyState message="Musician not found." />;

  function messageMusician() {
    const conversationId =
      getOrCreateDirectConversationWithMusician(selectedMusician);
    if (conversationId) navigate('conversation', { conversationId });
  }

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <Header
        title={selectedMusician.stageName}
        subtitle={`${selectedMusician.city} \u2022 ${selectedMusician.rateRange}`}
      />
      <Card>
        <Text style={styles.label}>Genres</Text>
        <TagRow tags={selectedMusician.genres} />
        <Text style={styles.label}>Instruments</Text>
        <TagRow tags={selectedMusician.instruments} />
        <Text style={styles.label}>Availability</Text>
        <Text style={styles.bodyText}>{selectedMusician.availability}</Text>
        <Text style={styles.label}>Travel radius</Text>
        <Text style={styles.bodyText}>{selectedMusician.travelRadius}</Text>
        <Text style={styles.label}>Bio</Text>
        <Text style={styles.bodyText}>{selectedMusician.bio}</Text>
      </Card>
      <PrimaryButton label="Message musician" onPress={messageMusician} />
      <SecondaryButton
        label="Back to musician search"
        onPress={() => navigate('findMusicians')}
      />
    </ScrollView>
  );
}
