import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import TermsAndConditions, { TermsContent } from '../../marketing/TermsAndConditions';
import Scrollbar from '../../../utils/components/Scrollbar';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

export const AccountSetupTerms = ({ setActiveStep }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Card sx={{ mb: 3 }}>
          <CardHeader title={<Typography variant="h6">Terms and Conditions</Typography>} sx={{ mb: 3 }} />

          <CardContent
            sx={{
              height: '50vh',
              overflow: 'auto'
            }}
          >
            <Scrollbar>
              <TermsContent />
            </Scrollbar>
          </CardContent>
        </Card>
      </Grid>

      <Grid item container justifyContent={'space-between'} xs={12} md={12}>
        <Grid item lg={4} xs={6}>
          <Button
            color={'secondary'}
            fullWidth
            size="large"
            variant="outlined"
            onClick={() => setActiveStep((curr) => curr - 1)}
          >
            Back
          </Button>
        </Grid>

        <Grid item lg={4} xs={6}>
          <LoadingButton
            fullWidth
            size="large"
            variant="contained"
            onClick={() => {
              setIsAgreed(true);
              setTimeout(() => setActiveStep((curr) => curr + 1), 750);
            }}
            loading={isAgreed}
          >
            I Agree
          </LoadingButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
