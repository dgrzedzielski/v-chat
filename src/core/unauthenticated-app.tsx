import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginView from 'modules/auth/views/login-view';
import RegisterView from 'modules/auth/views/register-view';

const UnauthenticatedApp: React.FC = () => (
  <Switch>
    <Route path="/register" exact>
      <RegisterView />
    </Route>
    <Route path="/" exact>
      <LoginView />
    </Route>
  </Switch>
);

export default UnauthenticatedApp;
