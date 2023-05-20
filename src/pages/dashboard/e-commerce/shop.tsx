import { useState, useEffect } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// next
import Head from 'next/head';
// @mui
import { Container, Typography, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getCarts, getProducts, sortProductsByFilter } from '../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { IProduct, IProductFilter } from '../../../@types/product';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import FormProvider from '../../../components/hook-form';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections
import {
  ShopTagFiltered,
  ShopProductSort,
  ShopProductList,
  ShopFilterDrawer,
  ShopProductSearch,
} from '../../../sections/@dashboard/e-commerce/shop';
import CartWidget from '../../../sections/@dashboard/e-commerce/CartWidget';
import DashboardLayoutNoneLogin from 'src/layouts/dashboard/DashboardLayoutNoneLogin';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------

EcommerceShopPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayoutNoneLogin>{page}</DashboardLayoutNoneLogin>
);

// ----------------------------------------------------------------------

export default function EcommerceShopPage() {
  const { themeStretch } = useSettingsContext();
  const { isAuthenticated, isInitialized } = useAuthContext();
  const dispatch = useDispatch();

  const { products, checkout, filter } = useSelector((state) => state.product);

  const [openFilter, setOpenFilter] = useState(false);

  const defaultValues = {
    // gender: [],
    // category: 'All',
    // colors: [],
    priceRange: [0, 200],
    // rating: '',
    // sortBy: 'featured',
    brand: 'All',
    categorys: [],
    categorygroup: [],
    // priceMin: 0,
    // priceMax: 800,
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
      !dirtyFields.priceRange &&
      !dirtyFields.priceMax) ||
    false;

  const values = watch();

  // const dataFiltered = applyFilter(products, values);

  useEffect(() => {
    //dispatch(getProducts());
    dispatch(sortProductsByFilter(filter));
    if (isAuthenticated) {
      dispatch(getCarts());
    }
  }, [dispatch]);

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
        <title> Ecommerce: Shop | Minimal UI</title>
      </Head>

      <FormProvider methods={methods}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          {/* <CustomBreadcrumbs
            heading="Shop"
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              {
                name: 'E-Commerce',
                href: PATH_DASHBOARD.eCommerce.root,
              },
              { name: 'Shop' },
            ]}
          /> */}

          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <ShopProductSearch />

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
                  &nbsp;Products found
                </Typography>

                <ShopTagFiltered isFiltered={!isDefault} onResetFilter={handleResetFilter} />
              </>
            )}
          </Stack>

          <ShopProductList products={products} loading={!products.length && isDefault} />

          <CartWidget totalItems={checkout.TotalQuantity} />
        </Container>
      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------

// function applyFilter(products: IProduct[], filters: any) {
//   // const { category, priceRange, rating, sortBy } = filters;

//   // const min = priceRange[0];

//   // const max = priceRange[1];

//   // // SORT BY
//   // if (sortBy === 'featured') {
//   //   products = orderBy(products, ['sold'], ['desc']);
//   // }

//   // if (sortBy === 'newest') {
//   //   products = orderBy(products, ['createdAt'], ['desc']);
//   // }

//   // if (sortBy === 'priceDesc') {
//   //   products = orderBy(products, ['price'], ['desc']);
//   // }

//   // if (sortBy === 'priceAsc') {
//   //   products = orderBy(products, ['price'], ['asc']);
//   // }

//   // // FILTER PRODUCTS
//   // // if (gender.length) {
//   // //   products = products.filter((product) => gender.includes(product.gender));
//   // // }

//   // // if (category !== 'All') {
//   // //   products = products.filter((product) => product.category === category);
//   // // }

//   // // if (colors.length) {
//   // //   products = products.filter((product) => product.colors.some((color) => colors.includes(color)));
//   // // }

//   // // if (min !== 0 || max !== 200) {
//   // //   products = products.filter((product) => product.price >= min && product.price <= max);
//   // // }

//   // if (rating) {
//   //   products = products.filter((product) => {
//   //     const convertRating = (value: string) => {
//   //       if (value === 'up4Star') return 4;
//   //       if (value === 'up3Star') return 3;
//   //       if (value === 'up2Star') return 2;
//   //       return 1;
//   //     };
//   //     return product.Price > convertRating(rating);
//   //   });
//   // }

//   return products;
// }
