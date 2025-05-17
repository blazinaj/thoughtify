import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/marketing';
import ApplicationLayout from '../layouts/application';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../demo/components/LoadingScreen';
import PeoplePage from "./people/PeoplePage";

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
  return useRoutes(
    [
      // Marketing Routes
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { path: '/', element: <LandingPage /> },
          { path: 'about-us', element: <About /> },
          { path: 'contact-us', element: <Contact /> },
          { path: 'faqs', element: <Faqs /> },
          { path: 'privacy', element: <Privacy /> },
          { path: 'terms-and-conditions', element: <TermsAndConditions /> },
          { path: 'pricing', element: <Pricing /> }
        ]
      },

      // User Application Routes
      {
        path: '/',
        element: (
          <AuthGuard>
            <ApplicationLayout />
          </AuthGuard>
        ),
        children: [
            // thoughts
          { path: 'thoughts', exact: true, element: <ThoughtsPage /> },
          { path: 'thoughts/categories/:id', exact: true, element: <CategoryDetailsPage /> },
          { path: 'thoughts/projects/:id', exact: true, element: <ProjectDetailsPage /> },
          { path: 'thoughts/people/:id', exact: true, element: <PeopleDetailsPage /> },
          { path: 'thoughts/places/:id', exact: true, element: <PlaceDetailsPage /> },
          { path: 'thoughts/emotions/:id', exact: true, element: <EmotionDetailsPage /> },
          { path: 'thoughts/reminders/:id', exact: true, element: <ReminderDetailsPage /> },
          { path: 'thoughts/questions/:id', exact: true, element: <QuestionDetailsPage /> },
          { path: 'thoughts/tasks/:id', exact: true, element: <TaskDetailsPage /> },
          { path: 'thoughts/events/:id', exact: true, element: <EventDetailsPage /> },
          { path: 'thoughts/overallTone/:id', exact: true, element: <OverallToneDetailsPage /> },
          { path: 'thoughts/journals/:id', exact: true, element: <JournalDetailsPage /> },
          { path: 'thoughts/:id', exact: true, element: <ThoughtDetailsPage /> },

            // projects
          { path: 'projects', exact: true, element: <ProjectsPage /> },
          { path: 'projects/:id', exact: true, element: <ProjectDetailsPage /> },

            // people
            {path: 'people', exact: true, element: <PeoplePage />},

            // streams
            {path: 'streams', exact: true, element: <StreamsPage />},

          { path: 'journal', element: <ThoughtsPage /> },
          { path: 'journal/:id', exact: true, element: <CategoryDetailsPage /> },
          { path: 'biography', element: <BiographyPage /> },
          { path: 'user/*', element: <UserAccountPage /> },
          { path: 'health', element: <HealthPage /> }
        ]
      },

      // Redirects the home page to the lesson dashboard
      { path: 'home', element: <Navigate to={'/thoughts'} /> },

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
      }
    ],
    ''
  );
}

// IMPORT COMPONENTS
const ThoughtsPage = Loadable(lazy(() => import('./journal/ThoughtsPage')));
const PlaceDetailsPage = Loadable(lazy(() => import('./places/PlaceDetailsPage')));
const ThoughtDetailsPage = Loadable(lazy(() => import('./journal/ThoughtDetailsPage')));
const ProjectDetailsPage = Loadable(lazy(() => import('./projects/ProjectDetailsPage')));
const ProjectsPage = Loadable(lazy(() => import('./projects/ProjectsPage')));
const CategoryDetailsPage = Loadable(lazy(() => import('./journal/CategoryDetailsPage')));
const EmotionDetailsPage = Loadable(lazy(() => import('./journal/EmotionDetailsPage')));
const ReminderDetailsPage = Loadable(lazy(() => import('./reminders/ReminderDetailsPage')));
const QuestionDetailsPage = Loadable(lazy(() => import('./questions/QuestionDetailsPage')));
const TaskDetailsPage = Loadable(lazy(() => import('./tasks/TaskDetailsPage')));
const EventDetailsPage = Loadable(lazy(() => import('./events/EventDetailsPage')));
const PeopleDetailsPage = Loadable(lazy(() => import('./people/PeopleDetailsPage')));
const OverallToneDetailsPage = Loadable(lazy(() => import('./journal/OverallToneDetailsPage')));
const JournalPage = Loadable(lazy(() => import('./journal/JournalPage')));
const JournalDetailsPage = Loadable(lazy(() => import('./journal/JournalDetailsPage')));
const BiographyPage = Loadable(lazy(() => import('./biography/BiographyPage')));
const HealthPage = Loadable(lazy(() => import('./health/HealthPage')));
const UserAccountPage = Loadable(lazy(() => import('./user/UserAccountPage')));
const StreamsPage = Loadable(lazy(() => import('./streams/StreamsPage')));

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
