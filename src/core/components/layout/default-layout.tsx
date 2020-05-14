import React from 'react';
import { Children } from 'core/common-types';
import AppToolbar from './app-toolbar';

type DefaultLayoutProps = {
  children: Children;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => (
  <div className="layout">
    <AppToolbar />
    <main className="layout__content">
      <div className="layout__toolbar" />
      {children}
    </main>
  </div>
);

export default DefaultLayout;
