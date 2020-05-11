import React from 'react';
import { Children } from 'core/common-types';
import AppToolbar from './app-toolbar';
import AppDrawer from './app-drawer';

type WithDrawerLayoutProps = {
  children: Children;
  drawerContent: Children;
};

const WithDrawerLayout: React.FC<WithDrawerLayoutProps> = ({
  children,
  drawerContent,
}) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);

  const toggleMobileDrawer = () => setIsMobileDrawerOpen((isOpen) => !isOpen);

  return (
    <div className="layout layout--with-drawer">
      <AppToolbar showDrawerToggle toggleDrawer={toggleMobileDrawer} />
      <AppDrawer
        isMobileDrawerOpen={isMobileDrawerOpen}
        toggleMobileDrawer={toggleMobileDrawer}
      >
        {drawerContent}
      </AppDrawer>
      <main className="layout__content">
        <div className="layout__toolbar" />
        {children}
      </main>
    </div>
  );
};

export default WithDrawerLayout;
