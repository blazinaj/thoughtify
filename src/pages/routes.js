import {lazy, Suspense} from 'react';
import {Navigate, useRoutes} from 'react-router-dom';
// layouts
import MainLayout from '../layouts/marketing';
import ApplicationLayout from '../layouts/application';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../demo/components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            top: 0,
            left: 0,
            width: 1,
            zIndex: 9999,
            position: 'fixed'
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

/**
 * This is the main router for the application. It is responsible for
 * routing the user to the correct page based on the URL path.
 *
 * Main routes are:
 * - /learn
 * - /teach
 * - /interact
 * - / (marketing)
 *
 * @returns {React.ReactElement}
 * @constructor
 */
export default function Router() {
  return useRoutes([

    // User Application Routes
    {
      path: 'thoughts',
      element: (
        <AuthGuard>
          <ApplicationLayout />
        </AuthGuard>
      ),
      children: [
        { path: '', element: <ThoughtsPage /> },
        { path: '*', element: <Navigate to="/thoughts" replace /> }
      ]
    },

    {
      path: 'journal',
      element: (
        <AuthGuard>
          <ApplicationLayout />
        </AuthGuard>
      ),
      children: [
        { path: '', element: <JournalPage /> },
        { path: '*', element: <Navigate to="/journal" replace /> }
      ]
    },

    {
      path: 'biography',
      element: (
        <AuthGuard>
          <ApplicationLayout />
        </AuthGuard>
      ),
      children: [
        { path: '', element: <BiographyPage /> },
        { path: '*', element: <Navigate to="/biography" replace /> }
      ]
    },

    {
      path: 'health',
      element: (
        <AuthGuard>
          <ApplicationLayout />
        </AuthGuard>
      ),
      children: [
        { path: '', element: <HealthPage /> },
        { path: '*', element: <Navigate to="/health" replace /> }
      ]
    },

    {
      path: 'user',
      element: (
          <AuthGuard>
            <ApplicationLayout />
          </AuthGuard>
      ),
      children: [
        { path: '', element: <HealthPage /> },
      ]
    },

    // Marketing Routes
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <LandingPage /> },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
        { path: 'privacy', element: <Privacy/> },
        { path: 'terms-and-conditions', element: <TermsAndConditions/> },
        { path: 'pricing', element: <Pricing /> },
      ]
    },

    // Redirects the home page to the lesson dashboard
    {path: 'home', element: <Navigate to={"/thoughts"}/>},

    // Wildcard Routes, used to display pages keeping the path intact
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
  ], "");
}

// IMPORT COMPONENTS
const ThoughtsPage = Loadable(lazy(() => import('./thoughts/ThoughtsPage')));
const JournalPage = Loadable(lazy(() => import('./journal/JournalPage')));
const BiographyPage = Loadable(lazy(() => import('./biography/BiographyPage')));
const HealthPage = Loadable(lazy(() => import('./health/HealthPage')));

// Main
const LandingPage = Loadable(lazy(() => import('./marketing/LandingPage')));
const About = Loadable(lazy(() => import('./marketing/About')));
const Contact = Loadable(lazy(() => import('./marketing/Contact')));
const Faqs = Loadable(lazy(() => import('./marketing/Faqs')));
const ComingSoon = Loadable(lazy(() => import('./marketing/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('./marketing/Maintenance')));
const Pricing = Loadable(lazy(() => import('./marketing/Pricing')));
const Payment = Loadable(lazy(() => import('./marketing/Payment')));
const Page500 = Loadable(lazy(() => import('./marketing/Page500')));
const NotFound = Loadable(lazy(() => import('./marketing/Page404')));
const Privacy = Loadable(lazy(() => import('./marketing/Privacy')));
const TermsAndConditions = Loadable(lazy(() => import('./marketing/TermsAndConditions')));
