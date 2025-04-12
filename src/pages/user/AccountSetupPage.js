import React, { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import { Backdrop, Box, Container, Grid, Step, StepConnector, StepLabel, Stepper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import Page from '../../demo/components/Page';
import { AccountSetupBasicInformation } from './components/AccountSetupBasicInformation';
import { MotionInView, varFadeInUp } from '../../demo/components/animate';
import { AccountSetupTerms } from './components/AccountSetupTerms';

// ----------------------------------------------------------------------

const STEPS = ['Personality', 'Terms and Conditions'];

const QontoConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)'
  },
  active: {
    '& $line': { borderColor: theme.palette.primary.main }
  },
  completed: {
    '& $line': { borderColor: theme.palette.primary.main }
  },
  line: {
    borderTopWidth: 2,
    borderColor: theme.palette.divider
  }
}))(StepConnector);

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
};

function QontoStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.marketing' : 'divider',
        bgcolor: 'background.default'
      }}
    >
      {completed ? (
        <Box
          component={Icon}
          icon={checkmarkFill}
          sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.marketing' }}
        />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor'
          }}
        />
      )}
    </Box>
  );
}

export const AccountSetupPage = ({ setupUserAccount, cognitoUser, onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [userData, setUserData] = useState({
    bio: '',
    interests: [],
    firstName: cognitoUser?.attributes?.firstName || cognitoUser?.attributes?.given_name,
    lastName: cognitoUser?.attributes?.lastName || cognitoUser?.attributes?.family_name,
    email: cognitoUser?.attributes?.email,
    phone: cognitoUser?.attributes?.phone_number,
    profileImage: cognitoUser?.attributes?.picture
  });

  const isComplete = activeStep === STEPS.length;

  useEffect(() => {
    if (isComplete) {
      setupUserAccount({ cognitoUser, userData }).then((result) => {
        setTimeout(() => {
          onComplete && onComplete(result);
        }, 1800);
      });
    }
  }, [isComplete]);

  return (
    <Page title="Thoughtify - Account Setup">
      <Container maxWidth={'md'} sx={{ p: 5 }}>
        <Grid container justifyContent={isComplete ? 'center' : 'center'}>
          <MotionInView variants={varFadeInUp}>
            <Typography variant="h3">Let's get started with Thoughtify!</Typography>
          </MotionInView>
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    sx={{
                      '& .MuiStepLabel-label': {
                        typography: 'subtitle2',
                        color: 'text.disabled'
                      }
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>

        {!isComplete ? (
          <>
            {activeStep === 0 && (
              <AccountSetupBasicInformation
                setUserData={setUserData}
                userData={userData}
                setActiveStep={setActiveStep}
              />
            )}
            {activeStep === 1 && <AccountSetupTerms setActiveStep={setActiveStep} />}
          </>
        ) : (
          <Backdrop open={isComplete} sx={{ zIndex: 9999 }}>
            <MotionInView variants={varFadeInUp}>
              <Typography variant="h3">
                Congratulations! Your account has been created. <br />
                Give us one second to log you in...
              </Typography>
            </MotionInView>
          </Backdrop>
        )}
      </Container>
    </Page>
  );
};
