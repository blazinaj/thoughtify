import { motion } from 'framer-motion';
import Stack from '@mui/material/Stack';
// material
import { styled } from '@mui/material/styles';
import { Button, Box, Container, Typography } from '@mui/material';
//
import { varFadeInDown, varFadeInUp, MotionInView } from '../../animate';
import { PATH_LEARN, PATH_TEACH } from '../../../routes/paths';
import { paramCase } from 'change-case';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 456,
  margin: 'auto',
  overflow: 'hidden',
  paddingBottom: theme.spacing(10),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    maxWidth: '100%',
    paddingBottom: 0,
    alignItems: 'center'
  }
}));

// ----------------------------------------------------------------------

export default function LandingAdvertisement() {
  return (
    <Container maxWidth="lg">
      <ContentStyle>
        <MotionInView
          variants={varFadeInUp}
          sx={{
            mb: { xs: 3, md: 0 }
          }}
        >
          <motion.div animate={{ y: [-20, 0, -20] }} transition={{ duration: 4, repeat: Infinity }}>
            <Box component="img" alt="rocket" src="/static/home/rocket.png" sx={{ maxWidth: 460, width: 1 }} />
          </motion.div>
        </MotionInView>

        <Box
          sx={{
            pl: { md: 10 },
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          <MotionInView variants={varFadeInDown} sx={{ color: 'common.white', mb: 5 }}>
            <Typography variant="h2">
              Get started with
              <br /> Edify today
            </Typography>
          </MotionInView>
          <MotionInView variants={varFadeInDown}>
            <Stack direction="row" spacing={3}>
              <Button
                size="large"
                variant="contained"
                target="_blank"
                href={`${PATH_LEARN.catalog.root}`}
                sx={{
                  whiteSpace: 'nowrap',
                  boxShadow: (theme) => theme.customShadows.z8,
                  color: (theme) => theme.palette.getContrastText(theme.palette.common.white),
                  bgcolor: 'common.white',
                  '&:hover': { bgcolor: 'grey.300' }
                }}
              >
                Start Learning
              </Button>
              <Button
                size="large"
                variant="contained"
                target="_blank"
                href={`${PATH_TEACH.catalog.root}`}
                sx={{
                  whiteSpace: 'nowrap',
                  boxShadow: (theme) => theme.customShadows.z8,
                  color: (theme) => theme.palette.getContrastText(theme.palette.common.white),
                  bgcolor: 'common.white',
                  '&:hover': { bgcolor: 'grey.300' }
                }}
              >
                Start Teaching
              </Button>
            </Stack>
          </MotionInView>
        </Box>
      </ContentStyle>
    </Container>
  );
}
