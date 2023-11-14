// material
import { Button, Typography, TextField, Stack } from '@mui/material';
//
import { varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

export default function ContactForm() {
  return (
    <Stack spacing={5}>
      <MotionInView variants={varFadeInUp}>
        <Typography variant="h3">
          Feel free to contact us. <br />
          We'll be glad to hear from you.
        </Typography>
      </MotionInView>

      <Stack spacing={3}>
        <MotionInView variants={varFadeInUp}>
          <TextField fullWidth label="Name" />
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <TextField fullWidth label="Email" />
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <TextField fullWidth label="Subject" />
        </MotionInView>

        <MotionInView variants={varFadeInUp}>
          <TextField fullWidth label="Enter your message here." multiline rows={4} />
        </MotionInView>
      </Stack>

      <MotionInView variants={varFadeInUp}>
        {/*Button is disabled*/}
        <Button size="large" variant="contained" disabled>
          Submit Now
        </Button>
      </MotionInView>
    </Stack>
  );
}
