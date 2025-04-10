// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Switch, Container, Typography, Stack } from '@mui/material';
// components
import Page from '../../demo/components/Page';
import { PricingPlanCard } from '../../demo/components/_external-pages/pricing';
//
import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from '../../demo/assets';

// ----------------------------------------------------------------------

const PLANS = [
  {
    subscription: 'basic',
    icon: <PlanFreeIcon />,
    price: 0,
    caption: 'forever',
    lists: [
      { text: 'AI Tutors', isAvailable: true },
      { text: 'Access to thousands of Free Lessons', isAvailable: true },
      { text: 'Lesson Plans and Certifications', isAvailable: false },
      { text: 'Advanced Insights', isAvailable: false },
      { text: 'Multiple Accounts', isAvailable: false }
    ],
    labelAction: 'current plan'
  },
  {
    subscription: 'starter',
    icon: <PlanStarterIcon />,
    price: 'TBD',
    caption: 'saving $TBD a year',
    lists: [
      { text: 'AI Tutors', isAvailable: true },
      { text: 'Access to thousands of Free Lessons', isAvailable: true },
      { text: 'Lesson Plans and Certifications', isAvailable: true },
      { text: 'Advanced Insights', isAvailable: false },
      { text: 'Multiple Accounts', isAvailable: false }
    ],
    labelAction: 'choose starter'
  },
  {
    subscription: 'premium',
    icon: <PlanPremiumIcon />,
    price: 'TBD',
    caption: 'saving $TBD a year',
    lists: [
      { text: 'AI Tutors', isAvailable: true },
      { text: 'Access to thousands of Free Lessons', isAvailable: true },
      { text: 'Lesson Plans and Certifications', isAvailable: true },
      { text: 'Advanced Insights', isAvailable: true },
      { text: 'Multiple Accounts', isAvailable: true }
    ],
    labelAction: 'choose premium'
  }
];

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));

// ----------------------------------------------------------------------

export default function Pricing() {
  return (
    <RootStyle title="Thoughtify - Pricing">
      <Container maxWidth="lg" sx={{ my: 10 }}>
        <Typography variant="h3" align="center" paragraph>
          Thoughtify Pricing
        </Typography>
        <Typography align="center" sx={{ color: 'text.secondary' }}>
          Thoughtify is currently in an alpha concept phase. It is free to try out and use, but this may change at any
          time.
        </Typography>

        {/*<Box sx={{ my: 5 }}>*/}
        {/*  <Stack direction="row" alignItems="center" justifyContent="flex-end">*/}
        {/*    <Typography variant="overline" sx={{ mr: 1.5 }}>*/}
        {/*      MONTHLY*/}
        {/*    </Typography>*/}
        {/*    <Switch />*/}
        {/*    <Typography variant="overline" sx={{ ml: 1.5 }}>*/}
        {/*      YEARLY (save 10%)*/}
        {/*    </Typography>*/}
        {/*  </Stack>*/}
        {/*  <Typography variant="caption" align="right" sx={{ color: 'text.secondary', display: 'block' }}>*/}
        {/*    * Plus applicable taxes*/}
        {/*  </Typography>*/}
        {/*</Box>*/}

        {/*<Grid container spacing={3}>*/}
        {/*  {PLANS.map((card, index) => (*/}
        {/*    <Grid item xs={12} md={4} key={card.subscription}>*/}
        {/*      <PricingPlanCard card={card} index={index} />*/}
        {/*    </Grid>*/}
        {/*  ))}*/}
        {/*</Grid>*/}
      </Container>
    </RootStyle>
  );
}
