import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import { PrimaryButton, SecondaryButton } from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import FormInput from '../components/FormInput';
import Header from '../components/Header';
import { styles } from '../styles/styles';

export default function RequestBookingScreen({
  selectedVenue,
  createBookingRequest,
  navigate,
}) {
  const [requestedDate, setRequestedDate] = useState('2026-07-18');
  const [message, setMessage] = useState(
    selectedVenue
      ? `Hi ${selectedVenue.contactName}, I would like to request a booking at ${selectedVenue.name}.`
      : ''
  );

  if (!selectedVenue) {
    return <EmptyState message="Choose a venue before requesting a booking." />;
  }

  function submit() {
    if (!requestedDate.trim() || !message.trim()) {
      Alert.alert('Missing information', 'Add a date and message before sending.');
      return;
    }
    createBookingRequest({ venue: selectedVenue, requestedDate, message });
  }

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <Header title="Request booking" subtitle={selectedVenue.name} />
      <FormInput
        label="Requested date"
        value={requestedDate}
        onChangeText={setRequestedDate}
        placeholder="YYYY-MM-DD"
      />
      <FormInput
        label="Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <PrimaryButton label="Send booking request" onPress={submit} />
      <SecondaryButton
        label="Back to venue"
        onPress={() => navigate('venueDetail')}
      />
    </ScrollView>
  );
}
