import React from 'react';
import { ScrollView, Text } from 'react-native';

import { SecondaryButton } from '../components/AppButton';
import { PressableCard } from '../components/Card';
import EmptyState from '../components/EmptyState';
import Header from '../components/Header';
import { styles } from '../styles/styles';

export default function InboxScreen({
  currentUser,
  conversations,
  messagesByConversation,
  navigate,
}) {
  const visibleConversations = conversations.filter((conversation) =>
    conversation.participantIds.includes(currentUser?.id)
  );

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <Header title="Inbox" subtitle="Messages with musicians and venues." />
      {visibleConversations.map((conversation) => {
        const messages = messagesByConversation[conversation.id] || [];
        const lastMessage = messages[messages.length - 1];

        return (
          <PressableCard
            key={conversation.id}
            onPress={() =>
              navigate('conversation', { conversationId: conversation.id })
            }
          >
            <Text style={styles.cardTitle}>{conversation.title}</Text>
            <Text style={styles.bodyText}>
              {lastMessage?.text || 'No messages yet.'}
            </Text>
            <Text style={styles.smallNote}>Updated: {conversation.updatedAt}</Text>
          </PressableCard>
        );
      })}
      {visibleConversations.length === 0 && (
        <EmptyState message="No conversations yet." />
      )}
      <SecondaryButton label="Back to dashboard" onPress={() => navigate('home')} />
    </ScrollView>
  );
}
