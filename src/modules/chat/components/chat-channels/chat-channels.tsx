import React from 'react';
import { Channel } from 'modules/chat/types';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

type ChatChannelsProps = {
  channels: Channel[];
  changeChannel: (channel: Channel) => void;
};

const ChatChannels: React.FC<ChatChannelsProps> = ({
  channels,
  changeChannel,
}) => (
  <>
    <Typography variant="h6">Channels</Typography>
    {channels.map((channel) => (
      <ListItem
        button
        key={channel.name}
        onClick={() => changeChannel(channel)}
      >
        <ListItemIcon>
          <Typography variant="h6" component="span">
            #
          </Typography>
        </ListItemIcon>
        <ListItemText primary={channel.name} />
      </ListItem>
    ))}
  </>
);

export default ChatChannels;
