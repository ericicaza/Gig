import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';

import { SecondaryButton } from '../components/AppButton';
import { PressableCard } from '../components/Card';
import EmptyState from '../components/EmptyState';
import FormInput from '../components/FormInput';
import Header from '../components/Header';
import TagRow from '../components/TagRow';
import { styles } from '../styles/styles';

export default function VenueSearchScreen({ venues, navigate }) {
  const [query, setQuery] = useState('');

  const filteredVenues = venues.filter((venue) => {
    const searchText =
      `${venue.name} ${venue.city} ${venue.venueType} ${venue.typicalGenres.join(' ')}`.toLowerCase();
    return searchText.includes(query.toLowerCase());
  });

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <Header title="Find venues" subtitle="Search by name, city, type, or genre." />
      <FormInput
        label="Search"
        value={query}
        onChangeText={setQuery}
        placeholder="Try Jazz, Lounge, Urbana..."
      />
      {filteredVenues.map((venue) => (
        <PressableCard
          key={venue.id}
          onPress={() => navigate('venueDetail', { venueId: venue.id })}
        >
          <Text style={styles.cardTitle}>{venue.name}</Text>
          <Text style={styles.bodyText}>
            {venue.city} {'\u2022'} {venue.venueType} {'\u2022'} {venue.capacity}{' '}
            capacity
          </Text>
          <TagRow tags={venue.typicalGenres} />
          <Text style={styles.smallNote}>Budget: {venue.bookingBudget}</Text>
        </PressableCard>
      ))}
      {filteredVenues.length === 0 && (
        <EmptyState message="No venues matched your search." />
      )}
      <SecondaryButton label="Back to dashboard" onPress={() => navigate('home')} />
    </ScrollView>
  );
}
