import React from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import BaseButton from 'core/components/ui/base-button/base-button';
import AuthService from 'modules/auth/auth-service';
import './app-toolbar.scss';

type AppToolbarProps = {
  toggleDrawer?: () => void;
  showDrawerToggle?: boolean;
};

const AppToolbar: React.FC<AppToolbarProps> = ({
  toggleDrawer,
  showDrawerToggle = false,
}) => {
  const { t } = useTranslation();

  const logout = () => {
    AuthService.logout();
  };

  return (
    <AppBar position="fixed" className="app-toolbar__container" elevation={3}>
      <Toolbar className="app-toolbar">
        {showDrawerToggle && (
          <IconButton
            color="inherit"
            aria-label={t('common.openDrawer')}
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
        <BaseButton color="inherit" variant="text" onClick={logout}>
          {t('common.logout')}
        </BaseButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
