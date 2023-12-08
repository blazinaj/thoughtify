import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Card, FormControlLabel, FormHelperText, Grid, Stack, Switch, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../../utils/hooks/useIsMountedRef';
import { UploadAvatar } from '../../../demo/components/upload';
// utils
import { fData } from '../../../utils/formatNumber';
//
import { useUserContext } from '../../../contexts/UserContext';
import { AccountSettings } from '@aws-amplify/ui-react';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user = {}, cognitoUser, onChangePassword } = useUserContext();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
          {
            // only show password change if there are no Federated Identities
            !cognitoUser?.attributes?.identities ? (
                  <AccountSettings.ChangePassword onSuccess={onChangePassword} />

              ) : (
                  <Typography variant="h7" sx={{ mb: 5 }}>
                    You are logged in with a Federated Identity. Please contact your administrator to change your password.
                  </Typography>
            )
          }
        </Card>
      </Grid>
    </Grid>
  );
}
