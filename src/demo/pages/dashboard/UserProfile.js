import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useEffect, useState } from 'react';
import heartFill from '@iconify/icons-eva/heart-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import roundPermMedia from '@iconify/icons-ic/round-perm-media';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
// material
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getPosts, getGallery, getFriends, getProfile, getFollowers, onToggleFollow } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../../utils/hooks/useAuth';
import useSettings from '../../../utils/hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers
} from '../../components/_dashboard/user/profile';
import {Post} from "../../../models";
import {useDatastore} from "../../../utils/hooks/useDatastore";
import {useUserContext} from "../../../contexts/UserContext";
// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

/**
 * The Public user profile if the User has their account set to public
 * @returns {JSX.Element}
 * @constructor
 */
export const UserProfile = () => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { user } = useUserContext();
  const [currentTab, setCurrentTab] = useState('profile');

  const myProfile = {};
  const gallery = [];

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getPosts());
    dispatch(getFollowers());
    dispatch(getFriends());
    dispatch(getGallery());
  }, [dispatch]);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  if (!myProfile) {
    // return null;

    // myProfile = {
    //
    // }
  }

  // const postsDatastore = useDatastore({
  //   typename: "Post",
  //   model: Post,
  // })

  const posts = [] //postsDatastore.items;

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <Profile myProfile={myProfile} posts={posts} />
    },
    {
      value: 'gallery',
      icon: <Icon icon={roundPermMedia} width={20} height={20} />,
      component: <ProfileGallery gallery={gallery} />
    }
  ];

  return (
    <Page title="Edify - User Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: user?.firstName }
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative'
          }}
        >
          <ProfileCover myProfile={myProfile} />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={handleChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}

export default UserProfile;
