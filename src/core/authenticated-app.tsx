import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuth } from 'modules/auth/auth-context';
import ChatView from 'modules/chat/chat-view';
import SettingsInitial from 'modules/settings/views/settings-initial';

const AuthenticatedApp: React.FC = () => {
  const { user } = useAuth();

  if (!user!.displayName) {
    return <SettingsInitial />;
  }

  return (
    <Switch>
      <Route path="/" exact>
        <ChatView />
      </Route>
    </Switch>
  );
};

export default AuthenticatedApp;
