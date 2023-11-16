import PropTypes from 'prop-types';
// material
import { adaptV4Theme, alpha, createTheme, StyledEngineProvider, ThemeProvider, useTheme } from '@mui/material/styles';
// hooks
import useLocales from '../utils/hooks/useLocales';
import React, { useMemo } from 'react';
import useSettings from '../utils/hooks/useSettings';
import componentsOverride from '../theme/overrides';

// ----------------------------------------------------------------------

ThemeLocalizationProvider.propTypes = {
  children: PropTypes.node
};

export default function ThemeLocalizationProvider({ children }) {
  const defaultTheme = useTheme();

  const { setColor } = useSettings();

  const themeOptions = useMemo(
    () => ({
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette,
        primary: setColor
      },
      customShadows: {
        ...defaultTheme.customShadows,
        primary: `0 8px 16px 0 ${alpha(setColor.main, 0.24)}`
      }
    }),
    [setColor, defaultTheme]
  );

  const theme = createTheme(adaptV4Theme(themeOptions));

  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
}
