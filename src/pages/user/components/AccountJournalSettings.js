import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
// material
import {
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  Button,
  FormHelperText,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { UploadAvatar } from '../../../demo/components/upload';
import { fData } from '../../../utils/formatNumber';
import { DataStore } from '@aws-amplify/datastore';
import { User, WritingBrevity, WritingStyle } from '../../../models';
// redux
// utils
//

// ----------------------------------------------------------------------

export default function AccountJournalSettings() {
  const { enqueueSnackbar } = useSnackbar();

  const NewCardSchema = Yup.object().shape({
    tone: Yup.string().required('Name is required'),
    tense: Yup.string().required('Card number is required'),
    brevity: Yup.string().required('Card expired is required'),
    custom: Yup.string().required('Cvv is required')
  });

  const formik = useFormik({
    initialValues: {
      tone: '',
      tense: '',
      brevity: '',
      custom: ''
    },
    validationSchema: NewCardSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      handleCancel();
      resetForm();
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      enqueueSnackbar('Updated Journal Settings', { variant: 'success' });
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleCancel = () => {
    formik.resetForm();
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Writing Style</InputLabel>
                    <Select label="Writing Style" {...getFieldProps('journalWritingStyle')}>
                      {Object.values(WritingStyle).map((style) => (
                        <MenuItem key={style} value={style}>
                          {style}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Brevity</InputLabel>
                    <Select label="Brevity" {...getFieldProps('journalBrevity')}>
                      {Object.values(WritingBrevity).map((length) => (
                        <MenuItem key={length} value={length}>
                          {length}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>

                <TextField
                  {...getFieldProps('custom')}
                  disabled={false}
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={4}
                  label="Custom Instructions"
                />
              </Stack>

              {/*Disabled until user can edit their own attributes*/}
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="submit" variant="contained" loading={isSubmitting}>
                  Save Changes
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
