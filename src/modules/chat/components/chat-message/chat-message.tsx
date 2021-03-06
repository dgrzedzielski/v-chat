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
import { useAuth } from 'modules/auth/auth-context';
import { Message } from 'modules/chat/types';
import './chat-message.scss';
import Tooltip from '@material-ui/core/Tooltip';

type ChatMessageProps = {
  message: Message;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  message: { createdAtTimestamp, content, sender },
}) => {
  const { user } = useAuth();
  const createdAt = React.useMemo(() => createdAtTimestamp.toDate(), [
    createdAtTimestamp,
  ]);

  const formattedCreatedAt = React.useMemo(() => {
    const time = asStandardTimeFormat(createdAt);

    if (isToday(createdAt)) {
      return time;
    }

    return `${asStandardDateFormat(createdAt)} ${time}`;
  }, [createdAt]);

  const isSentByCurrentUser = user!.uid === sender.id;

  return (
    <>
      <ListItem className="chat-message__container">
        <div
          className={clsx('chat-message', {
            'chat-message--left': !isSentByCurrentUser,
            'chat-message--right': isSentByCurrentUser,
          })}
        >
          <Tooltip title={sender.displayName} enterTouchDelay={0}>
            <ListItemAvatar className="chat-message__avatar-container">
              <Avatar
                src={sender.avatarUrl || ''}
                className="chat-message__avatar"
              >
                {sender.displayName.split('')[0]}
              </Avatar>
            </ListItemAvatar>
          </Tooltip>
          <Tooltip
            enterTouchDelay={0}
            title={
              <Typography variant="caption" color="textSecondary">
                <time dateTime={createdAt.toLocaleTimeString()}>
                  {formattedCreatedAt}
                </time>
              </Typography>
            }
          >
            <Typography variant="body2" className="chat-message__content">
              {content}
            </Typography>
          </Tooltip>
        </div>
      </ListItem>
    </>
  );
};

export default ChatMessage;
