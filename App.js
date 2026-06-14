import React, { useMemo, useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';

import {
  initialBookingRequests,
  initialConversations,
  initialMessagesByConversation,
  initialMusicians,
  initialUsers,
  initialVenues,
} from './src/data/mockData';
import BookingRequestsScreen from './src/screens/BookingRequestsScreen';
import ConversationScreen from './src/screens/ConversationScreen';
import EditMusicianProfileScreen from './src/screens/EditMusicianProfileScreen';
import EditVenueProfileScreen from './src/screens/EditVenueProfileScreen';
import InboxScreen from './src/screens/InboxScreen';
import MusicianDetailScreen from './src/screens/MusicianDetailScreen';
import MusicianHomeScreen from './src/screens/MusicianHomeScreen';
import MusicianSearchScreen from './src/screens/MusicianSearchScreen';
import RequestBookingScreen from './src/screens/RequestBookingScreen';
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';
import VenueDetailScreen from './src/screens/VenueDetailScreen';
import VenueOwnerHomeScreen from './src/screens/VenueOwnerHomeScreen';
import VenueSearchScreen from './src/screens/VenueSearchScreen';
import { styles } from './src/styles/styles';
import {
  createBookingRequest as buildBookingRequest,
  createDirectConversationWithMusician,
  findDirectConversationWithMusician,
  sendMessage as buildMessageUpdate,
  updateBookingStatus as applyBookingStatusUpdate,
  updateMusicianProfile,
  updateVenueProfile,
} from './src/utils/appActions';

export default function App() {
  const [users] = useState(initialUsers);
  const [musicians, setMusicians] = useState(initialMusicians);
  const [venues, setVenues] = useState(initialVenues);
  const [bookingRequests, setBookingRequests] = useState(initialBookingRequests);
  const [conversations, setConversations] = useState(initialConversations);
  const [messagesByConversation, setMessagesByConversation] = useState(
    initialMessagesByConversation
  );

  const [currentUser, setCurrentUser] = useState(null);
  const [screen, setScreen] = useState('role');
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [selectedMusicianId, setSelectedMusicianId] = useState(null);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const currentMusician = useMemo(() => {
    if (!currentUser) return null;
    return musicians.find((musician) => musician.ownerId === currentUser.id) || null;
  }, [currentUser, musicians]);

  const currentVenue = useMemo(() => {
    if (!currentUser) return null;
    return venues.find((venue) => venue.ownerId === currentUser.id) || null;
  }, [currentUser, venues]);

  const selectedVenue = venues.find((venue) => venue.id === selectedVenueId) || null;
  const selectedMusician =
    musicians.find((musician) => musician.id === selectedMusicianId) || null;
  const selectedConversation =
    conversations.find((conversation) => conversation.id === selectedConversationId) ||
    null;
  const selectedRequest =
    bookingRequests.find((request) => request.id === selectedRequestId) || null;

  function navigate(nextScreen, params = {}) {
    if (params.venueId) setSelectedVenueId(params.venueId);
    if (params.musicianId) setSelectedMusicianId(params.musicianId);
    if (params.conversationId) setSelectedConversationId(params.conversationId);
    if (params.requestId) setSelectedRequestId(params.requestId);
    setScreen(nextScreen);
  }

  function signInAs(role) {
    const user = users.find((candidate) => candidate.role === role);
    setCurrentUser(user);
    setScreen('home');
  }

  function signOut() {
    setCurrentUser(null);
    setSelectedVenueId(null);
    setSelectedMusicianId(null);
    setSelectedConversationId(null);
    setSelectedRequestId(null);
    setScreen('role');
  }

  function createBookingRequest({ venue, requestedDate, message }) {
    if (!currentUser || !currentMusician) {
      Alert.alert('Missing musician profile', 'Sign in as a musician first.');
      return;
    }

    const {
      bookingRequest,
      conversation,
      message: initialMessage,
    } = buildBookingRequest({
      currentUser,
      currentMusician,
      venue,
      requestedDate,
      message,
    });

    setBookingRequests((previous) => [bookingRequest, ...previous]);
    setConversations((previous) => [conversation, ...previous]);
    setMessagesByConversation((previous) => ({
      ...previous,
      [conversation.id]: [initialMessage],
    }));

    Alert.alert('Booking request sent', `${venue.name} can now review it.`);
    navigate('bookings');
  }

  function updateBookingStatus(requestId, status) {
    setBookingRequests((previous) =>
      applyBookingStatusUpdate(previous, requestId, status)
    );
  }

  function getOrCreateDirectConversationWithMusician(musician) {
    if (!currentUser || !currentVenue) return null;

    const existingConversationId = findDirectConversationWithMusician(
      conversations,
      currentUser,
      musician
    );

    if (existingConversationId) return existingConversationId;

    const conversation = createDirectConversationWithMusician({
      currentUser,
      currentVenue,
      musician,
    });

    setConversations((previous) => [conversation, ...previous]);
    setMessagesByConversation((previous) => ({
      ...previous,
      [conversation.id]: [],
    }));

    return conversation.id;
  }

  function sendMessage(conversationId, text) {
    const nextState = buildMessageUpdate({
      conversations,
      messagesByConversation,
      conversationId,
      currentUser,
      text,
    });

    if (!nextState) return;

    setMessagesByConversation(nextState.messagesByConversation);
    setConversations(nextState.conversations);
  }

  function saveMusicianProfile(updatedProfile) {
    setMusicians((previous) => updateMusicianProfile(previous, updatedProfile));
    Alert.alert('Saved', 'Your musician profile was updated.');
    navigate('home');
  }

  function saveVenueProfile(updatedProfile) {
    setVenues((previous) => updateVenueProfile(previous, updatedProfile));
    Alert.alert('Saved', 'Your venue profile was updated.');
    navigate('home');
  }

  const sharedProps = {
    currentUser,
    currentMusician,
    currentVenue,
    musicians,
    venues,
    bookingRequests,
    conversations,
    messagesByConversation,
    selectedVenue,
    selectedMusician,
    selectedConversation,
    selectedRequest,
    navigate,
    signInAs,
    signOut,
    createBookingRequest,
    updateBookingStatus,
    getOrCreateDirectConversationWithMusician,
    sendMessage,
    saveMusicianProfile,
    saveVenueProfile,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {screen === 'role' && <RoleSelectionScreen {...sharedProps} />}
      {screen === 'home' && currentUser?.role === 'musician' && (
        <MusicianHomeScreen {...sharedProps} />
      )}
      {screen === 'home' && currentUser?.role === 'venueOwner' && (
        <VenueOwnerHomeScreen {...sharedProps} />
      )}
      {screen === 'musicianProfile' && (
        <EditMusicianProfileScreen {...sharedProps} />
      )}
      {screen === 'venueProfile' && <EditVenueProfileScreen {...sharedProps} />}
      {screen === 'findVenues' && <VenueSearchScreen {...sharedProps} />}
      {screen === 'venueDetail' && <VenueDetailScreen {...sharedProps} />}
      {screen === 'requestBooking' && <RequestBookingScreen {...sharedProps} />}
      {screen === 'findMusicians' && <MusicianSearchScreen {...sharedProps} />}
      {screen === 'musicianDetail' && <MusicianDetailScreen {...sharedProps} />}
      {screen === 'bookings' && <BookingRequestsScreen {...sharedProps} />}
      {screen === 'inbox' && <InboxScreen {...sharedProps} />}
      {screen === 'conversation' && <ConversationScreen {...sharedProps} />}
    </SafeAreaView>
  );
}
