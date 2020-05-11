import React from 'react';
import { TFunctionResult } from 'i18next';

export type Children = React.ReactChild | TFunctionResult;

export enum DbCollection {
  channels = 'channels',
  messages = 'messages',
}
