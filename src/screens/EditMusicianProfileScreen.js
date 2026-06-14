import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import { PrimaryButton, SecondaryButton } from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import FormInput from '../components/FormInput';
import Header from '../components/Header';
import { styles } from '../styles/styles';

export default function EditMusicianProfileScreen({
  currentMusician,
  saveMusicianProfile,
  navigate,
}) {
  const [form, setForm] = useState(currentMusician);

  if (!form) return <EmptyState message="No musician profile found." />;

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
      <Header title="Edit musician profile" subtitle="This is what venue owners see." />
      <FormInput
        label="Stage name"
        value={form.stageName}
        onChangeText={(value) => updateField('stageName', value)}
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
        label="Genres, comma-separated"
        value={form.genres.join(', ')}
        onChangeText={(value) => updateListField('genres', value)}
      />
      <FormInput
        label="Instruments, comma-separated"
        value={form.instruments.join(', ')}
        onChangeText={(value) => updateListField('instruments', value)}
      />
      <FormInput
        label="Rate range"
        value={form.rateRange}
        onChangeText={(value) => updateField('rateRange', value)}
      />
      <FormInput
        label="Travel radius"
        value={form.travelRadius}
        onChangeText={(value) => updateField('travelRadius', value)}
      />
      <FormInput
        label="Availability"
        value={form.availability}
        onChangeText={(value) => updateField('availability', value)}
      />
      <FormInput
        label="Bio"
        value={form.bio}
        onChangeText={(value) => updateField('bio', value)}
        multiline
      />
      <PrimaryButton
        label="Save musician profile"
        onPress={() => saveMusicianProfile(form)}
      />
      <SecondaryButton label="Back to dashboard" onPress={() => navigate('home')} />
    </ScrollView>
  );
}
