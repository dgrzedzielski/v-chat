import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import BaseForm from 'core/components/form/base-form';
import { Channel, Message } from 'modules/chat/types';
import ChatService from 'modules/chat/chat-service';
import ChatMessage from '../chat-message';
import './chat-conversation.scss';

type ChatConversationProps = {
  currentChannel: Channel;
};

const ChatConversation: React.FC<ChatConversationProps> = ({
  currentChannel,
}) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [newMessageContent, setNewMessageContent] = React.useState('');
  const { t } = useTranslation();

  const handleMessagesChange = React.useCallback((snapshot) => {
    setMessages(
      snapshot.docs.map((doc: firebase.firestore.DocumentData) => {
        const data = doc.data() as Message;

        return {
          ...data,
          id: doc.id,
        };
      })
    );
  }, []);

  const subscribeForMessageChanges = React.useCallback(() => {
    return ChatService.channelsCollection
      .doc(currentChannel.name)
      .collection('messages')
      .orderBy('createdAtTimestamp')
      .onSnapshot(handleMessagesChange);
  }, [currentChannel, handleMessagesChange]);

  React.useEffect(() => {
    const unsubscribe = subscribeForMessageChanges();

    return () => unsubscribe();
  }, [subscribeForMessageChanges]);

  const sendMessage = React.useCallback(() => {
    try {
      ChatService.sendMessage(currentChannel.name, newMessageContent);
    } catch (e) {
      console.log(e);
    }
    setNewMessageContent('');
  }, [newMessageContent, currentChannel]);

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
          <div className="chat-conversation__messages-list-container">
            {messages.length === 0 ? (
              <Typography variant="body1">{t('chat.noMessages')}</Typography>
            ) : (
              <List className="chat-conversation__messages-list">
                {messages.map((message: Message) => (
                  <ChatMessage message={message} key={message.id} />
                ))}
              </List>
            )}
          </div>
          <div className="chat-conversation__form-container">
            <BaseForm onSubmit={sendMessage} withoutErrors>
              <Input
                value={newMessageContent}
                onChange={(e) => setNewMessageContent(e.target.value)}
                placeholder={t('chat.typeMessage')}
                fullWidth
              />
            </BaseForm>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ChatConversation;
