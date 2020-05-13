import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { deepPurple, lightBlue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: lightBlue,
    secondary: {
      main: deepPurple.A200,
    },
    divider: 'rgba(255, 255, 255, 0.1)',
    contrastThreshold: 5,
  },
});

export default theme;
