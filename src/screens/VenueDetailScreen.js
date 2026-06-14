import React from 'react';
import { ScrollView, Text } from 'react-native';

import { PrimaryButton, SecondaryButton } from '../components/AppButton';
import { Card } from '../components/Card';
import EmptyState from '../components/EmptyState';
import Header from '../components/Header';
import TagRow from '../components/TagRow';
import { styles } from '../styles/styles';

export default function VenueDetailScreen({ selectedVenue, currentUser, navigate }) {
  if (!selectedVenue) return <EmptyState message="Venue not found." />;

  const isMusician = currentUser?.role === 'musician';

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <Header
        title={selectedVenue.name}
        subtitle={`${selectedVenue.city} \u2022 ${selectedVenue.venueType}`}
      />
      <Card>
        <Text style={styles.label}>Capacity</Text>
        <Text style={styles.bodyText}>{selectedVenue.capacity}</Text>
        <Text style={styles.label}>Typical genres</Text>
        <TagRow tags={selectedVenue.typicalGenres} />
        <Text style={styles.label}>Booking budget</Text>
        <Text style={styles.bodyText}>{selectedVenue.bookingBudget}</Text>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.bodyText}>{selectedVenue.description}</Text>
        <Text style={styles.label}>Contact</Text>
        <Text style={styles.bodyText}>{selectedVenue.contactName}</Text>
      </Card>
      {isMusician && (
        <PrimaryButton
          label="Request a booking"
          onPress={() => navigate('requestBooking')}
        />
      )}
      <SecondaryButton
        label="Back to venue search"
        onPress={() => navigate('findVenues')}
      />
    </ScrollView>
  );
}
