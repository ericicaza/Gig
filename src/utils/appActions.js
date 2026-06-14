function dateStamp(date) {
  return date.toISOString().slice(0, 10);
}

export function createBookingRequest({
  currentUser,
  currentMusician,
  venue,
  requestedDate,
  message,
  timestamp = Date.now(),
  now = new Date(),
}) {
  const requestId = `b${timestamp}`;
  const conversationId = `c${timestamp}`;
  const createdAt = dateStamp(now);

  return {
    bookingRequest: {
      id: requestId,
      musicianId: currentMusician.id,
      venueId: venue.id,
      venueOwnerId: venue.ownerId,
      requestedDate,
      status: 'pending',
      message,
      createdAt,
    },
    conversation: {
      id: conversationId,
      participantIds: [currentUser.id, venue.ownerId],
      bookingRequestId: requestId,
      title: `${currentMusician.stageName} \u2194 ${venue.name}`,
      updatedAt: createdAt,
    },
    message: {
      id: `msg${timestamp}`,
      senderId: currentUser.id,
      text: message,
      createdAt: now.toLocaleString(),
    },
  };
}

export function updateBookingStatus(bookingRequests, requestId, status) {
  return bookingRequests.map((request) =>
    request.id === requestId ? { ...request, status } : request
  );
}

export function findDirectConversationWithMusician(
  conversations,
  currentUser,
  musician
) {
  const existingConversation = conversations.find((conversation) => {
    const hasCurrentUser = conversation.participantIds.includes(currentUser.id);
    const hasMusician = conversation.participantIds.includes(musician.ownerId);
    return hasCurrentUser && hasMusician && !conversation.bookingRequestId;
  });

  return existingConversation?.id || null;
}

export function createDirectConversationWithMusician({
  currentUser,
  currentVenue,
  musician,
  timestamp = Date.now(),
  now = new Date(),
}) {
  return {
    id: `c${timestamp}`,
    participantIds: [currentUser.id, musician.ownerId],
    bookingRequestId: null,
    title: `${currentVenue.name} \u2194 ${musician.stageName}`,
    updatedAt: dateStamp(now),
  };
}

export function sendMessage({
  conversations,
  messagesByConversation,
  conversationId,
  currentUser,
  text,
  timestamp = Date.now(),
  now = new Date(),
}) {
  const trimmedText = text.trim();

  if (!trimmedText || !currentUser) return null;

  const newMessage = {
    id: `msg${timestamp}`,
    senderId: currentUser.id,
    text: trimmedText,
    createdAt: now.toLocaleString(),
  };

  return {
    messagesByConversation: {
      ...messagesByConversation,
      [conversationId]: [
        ...(messagesByConversation[conversationId] || []),
        newMessage,
      ],
    },
    conversations: conversations.map((conversation) =>
      conversation.id === conversationId
        ? { ...conversation, updatedAt: dateStamp(now) }
        : conversation
    ),
  };
}

export function updateMusicianProfile(musicians, updatedProfile) {
  return musicians.map((musician) =>
    musician.id === updatedProfile.id ? updatedProfile : musician
  );
}

export function updateVenueProfile(venues, updatedProfile) {
  return venues.map((venue) =>
    venue.id === updatedProfile.id ? updatedProfile : venue
  );
}
