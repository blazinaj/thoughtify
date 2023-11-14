// material
import { Box, Container, Typography, Grid } from '@mui/material';
//
import { varFadeInUp, varFadeIn, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

export default function AboutVision() {
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Box
        sx={{
          mb: 10,
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <img src="/static/about/vision.jpg" alt="about-vision" />
      </Box>

      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <MotionInView variants={varFadeInUp}>
            <Typography variant="h3" sx={{ textAlign: 'center' }}>
              Our vision is to take Education to the next level. We want to make it accessible to everyone.
            </Typography>
          </MotionInView>
        </Grid>
      </Grid>
    </Container>
  );
}
