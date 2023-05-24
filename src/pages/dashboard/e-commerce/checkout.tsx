import { useEffect, useState } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { CalculateFee, addAddress, deleteToCard } from 'src/api/ortherEcom';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// redux
import {
  applyDiscount,
  applyShipping,
  createBilling,
  getCarts,
  gotoStep,
  resetCart,
  updateQuantity,
  updateShipping,
} from '../../../redux/slices/product';
import { useDispatch, useSelector } from '../../../redux/store';
// @types
import { IAddress } from '../../../@types/product';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections

import {
  CheckoutBillingAddress,
  CheckoutCart,
  CheckoutOrderComplete,
  CheckoutPayment,
  CheckoutSteps,
} from '../../../sections/@dashboard/e-commerce/checkout';

// ----------------------------------------------------------------------

const STEPS = ['Giỏ hàng', 'Đặt hàng', 'Thanh toán'];

// ----------------------------------------------------------------------

EcommerceCheckoutPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function EcommerceCheckoutPage() {
  const { replace } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.product);

  const [activeStep, setActiveStep] = useState<number>(0);

  const { Data, Address } = checkout;

  const completed = activeStep === STEPS.length;

  useEffect(() => {
    if (activeStep === 1) {
      dispatch(createBilling(null));
    }
  }, [dispatch, activeStep]);

  const handleNextStep = () => {
    // dispatch(nextStep());
    setActiveStep(activeStep + 1);
  };

  const handleBackStep = () => {
    // dispatch(backStep());
    setActiveStep(activeStep - 1);
  };

  const handleGotoStep = (step: number) => {
    dispatch(gotoStep(step));
  };

  const handleApplyDiscount = (value: number) => {
    if (Data.length) {
      dispatch(applyDiscount(value));
    }
  };

  const handleDeleteCart = (productId: string) => {
    deleteToCard(productId)
      .then((res) => {
        if (res?.data?.success === true) {
          dispatch(getCarts());
          enqueueSnackbar('Thêm vào giỏ hàng thành công!');
        } else {
          enqueueSnackbar('Thêm vào giỏ hàng không thành công!');
        }
      })
      .catch(() => {
        enqueueSnackbar('Thêm vào giỏ hàng không thành công!');
      });
  };

  const handleIncreaseQuantity = (id: string, productId: string, quantity: number) => {
    updateQuantity(id, productId, quantity + 1)
      .then((res) => {
        if (res?.data?.success === true) {
          dispatch(getCarts());
          enqueueSnackbar('Cập nhật giỏ hàng thành công!');
        } else {
          enqueueSnackbar('Cập nhật giỏ hàng không thành công!');
        }
      })
      .catch(() => {
        enqueueSnackbar('Cập nhật giỏ hàng không thành công!');
      });
  };

  const handleDecreaseQuantity = (id: string, productId: string, quantity: number) => {
    updateQuantity(id, productId, quantity - 1)
      .then((res) => {
        if (res?.data?.success === true) {
          dispatch(getCarts());
          enqueueSnackbar('Cập nhật giỏ hàng thành công!');
        } else {
          enqueueSnackbar('Cập nhật giỏ hàng không thành công!');
        }
      })
      .catch(() => {
        enqueueSnackbar('Cập nhật giỏ hàng không thành công!');
      });
  };

  const handleCreateBilling = (address: IAddress) => {
    addAddress(address)
      .then((res) => {
        if (res?.data?.success === true) {
          CalculateFee(Number(address.DistrictGHNId), Number(address.WardGHNid)).then((res) => {
            if (res.data.message === 'Success') {
              dispatch(updateShipping(res.data.data.total));
            }
          });
          dispatch(createBilling(address));
          setActiveStep(activeStep + 1);
          enqueueSnackbar('Thêm địa chỉ thành công!');
        } else {
          enqueueSnackbar('Đã có lỗi xảy ra!', { variant: 'error' });
        }
      })
      .catch((err) => enqueueSnackbar('Đã có lỗi xảy ra!', { variant: 'error' }));

    // // dispatch(nextStep());
  };

  const handleAddBilling = (address: IAddress) => {
    CalculateFee(Number(address.DistrictGHNId), Number(address.WardGHNid)).then((res) => {
      if (res.data.message === 'Success') {
        dispatch(updateShipping(res.data.data.total));
      }
    });
    dispatch(createBilling(address));
    setActiveStep(activeStep + 1);
  };

  const handleApplyShipping = (value: number) => {
    dispatch(applyShipping(value));
  };

  const handleReset = () => {
    if (completed) {
      dispatch(resetCart());
      replace(PATH_DASHBOARD.eCommerce.shop);
    }
  };

  return (
    <>
      <Head>
        <title> Ecommerce: Checkout | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Giỏ hàng"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: 'Checkout' },
          ]}
        />

        <Grid container justifyContent={completed ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={8}>
            <CheckoutSteps activeStep={activeStep} steps={STEPS} />
          </Grid>
        </Grid>

        {completed ? (
          <CheckoutOrderComplete open={completed} onReset={handleReset} onDownloadPDF={() => {}} />
        ) : (
          <>
            {activeStep === 0 && (
              <CheckoutCart
                checkout={checkout}
                onNextStep={handleNextStep}
                onDeleteCart={handleDeleteCart}
                onApplyDiscount={handleApplyDiscount}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            )}
            {activeStep === 1 && (
              <CheckoutBillingAddress
                checkout={checkout}
                onBackStep={handleBackStep}
                onCreateBilling={handleCreateBilling}
                onAddBilling={handleAddBilling}
              />
            )}
            {activeStep === 2 && Address && (
              <CheckoutPayment
                checkout={checkout}
                onNextStep={handleNextStep}
                onBackStep={handleBackStep}
                onGotoStep={handleGotoStep}
                onApplyShipping={handleApplyShipping}
                onReset={handleReset}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
}
