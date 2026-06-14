import React from 'react';
import { ScrollView, Text } from 'react-native';

import { PrimaryButton, SecondaryButton } from '../components/AppButton';
import { Card } from '../components/Card';
import Header from '../components/Header';
import ProfileSummary from '../components/ProfileSummary';
import Section from '../components/Section';
import { styles } from '../styles/styles';

export default function VenueOwnerHomeScreen({
  currentUser,
  currentVenue,
  navigate,
  signOut,
}) {
  if (!currentUser) return null;

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <Header title="Gig" subtitle={`Signed in as ${currentUser.displayName}`} />

      <Card>
        <Text style={styles.cardTitle}>Venue owner dashboard</Text>
        <Text style={styles.bodyText}>
          Find musicians, review booking requests, and message performers.
        </Text>
      </Card>

      {currentVenue && (
        <Section title="Your venue">
          <ProfileSummary
            title={currentVenue.name}
            subtitle={`${currentVenue.city} \u2022 ${currentVenue.venueType} \u2022 ${currentVenue.capacity} capacity`}
            tags={currentVenue.typicalGenres}
          />
          <PrimaryButton
            label="Edit my venue profile"
            onPress={() => navigate('venueProfile')}
          />
        </Section>
      )}

      <Section title="Core actions">
        <PrimaryButton
          label="Find musicians"
          onPress={() => navigate('findMusicians')}
        />
        <SecondaryButton
          label="Review booking requests"
          onPress={() => navigate('bookings')}
        />
        <SecondaryButton label="Inbox" onPress={() => navigate('inbox')} />
      </Section>

      <SecondaryButton label="Switch demo role" onPress={signOut} />
    </ScrollView>
  );
}
