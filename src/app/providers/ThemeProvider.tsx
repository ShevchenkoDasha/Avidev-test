import { createTheme } from '@mui/material/styles';
import { ThemeProvider as MatThemeProvider } from '@mui/material/styles';
import { memo, type ReactNode } from 'react';
import { CssBaseline } from '@mui/material';

import { breakpoints } from '@/shared/constants/responsive-data.ts';

interface PropsModel {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#166534',
    },
    secondary: {
      main: '#4ADE80',
    },
    background: {
      default: '#09090B',
      paper: '#18181B',
    },
    text: {
      primary: '#FAFAFA',
      secondary: '#A1A1AA',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'var(--font-sans)', // body / default
    h1: { fontFamily: 'var(--font-display)', fontWeight: 700 },
    h2: { fontFamily: 'var(--font-display)', fontWeight: 700 },
    h3: { fontFamily: 'var(--font-display)', fontWeight: 700 },
    button: { fontFamily: 'var(--font-display)', textTransform: 'uppercase' },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: breakpoints.phablet,
      md: breakpoints.tablet,
      lg: breakpoints.laptop,
      xl: breakpoints.desktop,
    },
  },
  zIndex: {
    appBar: 9,
    drawer: 10,
    modal: 11,
    snackbar: 12,
    tooltip: 13,
  },
});

const ThemeProvider = memo((props: PropsModel) => {
  return (
    <MatThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </MatThemeProvider>
  );
});

ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;
