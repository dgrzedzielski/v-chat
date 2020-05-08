import { createMuiTheme } from '@material-ui/core';
import { deepPurple, lightBlue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: lightBlue,
    secondary: {
      main: deepPurple.A200,
    },
  },
});

export default theme;
