import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import { PrimaryButton, SecondaryButton } from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import FormInput from '../components/FormInput';
import Header from '../components/Header';
import { styles } from '../styles/styles';

export default function EditVenueProfileScreen({
  currentVenue,
  saveVenueProfile,
  navigate,
}) {
  const [form, setForm] = useState(currentVenue);

  if (!form) return <EmptyState message="No venue profile found." />;

  function updateField(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function updateListField(field, value) {
    const items = value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    updateField(field, items);
  }

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <Header title="Edit venue profile" subtitle="This is what musicians see." />
      <FormInput
        label="Venue name"
        value={form.name}
        onChangeText={(value) => updateField('name', value)}
      />
      <FormInput
        label="Contact name"
        value={form.contactName}
        onChangeText={(value) => updateField('contactName', value)}
      />
      <FormInput
        label="City"
        value={form.city}
        onChangeText={(value) => updateField('city', value)}
      />
      <FormInput
        label="Venue type"
        value={form.venueType}
        onChangeText={(value) => updateField('venueType', value)}
      />
      <FormInput
        label="Capacity"
        value={String(form.capacity)}
        keyboardType="numeric"
        onChangeText={(value) => updateField('capacity', Number(value) || 0)}
      />
      <FormInput
        label="Typical genres, comma-separated"
        value={form.typicalGenres.join(', ')}
        onChangeText={(value) => updateListField('typicalGenres', value)}
      />
      <FormInput
        label="Booking budget"
        value={form.bookingBudget}
        onChangeText={(value) => updateField('bookingBudget', value)}
      />
      <FormInput
        label="Description"
        value={form.description}
        onChangeText={(value) => updateField('description', value)}
        multiline
      />
      <PrimaryButton
        label="Save venue profile"
        onPress={() => saveVenueProfile(form)}
      />
      <SecondaryButton label="Back to dashboard" onPress={() => navigate('home')} />
    </ScrollView>
  );
}
