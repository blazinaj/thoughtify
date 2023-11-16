// hooks
import useAuth from '../../utils/hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import createAvatar from '../../utils/createAvatar';
import { useUserContext } from '../../contexts/UserContext';

// ----------------------------------------------------------------------

/**
 * Displays the Profile Image of the user.
 * @param other
 * @returns {JSX.Element}
 * @constructor
 */
export default function MyAvatar({ ...other }) {
  // const { user } = useAuth();

  const { user } = useUserContext();

  return (
    <MAvatar
      src={user?.profileImage}
      alt={user?.email}
      color={user?.profileImage ? 'default' : createAvatar(user?.email).color}
      {...other}
    >
      {createAvatar(user?.email).name}
    </MAvatar>
  );
}
