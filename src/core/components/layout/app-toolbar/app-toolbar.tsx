import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import './app-toolbar.scss';

type AppToolbarProps = {
  toggleDrawer?: () => void;
  showDrawerToggle?: boolean;
};

const AppToolbar: React.FC<AppToolbarProps> = ({
  toggleDrawer,
  showDrawerToggle = false,
}) => {
  return (
    <AppBar position="fixed" className="app-toolbar" elevation={3}>
      <Toolbar>
        {showDrawerToggle && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            className="app-toolbar__toggle-drawer"
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="h1" noWrap>
          VChat
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
