export const initialUsers = [
  {
    id: 'm1',
    role: 'musician',
    displayName: 'Maya Rivers',
    email: 'maya@example.com',
  },
  {
    id: 'o1',
    role: 'venueOwner',
    displayName: 'Jordan Lee',
    email: 'jordan@example.com',
  },
];

export const initialMusicians = [
  {
    id: 'm1',
    ownerId: 'm1',
    stageName: 'Maya Rivers Trio',
    contactName: 'Maya Rivers',
    genres: ['Jazz', 'Soul', 'R&B'],
    instruments: ['Vocals', 'Keys', 'Bass'],
    city: 'Champaign, IL',
    travelRadius: '40 miles',
    rateRange: '$600 - $1,000',
    availability: 'Thu, Fri, Sat evenings',
    bio:
      'A polished jazz and soul trio for lounges, cocktail hours, private events, and restaurants.',
  },
  {
    id: 'm2',
    ownerId: 'm2',
    stageName: 'The Prairie Lines',
    contactName: 'Evan Carter',
    genres: ['Country', 'Folk', 'Americana'],
    instruments: ['Guitar', 'Fiddle', 'Vocals'],
    city: 'Urbana, IL',
    travelRadius: '60 miles',
    rateRange: '$500 - $900',
    availability: 'Weekends',
    bio:
      'Acoustic Americana band with a relaxed sound for breweries, wineries, and community events.',
  },
  {
    id: 'm3',
    ownerId: 'm3',
    stageName: 'DJ Nova Set',
    contactName: 'Nora Patel',
    genres: ['Pop', 'Dance', 'Electronic'],
    instruments: ['DJ', 'Lighting'],
    city: 'Bloomington, IL',
    travelRadius: '75 miles',
    rateRange: '$800 - $1,500',
    availability: 'Fri and Sat nights',
    bio:
      'High-energy DJ for late-night venues, weddings, college events, and dance floors.',
  },
];

export const initialVenues = [
  {
    id: 'v1',
    ownerId: 'o1',
    name: 'The Green Room',
    city: 'Champaign, IL',
    venueType: 'Lounge',
    capacity: 120,
    typicalGenres: ['Jazz', 'Soul', 'Acoustic'],
    bookingBudget: '$500 - $1,200',
    contactName: 'Jordan Lee',
    description:
      'An intimate lounge that books polished live acts for Thursday through Saturday evenings.',
  },
  {
    id: 'v2',
    ownerId: 'o2',
    name: 'Rail Yard Brewing',
    city: 'Urbana, IL',
    venueType: 'Brewery',
    capacity: 180,
    typicalGenres: ['Folk', 'Rock', 'Americana'],
    bookingBudget: '$400 - $900',
    contactName: 'Taylor Morgan',
    description:
      'A casual brewery with weekend music, patio shows, and local-band nights.',
  },
  {
    id: 'v3',
    ownerId: 'o3',
    name: 'Neon Hall',
    city: 'Bloomington, IL',
    venueType: 'Event Space',
    capacity: 350,
    typicalGenres: ['Pop', 'Dance', 'Electronic'],
    bookingBudget: '$900 - $2,500',
    contactName: 'Alex Kim',
    description:
      'A flexible event hall for private events, DJ nights, and larger ticketed performances.',
  },
];

export const initialBookingRequests = [
  {
    id: 'b1',
    musicianId: 'm1',
    venueId: 'v1',
    venueOwnerId: 'o1',
    requestedDate: '2026-07-18',
    status: 'pending',
    message:
      'We would love to play a Saturday evening jazz/soul set. We can provide a 90-minute or 2-hour performance.',
    createdAt: '2026-06-07',
  },
];

export const initialConversations = [
  {
    id: 'c1',
    participantIds: ['m1', 'o1'],
    bookingRequestId: 'b1',
    title: 'Maya Rivers Trio \u2194 The Green Room',
    updatedAt: '2026-06-07',
  },
];

export const initialMessagesByConversation = {
  c1: [
    {
      id: 'msg1',
      senderId: 'm1',
      text: 'Hi Jordan, we would love to play The Green Room on July 18.',
      createdAt: '2026-06-07 10:30 AM',
    },
    {
      id: 'msg2',
      senderId: 'o1',
      text: 'Thanks Maya. I am interested. What does your setup require?',
      createdAt: '2026-06-07 11:05 AM',
    },
  ],
};
