import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../utils/hooks/useAuth';
// routes
import {PATH_DASHBOARD, PATH_LEARN} from '../demo/routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATH_LEARN.root} />;
  }

  return <>{children}</>;
}
