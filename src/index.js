// mock api
import './demo/_apis_';

// i18n
import './locales/i18n';

// highlight
import './utils/highlight';

// scroll bar
import 'simplebar/src/simplebar.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// lightbox
import 'react-image-lightbox/style.css';

// editor
import 'react-quill/dist/quill.snow.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// amplify authenticator
// https://stackoverflow.com/a/71793890
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';

// lazy image
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistor, store} from './demo/redux/store';
import LoadingScreen from './demo/components/LoadingScreen';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Amplify from "@aws-amplify/core";
import awsmobile from "./aws-exports";
import {Analytics} from "@aws-amplify/analytics";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

// ----------------------------------------------------------------------

// ensures that oAuth redirects happen regardless of where the user is
awsmobile.oauth.redirectSignIn = `${window.location.origin}/`;
// awsmobile.oauth.redirectSignOut = `${window.location.origin}/`;

/**
 * Configure AWS Amplify provider globally.
 */
Amplify.configure(awsmobile);
Amplify.addPluggable(new AmazonAIPredictionsProvider());


/**
 * Initialize the AWS Amplify Analytics session
 */
Analytics.autoTrack('session', {
  // REQUIRED, turn on/off the auto tracking
  enable: true,
  // OPTIONAL, the event name, by default is 'pageView'
  eventName: 'pageView',
  // OPTIONAL, the attributes of the event, you can either pass an object or a function
  // which allows you to define dynamic attributes
  attributes: {
    attr: 'attr'
  },
  type: 'SPA',
  // OPTIONAL, the service provider, by default is the Amazon Pinpoint
  provider: 'AWSPinpoint',
  // OPTIONAL, to get the current page url
  getUrl: () => {
    // the default function
    return window.location.origin + window.location.pathname;
  }
});

ReactDOM.render(
  <HelmetProvider>
    <ReduxProvider store={store}>
      <PersistGate loading={<LoadingScreen/>} persistor={persistor}>
        <BrowserRouter>
          <DevSupport
            ComponentPreviews={ComponentPreviews}
            useInitialHook={useInitial}
          >
            <App/>
          </DevSupport>
        </BrowserRouter>
      </PersistGate>
    </ReduxProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
