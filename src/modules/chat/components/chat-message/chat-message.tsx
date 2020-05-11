import React from 'react';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {
  isToday,
  asStandardDateFormat,
  asStandardTimeFormat,
} from 'core/utils/date-utils';
import './chat-message.scss';
import { useAuth } from 'modules/auth/auth-context';
import { Message } from 'modules/chat/types';

type ChatMessageProps = {
  message: Message;
  rightAligned?: boolean;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  message: { createdAtTimestamp, content, sender },
}) => {
  const { user } = useAuth();

  const formattedCreatedAt = React.useMemo(() => {
    const createdAt = createdAtTimestamp.toDate();
    const time = asStandardTimeFormat(createdAt);

    if (isToday(createdAt)) {
      return time;
    }

    return `${asStandardDateFormat(createdAt)} ${time}`;
  }, [createdAtTimestamp]);

  const isSentByCurrentUser = user!.uid === sender.id;

  return (
    <>
      <ListItem
        className={clsx('chat-message', {
          'chat-message--left': !isSentByCurrentUser,
          'chat-message--right': isSentByCurrentUser,
        })}
      >
        <ListItemAvatar>
          <Avatar src={sender.avatarUrl || ''} className="chat-message__avatar">
            {sender.displayName.split('')[0]}
          </Avatar>
        </ListItemAvatar>
        <Typography
          variant="caption"
          className="chat-message__created-at"
          color="textSecondary"
        >
          <time dateTime={new Date().toLocaleTimeString()}>
            {formattedCreatedAt}
          </time>
        </Typography>
        <Typography variant="body2" className="chat-message__content">
          {content}
        </Typography>
      </ListItem>
    </>
  );
};

export default ChatMessage;
