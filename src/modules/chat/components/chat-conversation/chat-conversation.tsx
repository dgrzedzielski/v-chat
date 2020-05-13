import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import BaseForm from 'core/components/form/base-form';
import BaseFormInput from 'core/components/form/base-form-input';
import { Channel, Message } from 'modules/chat/types';
import ChatService from 'modules/chat/chat-service';
import ChatMessages from 'modules/chat/components/chat-messages';
import './chat-conversation.scss';

type DocumentMessageChange = firebase.firestore.DocumentChange<Message>;

type ChatConversationProps = {
  currentChannel: Channel;
};

const ChatConversation: React.FC<ChatConversationProps> = ({
  currentChannel,
}) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [newMessageContent, setNewMessageContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();

  const handleMessagesChange = React.useCallback((snapshot) => {
    const newData = snapshot
      .docChanges()
      .filter(({ type }: DocumentMessageChange) => type === 'added')
      .map((change: DocumentMessageChange) => ({
        ...change.doc.data(),
        id: change.doc.id,
      }));

    setMessages((currentMessages) => currentMessages.concat(newData));
    setLoading(false);
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
    setLoading(true);
    setMessages([]);
  }, [currentChannel.name]);

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

    return <ChatMessages messages={messages} />;
  }, [messages, loading, t]);

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
