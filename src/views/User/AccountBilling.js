import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useState} from 'react';
import {useSnackbar} from 'notistack';
// material
import {Box, Button, Card, Grid, Stack, Typography} from '@mui/material';
// redux
import {useSelector} from '../../demo/redux/store';
// utils
import fakeRequest from '../../utils/fakeRequest';
//
import AccountBillingPaymentMethod from '../../demo/components/_dashboard/user/account/AccountBillingPaymentMethod';
import AccountBillingInvoiceHistory from '../../demo/components/_dashboard/user/account/AccountBillingInvoiceHistory';
import {useUserContext} from "../../contexts/UserContext";

// ----------------------------------------------------------------------

export default function AccountBilling() {
  const { cards, invoices } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {user = {}} = useUserContext();

  const NewCardSchema = Yup.object().shape({
    cardName: Yup.string().required('Name is required'),
    cardNumber: Yup.string().required('Card number is required'),
    cardExpired: Yup.string().required('Card expired is required'),
    cardCvv: Yup.string().required('Cvv is required')
  });

  const formik = useFormik({
    initialValues: {
      cardName: '',
      cardNumber: '',
      cardExpired: '',
      cardCvv: ''
    },
    validationSchema: NewCardSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await fakeRequest(500);
      handleCancel();
      resetForm();
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      enqueueSnackbar('Add card success', { variant: 'success' });
    }
  });

  const handleCancel = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={12}>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
              Your Subscription Plan
            </Typography>
            <Typography variant="h4">Premium - Free Trial</Typography>
            <Box
              sx={{
                mt: { xs: 2, sm: 0 },
                position: { sm: 'absolute' },
                top: { sm: 24 },
                right: { sm: 24 },
                display: "none", // temp
              }}
            >
              <Button size="small" color="inherit" variant="outlined" sx={{ mr: 1 }}>
                Cancel plan
              </Button>
              <Button size="small" variant="outlined">
                Upgrade plan
              </Button>
            </Box>
          </Card>

        </Stack>
      </Grid>
    </Grid>
  );
}
