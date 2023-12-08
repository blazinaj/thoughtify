import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Card, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { useSelector } from '../../../demo/redux/store';
// utils
import fakeRequest from '../../../utils/fakeRequest';

// ----------------------------------------------------------------------

const TEACHER_OPTIONS = [
  {
    value: 'activityComments',
    label: 'Email me when someone enrolls in my Lesson'
  }
];

const STUDENT_OPTIONS = [
  { value: 'lessonDigests', label: 'Weekly lesson digest' },
  { value: 'lessonSuggestions', label: 'Weekly lesson suggestions' }
];

const APPLICATION_OPTIONS = [
  { value: 'applicationNews', label: 'News and announcements' },
  { value: 'applicationProduct', label: 'Product updates' }
];

// ----------------------------------------------------------------------

export default function AccountNotifications() {
  const { enqueueSnackbar } = useSnackbar();
  const { notifications } = useSelector((state) => state.user);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      activityComments: notifications.activityComments,
      activityAnswers: notifications.activityAnswers,
      activityFollows: notifications.activityFollows,
      applicationNews: notifications.applicationNews,
      applicationProduct: notifications.applicationProduct,
      applicationBlog: notifications.applicationBlog
    },
    onSubmit: async (values, { setSubmitting }) => {
      await fakeRequest(500);
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      enqueueSnackbar('Save success', { variant: 'success' });
    }
  });

  const { values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <Stack spacing={2} sx={{ width: 1 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Application
              </Typography>
              <Stack spacing={1} alignItems="flex-start">
                {APPLICATION_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    control={<Switch {...getFieldProps(item.value)} checked={values[item.value]} />}
                    label={item.label}
                    sx={{ mx: 0 }}
                  />
                ))}
              </Stack>
            </Stack>

            <Stack spacing={2} sx={{ width: 1 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Students
              </Typography>
              <Stack spacing={1} alignItems="flex-start">
                {STUDENT_OPTIONS.map((activity) => (
                  <FormControlLabel
                    key={activity.value}
                    control={<Switch {...getFieldProps(activity.value)} checked={values[activity.value]} />}
                    label={activity.label}
                    sx={{ mx: 0 }}
                  />
                ))}
              </Stack>
            </Stack>

            <Stack spacing={2} sx={{ width: 1 }}>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Teachers
              </Typography>
              <Stack spacing={1} alignItems="flex-start">
                {TEACHER_OPTIONS.map((activity) => (
                  <FormControlLabel
                    key={activity.value}
                    control={<Switch {...getFieldProps(activity.value)} checked={values[activity.value]} />}
                    label={activity.label}
                    sx={{ mx: 0 }}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
