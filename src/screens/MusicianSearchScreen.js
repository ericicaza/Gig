import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';

import { SecondaryButton } from '../components/AppButton';
import { PressableCard } from '../components/Card';
import EmptyState from '../components/EmptyState';
import FormInput from '../components/FormInput';
import Header from '../components/Header';
import TagRow from '../components/TagRow';
import { styles } from '../styles/styles';

export default function MusicianSearchScreen({ musicians, navigate }) {
  const [query, setQuery] = useState('');

  const filteredMusicians = musicians.filter((musician) => {
    const searchText =
      `${musician.stageName} ${musician.city} ${musician.genres.join(' ')} ${musician.instruments.join(' ')}`.toLowerCase();
    return searchText.includes(query.toLowerCase());
  });

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <Header
        title="Find musicians"
        subtitle="Search by name, city, genre, or instrument."
      />
      <FormInput
        label="Search"
        value={query}
        onChangeText={setQuery}
        placeholder="Try Jazz, DJ, Guitar..."
      />
      {filteredMusicians.map((musician) => (
        <PressableCard
          key={musician.id}
          onPress={() => navigate('musicianDetail', { musicianId: musician.id })}
        >
          <Text style={styles.cardTitle}>{musician.stageName}</Text>
          <Text style={styles.bodyText}>
            {musician.city} {'\u2022'} {musician.rateRange}
          </Text>
          <TagRow tags={musician.genres} />
          <Text style={styles.smallNote}>
            Availability: {musician.availability}
          </Text>
        </PressableCard>
      ))}
      {filteredMusicians.length === 0 && (
        <EmptyState message="No musicians matched your search." />
      )}
      <SecondaryButton label="Back to dashboard" onPress={() => navigate('home')} />
    </ScrollView>
  );
}
