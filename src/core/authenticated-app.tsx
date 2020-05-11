import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ChatView from 'modules/chat/chat-view';

const AuthenticatedApp: React.FC = () => (
  <Switch>
    <Route path="/" exact>
      <ChatView />
    </Route>
  </Switch>
);

export default AuthenticatedApp;
