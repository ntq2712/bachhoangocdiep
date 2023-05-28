import { useEffect, useState } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { IDataAddCart } from 'src/@types/product';
import DashboardLayoutNoneLogin from 'src/layouts/dashboard/DashboardLayoutNoneLogin';
import SimilarProduct from 'src/sections/_examples/extra/carousel/similarproduct';
import { addToCart, getCarts, getProduct, gotoStep } from '../../../../redux/slices/product';
import { useDispatch, useSelector } from '../../../../redux/store';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import Markdown from '../../../../components/markdown';
import { useSettingsContext } from '../../../../components/settings';
import { SkeletonProductDetails } from '../../../../components/skeleton';
// sections

import CartWidget from '../../../../sections/@dashboard/e-commerce/CartWidget';
import {
  ProductDetailsCarousel,
  ProductDetailsReview,
  ProductDetailsSummary,
} from '../../../../sections/@dashboard/e-commerce/details';

EcommerceProductDetailsPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayoutNoneLogin>{page}</DashboardLayoutNoneLogin>
);

// ----------------------------------------------------------------------

export default function EcommerceProductDetailsPage() {
  const { themeStretch } = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const {
    query: { name },
  } = useRouter();

  const dispatch = useDispatch();

  const { product, isLoading, checkout, reviewState, similarproduct } = useSelector(
    (state) => state.product
  );

  const [currentTab, setCurrentTab] = useState('description');

  useEffect(() => {
    if (name) {
      dispatch(getProduct(name as string));
    }
  }, [dispatch, name]);

  const handleAddCart = (cart: IDataAddCart) => {
    addToCart(cart)
      .then((res) => {
        if (res?.data?.success === true) {
          dispatch(getCarts());
          enqueueSnackbar('Thêm vào giỏ hàng thành công!');
        } else {
          enqueueSnackbar(res.data.message , { variant: 'error' });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  };

  const handleGotoStep = (step: number) => {
    dispatch(gotoStep(step));
  };

  const TABS = [
    {
      value: 'description',
      label: 'description',
      component: product ? <Markdown children={product?.Description} /> : null,
    },
    {
      value: 'reviews',
      label: 'Reviews',
      component: product ? <ProductDetailsReview reviewsdata={reviewState} /> : null,
    },
  ];

  return (
    <>
      <Head>
        <title>{`Sản phẩm: ${product?.Name || ''} | Bách hóa Ngọc Diệp`}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          links={[
            { name: 'Trang chủ', href: '/' },
            {
              name: 'Cửa hàng',
              href: PATH_DASHBOARD.eCommerce.shop,
            },
            { name: product?.Name },
          ]}
        />

        <CartWidget totalItems={checkout?.TotalQuantity} />

        {product && (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={7}>
                <ProductDetailsCarousel productId={name} />
              </Grid>

              <Grid item xs={12} md={6} lg={5}>
                <ProductDetailsSummary
                  product={product}
                  cart={checkout?.cart}
                  onAddCart={handleAddCart}
                  onGotoStep={handleGotoStep}
                />
              </Grid>
            </Grid>

            { similarproduct && <Card sx={{mt: 5, mb: 3}}>
              <CardHeader title="Sản phẩm liên quan" subheader="Bán chạy & chất lượng" />
              <CardContent>
                <SimilarProduct data={similarproduct} />
              </CardContent>
            </Card>
            }

            <Card>
              <Tabs
                value={currentTab}
                onChange={(event, newValue) => setCurrentTab(newValue)}
                sx={{ px: 3, bgcolor: 'background.neutral' }}
              >
                {TABS.map((tab) => (
                  <Tab key={tab.value} value={tab.value} label={tab.label} />
                ))}
              </Tabs>

              <Divider />

              {TABS.map(
                (tab) =>
                  tab.value === currentTab && (
                    <Box
                      key={tab.value}
                      sx={{
                        ...(currentTab === 'description' && {
                          p: 3,
                        }),
                      }}
                    >
                      {tab.component}
                    </Box>
                  )
              )}
            </Card>
          </>
        )}

        {isLoading && <SkeletonProductDetails />}
      </Container>
    </>
  );
}
