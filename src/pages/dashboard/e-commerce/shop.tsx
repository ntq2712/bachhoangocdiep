import { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
// next
import Head from 'next/head';
// @mui
import { Container, Divider, Pagination, Stack, Typography } from '@mui/material';
import { useAuthContext } from 'src/auth/useAuthContext';
import DashboardLayoutNoneLogin from 'src/layouts/dashboard/DashboardLayoutNoneLogin';
import Footer from 'src/layouts/main/Footer';
// redux
import { getCarts, sortProductsByFilter } from '../../../redux/slices/product';
import { useDispatch, useSelector } from '../../../redux/store';
// routes
// @types
import { IProductFilter } from '../../../@types/product';
// layouts
// components
import FormProvider from '../../../components/hook-form';
import { useSettingsContext } from '../../../components/settings';
// sections

import CartWidget from '../../../sections/@dashboard/e-commerce/CartWidget';
import {
  ShopFilterDrawer,
  ShopProductList,
  ShopProductSort,
  ShopTagFiltered,
} from '../../../sections/@dashboard/e-commerce/shop';

// ----------------------------------------------------------------------

EcommerceShopPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayoutNoneLogin>{page}</DashboardLayoutNoneLogin>
);

// ----------------------------------------------------------------------

export default function EcommerceShopPage() {
  const { themeStretch } = useSettingsContext();
  const { isAuthenticated } = useAuthContext();

  const dispatch = useDispatch();

  const { products, checkout, TotalPages } = useSelector((state) => state.product);

  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const defaultValues = {
    pricerange: [0, 1000],
    brand: '',
    categorys: [],
    categorygroup: [],
    rate: undefined,
    sortBy: '',
  };

  const methods = useForm<IProductFilter>({
    defaultValues,
  });

  const {
    reset,
    watch,
    formState: { dirtyFields },
  } = methods;

  const isDefault =
    (!dirtyFields.categorygroup &&
      !dirtyFields.categorys &&
      !dirtyFields.rate &&
      !dirtyFields.brand &&
      !dirtyFields.pricerange) ||
    false;

  const pricerangechange = watch('pricerange');
  const brandchange = watch('brand');
  const categoryschange = watch('categorys');
  const categorygroupchange = watch('categorygroup');
  const ratechange = watch('rate');
  const sortBychange = watch('sortBy');

  useEffect(() => {
    const f: any = {
      brand: brandchange,
      categorygroup: categorygroupchange,
      category: categoryschange,
      pricerange: pricerangechange,
      rate: ratechange,
      sortBy: sortBychange,
      page: 1,
    };
    dispatch(sortProductsByFilter(f));
    if (isAuthenticated) {
      dispatch(getCarts());
    }
  }, [
    dispatch,
    brandchange,
    categorygroupchange,
    categoryschange,
    pricerangechange,
    ratechange,
    sortBychange,
    isAuthenticated,
  ]);

  const handleResetFilter = () => {
    reset();
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Head>
        <title> Ecommerce: Cửa hàng | Bách hóa Ngọc Diệp</title>
      </Head>

      <FormProvider methods={methods}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            {/* <ShopProductSearch /> */}
            <div />

            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              <ShopFilterDrawer
                isDefault={isDefault}
                open={openFilter}
                onOpen={handleOpenFilter}
                onClose={handleCloseFilter}
                onResetFilter={handleResetFilter}
              />

              <ShopProductSort />
            </Stack>
          </Stack>

          <Stack sx={{ mb: 3 }}>
            {!isDefault && (
              <>
                <Typography variant="body2" gutterBottom>
                  <strong>{products.length}</strong>
                  &nbsp;Sản phẩm được tìm thấy
                </Typography>

                <ShopTagFiltered isFiltered={!isDefault} onResetFilter={handleResetFilter} />
              </>
            )}
          </Stack>

          <ShopProductList products={products} loading={!products.length && isDefault} />
          {TotalPages > 1 && (
            <Stack
              alignItems={{
                xs: 'center',
                md: 'flex-end',
              }}
              sx={{
                my: 5,
                mr: { md: 5 },
              }}
            >
              <Pagination
                sx={{ mt: 5 }}
                count={TotalPages}
                variant="outlined"
                shape="rounded"
                onChange={(e, pageCuren: number) => {
                  const f: any = {
                    brand: brandchange,
                    categorygroup: categorygroupchange,
                    category: categoryschange,
                    pricerange: pricerangechange,
                    rate: ratechange,
                    sortBy: sortBychange,
                    page: pageCuren,
                  };
                  dispatch(sortProductsByFilter(f));
                  setPage(page);
                }}
              />
            </Stack>
          )}
          <CartWidget totalItems={checkout.TotalQuantity} />
        </Container>
      </FormProvider>
      <Divider
        sx={{
          mt: 5,
          mb: 2,
        }}
      />
      <Footer />
    </>
  );
}
