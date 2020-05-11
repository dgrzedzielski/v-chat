import React from 'react';
import WithDrawerLayout from 'core/components/layout/with-drawer-layout';
import { Channel } from './types';
import ChatService from './chat-service';
import ChatMessages from './components/chat-conversation';
import ChatChannels from './components/chat-channels/chat-channels';

const ChatView: React.FC = () => {
  const [channels, setChannels] = React.useState<Channel[]>([]);
  const [currentChannel, setCurrentChannel] = React.useState<Channel>();

  const fetchChannels = React.useCallback(async () => {
    try {
      const data = await ChatService.fetchChannels();
      setChannels(data);
      setCurrentChannel(data[0]);
    } catch (e) {
      console.log(e);
    } finally {
      // set loading to false
    }
  }, []);

  React.useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  return (
    <WithDrawerLayout
      drawerContent={
        <ChatChannels channels={channels} changeChannel={setCurrentChannel} />
      }
    >
      {currentChannel && <ChatMessages currentChannel={currentChannel} />}
    </WithDrawerLayout>
  );
};

export default ChatView;
