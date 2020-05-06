import React from 'react';
import ReactDOM from 'react-dom';
import 'core/i18n';
import * as serviceWorker from 'service-worker';
import { App } from 'core/app';
import { AppProviders } from 'core/app-providers';
import 'scss/styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
