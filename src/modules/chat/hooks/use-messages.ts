import React from 'react';
import { Message } from 'modules/chat/types';

export const useMessages = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [newMessageContent, setNewMessageContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<null | string>(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = React.useState(false);
  const messagesListRef = React.useRef<HTMLUListElement>(null);

  const updateScrolledState = () => {
    if (!messagesListRef.current) {
      setIsScrolledToBottom(false);
      return;
    }

    const messagesContainer = messagesListRef.current.parentElement!;
    const result =
      messagesContainer.scrollHeight - messagesContainer.scrollTop ===
      messagesContainer.offsetHeight;

    setIsScrolledToBottom(result);
  };

  const scrollListToBottom = React.useCallback(() => {
    if (!messagesListRef.current) return;

    const lastMessage = messagesListRef.current.lastElementChild;
    if (!lastMessage) return;

    lastMessage.scrollIntoView({ behavior: 'smooth' });
  }, [messagesListRef]);

  React.useEffect(() => {
    if (!loading) {
      scrollListToBottom();
    }
  }, [loading, scrollListToBottom]);

  React.useEffect(() => {
    if (isScrolledToBottom) {
      scrollListToBottom();
    }
  }, [messages, isScrolledToBottom, scrollListToBottom]);

  return {
    messages,
    setMessages,
    newMessageContent,
    setNewMessageContent,
    loading,
    setLoading,
    messagesListRef,
    isScrolledToBottom,
    updateScrolledState,
    scrollListToBottom,
    error,
    setError,
  };
};
