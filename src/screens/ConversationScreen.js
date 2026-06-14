import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { PrimaryButton, SecondaryButton } from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import FormInput from '../components/FormInput';
import Header from '../components/Header';
import { styles } from '../styles/styles';

export default function ConversationScreen({
  currentUser,
  selectedConversation,
  messagesByConversation,
  sendMessage,
  navigate,
}) {
  const [draft, setDraft] = useState('');

  if (!selectedConversation) return <EmptyState message="Conversation not found." />;

  const messages = messagesByConversation[selectedConversation.id] || [];

  function submit() {
    sendMessage(selectedConversation.id, draft);
    setDraft('');
  }

  return (
    <ScrollView contentContainerStyle={styles.screenContent}>
      <Header title="Conversation" subtitle={selectedConversation.title} />
      <View style={styles.messageList}>
        {messages.map((message) => {
          const isMine = message.senderId === currentUser?.id;
          return (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                isMine ? styles.mine : styles.theirs,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
              <Text style={styles.messageMeta}>{message.createdAt}</Text>
            </View>
          );
        })}
        {messages.length === 0 && (
          <EmptyState message="No messages yet. Send the first one." />
        )}
      </View>
      <FormInput
        label="New message"
        value={draft}
        onChangeText={setDraft}
        multiline
      />
      <PrimaryButton label="Send message" onPress={submit} />
      <SecondaryButton label="Back to inbox" onPress={() => navigate('inbox')} />
    </ScrollView>
  );
}
