import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { PrimaryButton } from '../components/AppButton';
import Section from '../components/Section';
import { styles } from '../styles/styles';

export default function RoleSelectionScreen({ signInAs }) {
  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <View style={styles.heroCard}>
        <Text style={styles.logo}>Gig</Text>
        <Text style={styles.heroTitle}>Book better live music.</Text>
        <Text style={styles.heroText}>
          Gig connects musicians and venue owners through profiles, booking
          requests, and simple messaging.
        </Text>
      </View>

      <Section title="Start as a demo user">
        <PrimaryButton
          label="I am a musician looking for gigs"
          onPress={() => signInAs('musician')}
        />
        <PrimaryButton
          label="I own or manage a venue"
          onPress={() => signInAs('venueOwner')}
        />
      </Section>

      <Text style={styles.smallNote}>
        This MVP uses demo users and mock data. Later, this screen becomes real
        signup/login with Firebase Auth.
      </Text>
    </ScrollView>
  );
}
