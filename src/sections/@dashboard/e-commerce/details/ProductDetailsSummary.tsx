import { useEffect } from 'react';
import { sentenceCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import {
  Box,
  Link,
  Stack,
  Button,
  Rating,
  Divider,
  MenuItem,
  Typography,
  IconButton,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fShortenNumber, fCurrency } from '../../../../utils/formatNumber';
// @types
import { IProduct, ICheckoutCartItem, IDataAddCart } from '../../../../@types/product';
// _mock
import { _socials } from '../../../../_mock/arrays';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import { IncrementerButton } from '../../../../components/custom-input';
import { ColorSinglePicker } from '../../../../components/color-utils';
import FormProvider, { RHFSelect } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<ICheckoutCartItem, 'colors'> {
  colors: string;
}

type Props = {
  product: IProduct;
  cart: ICheckoutCartItem[];
  onAddCart: (cartItem: IDataAddCart) => void;
  onGotoStep: (step: number) => void;
};

export default function ProductDetailsSummary({
  cart,
  product,
  onAddCart,
  onGotoStep,
  ...other
}: Props) {
  const { push } = useRouter();

  const { Id, Name, Price, Quantity, Status, Rate } = product;

  //const alreadyProduct = cart?.map((item: any) => item.Id).includes(Id);

  const isMaxQuantity =
    cart?.filter((item: any) => item.Id === Id).map((item: any) => item.quantity)[0] >= Quantity;

  const defaultValues = {
    ProductId: Id,
    Quantity: 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = async (data: IDataAddCart) => {
    try {
      onAddCart(data)
      onGotoStep(0);
      push(PATH_DASHBOARD.eCommerce.checkout);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCart = async () => {
    try {
      onAddCart(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={3}
        sx={{
          p: (theme) => ({
            md: theme.spacing(5, 5, 0, 2),
          }),
        }}
        {...other}
      >
        <Stack spacing={2}>
          {/* <Label
            variant="soft"
            color={inventoryType === 'in_stock' ? 'success' : 'error'}
            sx={{ textTransform: 'uppercase', mr: 'auto' }}
          >
            {sentenceCase(inventoryType || '')}
          </Label> */}

          <Typography
            variant="overline"
            component="div"
            sx={{
              color: Status === true ? 'error.main' : 'info.main',
            }}
          >
            {Status ? 'sale' : ''}
          </Typography>

          <Typography variant="h5">{Name}</Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating value={Number(Rate) > 1 ? Number(Rate) : 5} precision={0.1} readOnly />

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ({fShortenNumber(68)}
              reviews)
            </Typography>
          </Stack>

          <Typography variant="h4">
            {/* {priceSale && (
              <Box
                component="span"
                sx={{ color: 'text.disabled', textDecoration: 'line-through', mr: 0.5 }}
              >
                {fCurrency(priceSale)}
              </Box>
            )} */}
            <Box
              component="span"
              sx={{ color: 'text.disabled', textDecoration: 'line-through', mr: 0.5 }}
            >
              {fCurrency(Price + 10)}
            </Box>
            {fCurrency(Price)}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <Typography variant="subtitle2">Color</Typography> */}

          {/* <Controller
            name="colors"
            control={control}
            render={({ field }) => (
              <ColorSinglePicker
                colors={colors}
                value={field.value}
                onChange={field.onChange}
                sx={{
                  ...(colors.length > 4 && {
                    maxWidth: 144,
                    justifyContent: 'flex-end',
                  }),
                }}
              />
            )}
          /> */}
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          {/* <Typography variant="subtitle2" sx={{ height: 40, lineHeight: '40px', flexGrow: 1 }}>
            Size
          </Typography> */}
          <Typography variant="subtitle2" sx={{ height: 40, lineHeight: '40px', flexGrow: 1 }}>
            Điểmm tích lũy
          </Typography>
          {/* <RHFSelect
            name="size"
            size="small"
            helperText={
              <Link underline="always" color="inherit">
                Size Chart
              </Link>
            }
            sx={{
              maxWidth: 96,
              '& .MuiFormHelperText-root': {
                mx: 0,
                mt: 1,
                textAlign: 'right',
              },
            }}
          >
            {sizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </RHFSelect> */}

          <Stack spacing={1}>
            <Typography
              variant="caption"
              component="div"
              sx={{ textAlign: 'left', color: 'text.secondary' }}
            >
              {Number(Price) / 100000}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" sx={{ height: 36, lineHeight: '36px' }}>
            Quantity
          </Typography>

          <Stack spacing={1}>
            <IncrementerButton
              name="quantity"
              quantity={values.Quantity}
              disabledDecrease={values.Quantity <= 1}
              disabledIncrease={values.Quantity >= Quantity}
              onIncrease={() => setValue('Quantity', values.Quantity + 1)}
              onDecrease={() => setValue('Quantity', values.Quantity - 1)}
            />

            <Typography
              variant="caption"
              component="div"
              sx={{ textAlign: 'right', color: 'text.secondary' }}
            >
              Available: {Quantity}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            disabled={isMaxQuantity}
            size="large"
            color="warning"
            variant="contained"
            startIcon={<Iconify icon="ic:round-add-shopping-cart" />}
            onClick={handleAddCart}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Thêm vào giỏ
          </Button>

          <Button fullWidth size="large" type="submit" variant="contained">
            Mua ngay
          </Button>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="center">
          {_socials.map((social) => (
            <IconButton key={social.name}>
              <Iconify icon={social.icon} />
            </IconButton>
          ))}
        </Stack>
      </Stack>
    </FormProvider>
  );
}
