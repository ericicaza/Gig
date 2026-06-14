import React from 'react';
import { ScrollView, Text } from 'react-native';

import { PrimaryButton, SecondaryButton } from '../components/AppButton';
import { Card } from '../components/Card';
import Header from '../components/Header';
import ProfileSummary from '../components/ProfileSummary';
import Section from '../components/Section';
import { styles } from '../styles/styles';

export default function MusicianHomeScreen({
  currentUser,
  currentMusician,
  navigate,
  signOut,
}) {
  if (!currentUser) return null;

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <Header title="Gig" subtitle={`Signed in as ${currentUser.displayName}`} />

      <Card>
        <Text style={styles.cardTitle}>Musician dashboard</Text>
        <Text style={styles.bodyText}>
          Find venues, send booking requests, and manage conversations.
        </Text>
      </Card>

      {currentMusician && (
        <Section title="Your profile">
          <ProfileSummary
            title={currentMusician.stageName}
            subtitle={`${currentMusician.city} \u2022 ${currentMusician.rateRange}`}
            tags={currentMusician.genres}
          />
          <PrimaryButton
            label="Edit my musician profile"
            onPress={() => navigate('musicianProfile')}
          />
        </Section>
      )}

      <Section title="Core actions">
        <PrimaryButton
          label="Find venues nearby"
          onPress={() => navigate('findVenues')}
        />
        <SecondaryButton
          label="My booking requests"
          onPress={() => navigate('bookings')}
        />
        <SecondaryButton label="Inbox" onPress={() => navigate('inbox')} />
      </Section>

      <SecondaryButton label="Switch demo role" onPress={signOut} />
    </ScrollView>
  );
}
