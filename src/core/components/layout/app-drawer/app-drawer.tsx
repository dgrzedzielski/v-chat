import React from 'react';
import { Hidden, Drawer } from '@material-ui/core';
import { Children } from 'core/common-types';
import './app-drawer.scss';

type AppDrawerProps = {
  toggleMobileDrawer: () => void;
  isMobileDrawerOpen: boolean;
  children: Children;
};

const AppDrawer: React.FC<AppDrawerProps> = ({
  children,
  toggleMobileDrawer,
  isMobileDrawerOpen,
}) => {
  return (
    <nav className="app-drawer">
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          open={isMobileDrawerOpen}
          onClose={toggleMobileDrawer}
          classes={{
            paper: 'app-drawer__paper',
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          elevation={3}
        >
          {children}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: 'app-drawer__paper',
          }}
        >
          {children}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default AppDrawer;
