import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Button, Grid } from '@mui/material';
import { newOder } from 'src/api/ortherEcom';
// @types
import {
  ICheckoutCardOption,
  ICheckoutPaymentOption
} from '../../../../../@types/product';
// components
import FormProvider from '../../../../../components/hook-form';
import Iconify from '../../../../../components/iconify';
//
import CheckoutSummary from '../CheckoutSummary';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS: ICheckoutPaymentOption[] = [
  {
    value: 'transfer',
    title: 'Thanh toán qua chuyển khoảng',
    description:
      'Nhân viên cửa hàng sẻ liên hệ với bạn qua số điện thoại đặt hàng và tiến hành thành toán.',
    // icons: ['/assets/icons/payments/ic_paypal.svg'],
    icons: ['/assets/icons/payments/ic_mastercard.svg', '/assets/icons/payments/ic_visa.svg'],
  },
  // {
  //   value: 'credit_card',
  //   title: 'Credit / Debit Card',
  //   description: 'We support Mastercard, Visa, Discover and Stripe.',
  //   icons: ['/assets/icons/payments/ic_mastercard.svg', '/assets/icons/payments/ic_visa.svg'],
  // },
  {
    value: 'cash',
    title: 'Tiền mặt khi thanh toán Giao hàng',
    description: 'Thanh toán bằng tiền mặt khi đơn đặt hàng của bạn được giao.',
    icons: [],
  },
];

const CARDS_OPTIONS: ICheckoutCardOption[] = [
  { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
  { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
  { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' },
];

type Props = {
  checkout: any;
  onNextStep: VoidFunction;
  onBackStep: VoidFunction;
  onReset: VoidFunction;
  onGotoStep: (step: number) => void;
  onApplyShipping: (value: number) => void;
};

type FormValuesProps = {
  shippingcost: number;
  paidtype: string;
  Data: any;
  Address: any;
  totalprice: number
};

export default function CheckoutPayment({
  checkout,
  onReset,
  onNextStep,
  onBackStep,
  onGotoStep,
  onApplyShipping,
}: Props) {
  const { TotalQuantity, TotalPrice, shipping, Address, Data } = checkout;

  const PaymentSchema = Yup.object().shape({
    paidtype: Yup.string().required('Payment is required!'),
  });

  const defaultValues = {
    shippingcost: shipping || 0,
    paidtype: '',
    Data: Data || '',
    Address: Address || '',
    totalprice: TotalPrice || ''
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      console.log('Data: ', data);
      newOder(data).then((res) => {
        if (res.data.success) {
          onNextStep();
          onReset();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* <CheckoutDelivery onApplyShipping={onApplyShipping} deliveryOptions={DELIVERY_OPTIONS} /> */}

          <CheckoutPaymentMethods
            cardOptions={CARDS_OPTIONS}
            paymentOptions={PAYMENT_OPTIONS}
            sx={{ my: 3 }}
          />

          <Button
            size="small"
            color="inherit"
            onClick={onBackStep}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            Back
          </Button>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutBillingInfo onBackStep={onBackStep} billing={Address} />

          {/* <CheckoutSummary
            enableEdit
            total={TotalQuantity}
            subtotal={TotalPrice}
            discount={discount}
            shipping={shipping}
            onEdit={() => onGotoStep(0)}
          /> */}

          <CheckoutSummary
            total={TotalPrice}
            discount={5}
            TotalQuantity={TotalQuantity}
            subtotal={10}
            shipping={shipping}
            onEdit={() => onGotoStep(0)}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Hoàn thành
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
