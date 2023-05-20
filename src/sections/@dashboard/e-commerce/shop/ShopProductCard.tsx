import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { Box, Card, Link, Stack, Fab } from '@mui/material';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// redux
import { useDispatch } from '../../../../redux/store';
// @types
import { IProduct } from '../../../../@types/product';
// components
import Iconify from '../../../../components/iconify';
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import { ColorPreview } from '../../../../components/color-utils';
import { useSnackbar } from 'notistack';
import { addToCart, getCarts } from 'src/redux/slices/product';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Login from '../../../../pages/auth/login';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import LoginPage from '../../../../pages/auth/login';

// ----------------------------------------------------------------------

type Props = {
  product: IProduct;
};

type typeCart = {
  ProductId: string;
  Quantity: number;
};

export default function ShopProductCard({ product }: Props) {
  const { Id, Name, Price, Status, ImageURL, Rate } = product;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { isAuthenticated, isInitialized } = useAuthContext();

  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (isAuthenticated) {
      setRequestedLocation(null);
    }
  }, [isAuthenticated, pathname, push, requestedLocation]);

  const linkTo = PATH_DASHBOARD.eCommerce.view(paramCase(Id));

  const handleAddCart = async () => {
    if (!isInitialized) {
     
      return <LoadingScreen />;
    }
    if (!isAuthenticated) {
      
      if (pathname !== requestedLocation) {
        setRequestedLocation(pathname);
      }
      push(PATH_AUTH.login)
    } else {
      const cart: typeCart = {
        ProductId: Id,
        Quantity: 1,
      };
      addToCart(cart)
        .then((res) => {
          if (res?.data?.success == true) {
            dispatch(getCarts());
            enqueueSnackbar('Thêm vào giỏ hàng thành công!');
          } else {
            enqueueSnackbar('Thêm vào giỏ hàng không thành công!');
          }
        })
        .catch(() => {
          enqueueSnackbar('Thêm vào giỏ hàng không thành công!');
        });
    }
  };

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', p: 1 }}>
        {Status && (
          <Label
            variant="filled"
            color={(Status === true && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            Sale
            {/* {Status} */}
          </Label>
        )}
        <Fab
          color="warning"
          size="medium"
          className="add-cart-btn"
          onClick={handleAddCart}
          sx={{
            right: 16,
            bottom: 16,
            zIndex: 9,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('all', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          <Iconify icon="ic:round-add-shopping-cart" />
        </Fab>

        <Image alt={Name} src={ImageURL} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      </Box>

      <Stack spacing={2.5} sx={{ p: 3 }}>
        <Link component={NextLink} href={linkTo} color="inherit" variant="subtitle2" noWrap>
          {Name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}

          <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
            {/* {priceSale && (
              <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(PriceSale)}
              </Box>
            )} */}
            {/* <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
              {fCurrency(Price + 20)}đ
            </Box> */}
            <Box component="span">{fCurrency(Price)}đ</Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
