import React from 'react';
import List from '@material-ui/core/List';
import { Message } from 'modules/chat/types';
import ChatMessage from 'modules/chat/components/chat-message';

type ChatMessagesProps = {
  messages: Message[];
};

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const listRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo(
        0,
        listRef.current.firstElementChild!.scrollHeight
      );
    }
  }, [messages, listRef]);

  return (
    <div className="chat-conversation__messages-list-container" ref={listRef}>
      <List>
        {messages.map((message) => (
          <ChatMessage message={message} key={message.id} />
        ))}
      </List>
    </div>
  );
};

export default ChatMessages;
