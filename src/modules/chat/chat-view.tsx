import React from 'react';
import WithDrawerLayout from 'core/components/layout/with-drawer-layout';
import FullScreenLoader from 'core/components/ui/full-screen-loader';
import Typography from '@material-ui/core/Typography';
import { Channel } from './types';
import ChatService from './chat-service';
import ChatChannels from './components/chat-channels';
import ChatConversation from './components/chat-conversation';

const ChatView: React.FC = () => {
  const [channels, setChannels] = React.useState<Channel[]>([]);
  const [currentChannel, setCurrentChannel] = React.useState<Channel>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchChannels = React.useCallback(async () => {
    setLoading(true);

    try {
      const data = await ChatService.fetchChannels();
      setChannels(data);
      setCurrentChannel(data[0]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  if (loading) {
    return <FullScreenLoader />;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <WithDrawerLayout
      drawerContent={
        <ChatChannels channels={channels} changeChannel={setCurrentChannel} />
      }
    >
      {currentChannel && <ChatConversation currentChannel={currentChannel} />}
    </WithDrawerLayout>
  );
};

export default ChatView;
