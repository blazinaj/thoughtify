import PropTypes from 'prop-types';
import { useEffect } from 'react';
// rtl
import rtlPlugin from 'stylis-plugin-rtl';
// emotion
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
// material
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

RtlLayoutContext.propTypes = {
  children: PropTypes.node
};

export default function RtlLayoutContext({ children }) {
  const theme = useTheme();

  useEffect(() => {
    document.dir = theme.direction;
  }, [theme.direction]);

  const cacheRtl = createCache({
    key: theme.direction === 'rtl' ? 'rtl' : 'css',
    stylisPlugins: theme.direction === 'rtl' ? [rtlPlugin] : [],
    prepend: true,
  });

  cacheRtl.compat = true;

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
}
