import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import BaseForm from 'core/components/form/base-form';
import BaseFormInput from 'core/components/form/base-form-input';
import { Channel, Message } from 'modules/chat/types';
import ChatService from 'modules/chat/chat-service';
import ChatMessages from 'modules/chat/components/chat-messages';
import './chat-conversation.scss';

type ChatConversationProps = {
  currentChannel: Channel;
};

const ChatConversation: React.FC<ChatConversationProps> = ({
  currentChannel,
}) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [newMessageContent, setNewMessageContent] = React.useState('');
  const headerRef = React.useRef<HTMLElement>(null);
  const containerRef = React.useRef<HTMLElement>(null);
  const formRef = React.useRef<HTMLDivElement>(null);
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
      .limit(100)
      .onSnapshot(handleMessagesChange);
  }, [currentChannel, handleMessagesChange]);

  React.useEffect(() => {
    const unsubscribe = subscribeForMessageChanges();

    return () => unsubscribe();
  }, [subscribeForMessageChanges]);

  const sendMessage = React.useCallback(async () => {
    if (newMessageContent.length === 0) return;

    try {
      await ChatService.sendMessage(currentChannel.name, newMessageContent);
    } catch (e) {
      // TODO HANDLE ERROR
      // setError(e.message);
    }
    setNewMessageContent('');
  }, [newMessageContent, currentChannel]);

  return (
    <>
      <Card className="chat-conversation" ref={containerRef}>
        <header className="chat-conversation__header" ref={headerRef}>
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
          {messages.length === 0 ? (
            <Typography variant="body1">{t('chat.noMessages')}</Typography>
          ) : (
            <ChatMessages messages={messages} />
          )}
          <Divider />
          <div className="chat-conversation__form-container" ref={formRef}>
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
