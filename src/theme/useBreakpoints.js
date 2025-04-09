import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

export const useBreakpoints = () => {
  const theme = useTheme();

  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  const isMedium = useMediaQuery(theme.breakpoints.down('lg'));

  const isLarge = useMediaQuery(theme.breakpoints.down('xl'));

  const isExtraLarge = useMediaQuery(theme.breakpoints.down('xxl'));

  return {
    isSmall,
    isMedium,
    isLarge,
    isExtraLarge
  };
};
