import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { Box, Card, Fab, Link, Stack } from '@mui/material';
// components
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import { addToCart, getCarts } from 'src/redux/slices/product';
import { fCurrency } from 'src/utils/formatNumber';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../../../routes/paths';
// utils
// redux
import { useDispatch } from '../../../../redux/store';
// @types
import { IProduct } from '../../../../@types/product';

import Iconify from '../../../../components/iconify';
import Image from '../../../../components/image';
import Label from '../../../../components/label';

// ----------------------------------------------------------------------

type Props = {
  product: IProduct;
};

type typeCart = {
  ProductId: string;
  Quantity: number;
};

export default function ShopProductCard({ product }: Props) {
  const { Id, Name, Price, ImageURL, IsBestSeller } = product;
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuthContext();

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

  const handleAddCart = () => {
    // if (!isInitialized) {
    //   return <LoadingScreen />;
    // }
    if (!isAuthenticated) {
      if (pathname !== requestedLocation) {
        setRequestedLocation(pathname);
      }
      push(PATH_AUTH.login);
    } else {
      const cart: typeCart = {
        ProductId: Id,
        Quantity: 1,
      };
      addToCart(cart)
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
        {IsBestSeller && (
          <Label
            variant="filled"
            color={(IsBestSeller === true && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            BestSeller
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
            {/* {!IsBestSeller && (
              <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {Price + 20}đ
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
