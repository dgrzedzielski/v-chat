import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import BaseForm from 'core/components/form/base-form';
import BaseFormInput from 'core/components/form/base-form-input';
import { Channel } from 'modules/chat/types';
import ChatMessage from 'modules/chat/components/chat-message';
import { useChannelMessages } from 'modules/chat/hooks/use-channel-messages';
import './chat-conversation.scss';

type ChatConversationProps = {
  currentChannel: Channel;
};

const ChatConversation: React.FC<ChatConversationProps> = ({
  currentChannel,
}) => {
  const {
    messagesListRef,
    loading,
    messages,
    sendMessage,
    newMessageContent,
    setNewMessageContent,
  } = useChannelMessages(currentChannel);
  const { t } = useTranslation();

  const conversationContent = React.useMemo(() => {
    if (loading) {
      return (
        <div className="chat-conversation__loader-container">
          <CircularProgress size={50} color="primary" />
        </div>
      );
    }

    if (messages.length === 0) {
      return (
        <Typography
          variant="body1"
          className="chat-conversation__no-messages-info"
        >
          {t('chat.noMessages')}
        </Typography>
      );
    }

    return (
      <div className="chat-conversation__messages-list-container">
        <List ref={messagesListRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
        </List>
      </div>
    );
  }, [loading, messages, messagesListRef, t]);

  return (
    <>
      <Card className="chat-conversation">
        <header className="chat-conversation__header">
          <Typography variant="h6" component="h3">
            {`#${currentChannel.name}`}
          </Typography>
          <Typography
            variant="subtitle2"
            component="h3"
            className="chat-conversation__description"
            color="textSecondary"
          >
            {currentChannel.description}
          </Typography>
        </header>
        <Divider />
        <CardContent className="chat-conversation__content">
          {conversationContent}
          <div className="chat-conversation__form-container">
            <BaseForm onSubmit={sendMessage} withoutErrors>
              <BaseFormInput
                autoFocus
                onChange={setNewMessageContent}
                value={newMessageContent}
                name="new-message-input"
                margin="dense"
                placeholder={t('chat.typeMessage')}
                className="chat-conversation__input"
                label=""
              />
            </BaseForm>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ChatConversation;
