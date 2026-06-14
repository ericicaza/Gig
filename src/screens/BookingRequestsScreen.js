import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { SecondaryButton, SmallButton } from '../components/AppButton';
import { Card } from '../components/Card';
import EmptyState from '../components/EmptyState';
import Header from '../components/Header';
import StatusPill from '../components/StatusPill';
import { styles } from '../styles/styles';

export default function BookingRequestsScreen({
  currentUser,
  currentMusician,
  currentVenue,
  musicians,
  venues,
  bookingRequests,
  conversations,
  updateBookingStatus,
  navigate,
}) {
  const isMusician = currentUser?.role === 'musician';

  const visibleRequests = bookingRequests.filter((request) => {
    if (isMusician) return request.musicianId === currentMusician?.id;
    return (
      request.venueOwnerId === currentUser?.id ||
      request.venueId === currentVenue?.id
    );
  });

  function requestTitle(request) {
    const venue = venues.find((item) => item.id === request.venueId);
    const musician = musicians.find((item) => item.id === request.musicianId);
    return isMusician
      ? venue?.name || 'Unknown venue'
      : musician?.stageName || 'Unknown musician';
  }

  function openConversation(request) {
    const conversation = conversations.find(
      (candidate) => candidate.bookingRequestId === request.id
    );
    if (conversation) navigate('conversation', { conversationId: conversation.id });
  }

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <Header title="Booking requests" subtitle="Track the status of gig requests." />
      {visibleRequests.map((request) => (
        <Card key={request.id}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>{requestTitle(request)}</Text>
            <StatusPill status={request.status} />
          </View>
          <Text style={styles.bodyText}>Requested date: {request.requestedDate}</Text>
          <Text style={styles.bodyText}>{request.message}</Text>
          <View style={styles.buttonGap}>
            <SecondaryButton
              label="Open conversation"
              onPress={() => openConversation(request)}
            />
            {!isMusician && request.status === 'pending' && (
              <View style={styles.rowGap}>
                <SmallButton
                  label="Accept"
                  onPress={() => updateBookingStatus(request.id, 'accepted')}
                />
                <SmallButton
                  label="Decline"
                  onPress={() => updateBookingStatus(request.id, 'declined')}
                />
              </View>
            )}
          </View>
        </Card>
      ))}
      {visibleRequests.length === 0 && (
        <EmptyState message="No booking requests yet." />
      )}
      <SecondaryButton label="Back to dashboard" onPress={() => navigate('home')} />
    </ScrollView>
  );
}
