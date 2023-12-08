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

export default function AccountDelete() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user = {}, onDeleteUser } = useUserContext();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
          <AccountSettings.DeleteUser onSuccess={onDeleteUser} />
        </Card>
      </Grid>
    </Grid>
  );
}
