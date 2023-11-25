import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useForm } from '../../utils/hooks/useForm';

export const AccountSetupBasicInformation = ({ userData, setUserData, setActiveStep }) => {
  const form = useForm({
    item: userData,
    fieldConfig: {
      'firstName': {
        defaultValue: userData.firstName || '',
        label: 'First Name',
      },
      'lastName': {
        defaultValue: userData.lastName || '',
        label: 'Last Name',
      },
      'bio': {
        defaultValue: userData.bio || '',
        label: 'Tell us a little about yourself',
        tooltip: 'This will be displayed on your profile page and will be used by the AI to tailor your experience'
      },
    },
    disableSubmitButton: true
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ mb: 3, pb: 2 }}>
          <CardHeader title={<Typography variant="h6">Profile</Typography>} sx={{ mb: 3 }} />

          <CardContent>{form.display}</CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={12}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          disabled={form?.input?.firstName === '' || form?.input?.lastName === ''}
          onClick={() => {
            setUserData((d) => ({
              ...d,
              firstName: form?.input?.firstName,
              lastName: form?.input?.lastName,
              bio: [
                {
                  question: "generalInformation",
                  answer: form?.input?.bio
                }
              ]
            }));
            setActiveStep((curr) => curr + 1);
          }}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};
