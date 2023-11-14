import {Link as ScrollLink} from 'react-scroll';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
// material
import {Box, Container, Link, Typography} from '@mui/material';
// components
import Logo from '../../demo/components/Logo';
//
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';
import {Auth} from "@aws-amplify/auth";
import {useEffect} from "react";
import {Hub} from "aws-amplify";
import {DataStore} from "@aws-amplify/datastore";

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const navigate = useNavigate();

  useEffect(() => {

    // Add an event listener to handle changes in authentication state
    const listener = async (state, data) => {
      if (state === "signedin") {
        // Redirect the user to the /dashboard route upon successful sign-in
        navigate("/learn");
      }
    };

    const subscription = Hub.listen('auth', listener);

    return () => {
      // Unsubscribe from the event when the component is unmounted
      // subscription?.unsubscribe();
    };
  }, []);

  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>

      {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default'
          }}
        >
          <Container maxWidth="lg">
            <ScrollLink to="move_top" spy smooth>
              <Logo sx={{ mb: 1, mx: 'auto', cursor: 'pointer' }} />
            </ScrollLink>

            <Typography variant="caption" component="p">
              © All rights reserved
              <br /> made by &nbsp;
              <Link href="https://www.edify.mobi/">Edify</Link>
            </Typography>
          </Container>
        </Box>
      )}
    </>
  );
}
