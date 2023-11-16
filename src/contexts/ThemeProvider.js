import { CssBaseline } from '@mui/material';
import GlobalStyles from '../theme/globalStyles';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { useTheme } from '../theme/useTheme';

/**
 * Initialize the theme provider and pass the theme to the children.
 * Sets the CSS baseline and global styles.
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export const ThemeProvider = ({ children }) => {
  const { theme } = useTheme();

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </MUIThemeProvider>
  );
};
