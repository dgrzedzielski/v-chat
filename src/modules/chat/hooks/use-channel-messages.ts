import React from 'react';
import ChatService from 'modules/chat/chat-service';
import { useMessages } from 'modules/chat/hooks/use-messages';
import { Channel, Message } from 'modules/chat/types';

type DocumentMessageChange = firebase.firestore.DocumentChange<Message>;

export const useChannelMessages = (currentChannel: Channel) => {
  const {
    messages,
    setMessages,
    newMessageContent,
    setNewMessageContent,
    loading,
    setLoading,
    messagesListRef,
    scrollListToBottom,
    updateScrolledState,
  } = useMessages();

  const handleMessagesChange = React.useCallback(
    (snapshot) => {
      const newData = snapshot
        .docChanges()
        .reverse() // Because we are limiting to 100 newest messages
        .filter(({ type }: DocumentMessageChange) => type === 'added')
        .map((change: DocumentMessageChange) => ({
          ...change.doc.data(),
          id: change.doc.id,
        }));

      updateScrolledState();
      setMessages((currentMessages) => currentMessages.concat(newData));
      setLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setLoading, setMessages]
  );

  const subscribeForMessageChanges = React.useCallback(() => {
    return ChatService.channelsCollection
      .doc(currentChannel.name)
      .collection('messages')
      .orderBy('createdAtTimestamp', 'desc')
      .limit(100)
      .onSnapshot(handleMessagesChange);
  }, [currentChannel, handleMessagesChange]);

  React.useEffect(() => {
    setLoading(true);
    setMessages([]);
  }, [currentChannel.name, setLoading, setMessages]);

  React.useEffect(() => {
    const unsubscribe = subscribeForMessageChanges();

    return () => unsubscribe();
  }, [subscribeForMessageChanges]);

  const sendMessage = React.useCallback(async () => {
    if (newMessageContent.length === 0) return;

    try {
      await ChatService.sendMessage(currentChannel.name, newMessageContent);
      scrollListToBottom();
    } catch (e) {
      // TODO HANDLE ERROR
      // setError(e.message);
    }
    setNewMessageContent('');
  }, [
    newMessageContent,
    currentChannel.name,
    scrollListToBottom,
    setNewMessageContent,
  ]);

  return {
    sendMessage,
    messagesListRef,
    messages,
    loading,
    newMessageContent,
    setNewMessageContent,
  };
};
