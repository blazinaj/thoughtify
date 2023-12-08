import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  FormHelperText,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../../utils/hooks/useIsMountedRef';
import { UploadAvatar } from '../../../demo/components/upload';
// utils
import { fData } from '../../../utils/formatNumber';
//
import { useUserContext } from '../../../contexts/UserContext';
import { AccountSettings } from '@aws-amplify/ui-react';
import {DataStore}   from "@aws-amplify/datastore";
// ----------------------------------------------------------------------

export default function AccountData() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user = {}, onChangePassword } = useUserContext();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
          <Button
            onClick={() => {
              DataStore.clear().then(() => {
                enqueueSnackbar('Local Data Cleared', { variant: 'success' });
              })
            }}
          >
            Clear Local Data
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
}
