import React, {useEffect} from 'react';
import Router from './pages/routes';
import Settings from './demo/components/settings';
import RtlLayoutContext from './contexts/RtlLayoutContext';
import ScrollToTop from './demo/components/ScrollToTop';
import NotistackProvider from './contexts/NotistackProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers';
import useLocales from "./utils/hooks/useLocales";
import {ThemeProvider} from "./contexts/ThemeProvider";
import {SettingsProvider} from "./contexts/SettingsContext";
import {CollapseDrawerProvider} from "./contexts/CollapseDrawerContext";
import Amplify from "@aws-amplify/core";
import {AmazonAIPredictionsProvider} from "@aws-amplify/predictions";
// ----------------------------------------------------------------------

/**
 * Main Application Component with UI-related providers and the Router.
 *
 * Displays the top level loading screen.
 * Displays the top level settings component.
 * Displays the top level scroll to top component.
 * Displays the top level notistack provider.
 * Displays the top level theme primary color provider.
 * Displays the top level theme localization provider.
 * Displays the top level rtl layout provider.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {

  const { currentLang } = useLocales();

  // useEffect(() => {
  //   try {
  //     Amplify.addPluggable(new AmazonAIPredictionsProvider())
  //   } catch (error) {
  //     console.log('Already added pluggable')
  //     Amplify.removePluggable('AmazonAIPredictionsProvider')
  //   }
  // },[]);

  return (
    <SettingsProvider>
      <CollapseDrawerProvider>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={currentLang}>
            <RtlLayoutContext>
              <NotistackProvider>
                <Settings />
                <ScrollToTop />
                <Viewport/>
              </NotistackProvider>
            </RtlLayoutContext>
          </LocalizationProvider>
        </ThemeProvider>
      </CollapseDrawerProvider>
    </SettingsProvider>
  );
}

const Viewport = () => {
  return (
    <Router />
  )
}

export default App;
