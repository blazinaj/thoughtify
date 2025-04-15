import useSettings from '../utils/hooks/useSettings';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import { alpha, createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import shape from './shape';
import typography from './typography';
import breakpoints from './breakpoints';
import componentsOverride from './overrides';

/**
 * Creates the theme object to and modifies it based on the user settings.
 * Passes the theme to the ThemeProvider
 *
 * @returns {{theme: Theme}}
 */
export const useTheme = () => {
  const { themeMode, themeDirection, setColor } = useSettings();
  const isLight = themeMode === 'light';

  const getPalette = () => {
    let _palette = {};

    if (isLight) {
      _palette = { ...palette.light };
      _palette.mode = 'light';
    } else {
      _palette = { ...palette.dark };
      _palette.mode = 'dark';
    }

    if (setColor) {
      _palette.primary = setColor;
    }

    // add 'grey' color for buttons
    _palette.grey = {
      'main': '#757575',
      'dark': '#757575',
      'light': '#BDBDBD',
        'contrastText': '#FFFFFF',
        100: '#F5F5F5',
        200: '#E0E0E0',
        300: '#BDBDBD',
        400: '#9E9E9E',
        500: '#757575',
        600: '#616161',
        700: '#424242',
        800: '#212121',
        900: '#000000',
    }

    return _palette;
  };

  const getCustomShadows = () => {
    let _customShadows = { ...customShadows.light };

    if (isLight) {
      _customShadows = customShadows.light;
    } else {
      _customShadows = customShadows.dark;
    }

    if (setColor) {
      _customShadows.primary = `0 8px 16px 0 ${alpha(setColor.main, 0.24)}`;
    }

    return _customShadows;
  };

  const themeOptions = useMemo(
    () => ({
      palette: getPalette(),
      shape,
      typography,
      breakpoints,
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: getCustomShadows()
    }),
    [themeDirection, isLight, setColor]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return {
    theme
  };
};
