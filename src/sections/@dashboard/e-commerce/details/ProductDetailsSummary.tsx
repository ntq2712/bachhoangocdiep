import { useEffect, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
// @mui
import {
  Button,
  Divider,
  IconButton,
  Rating,
  Stack,
  Typography
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// @types
import { ICheckoutCartItem, IDataAddCart, IProduct } from '../../../../@types/product';
// _mock
import { _socials } from '../../../../_mock/arrays';
// components
import { IncrementerButton } from '../../../../components/custom-input';
import FormProvider from '../../../../components/hook-form';
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

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

  const { Id, Name, Price, Quantity, IsBestSeller, Rate } = product;

  const isMaxQuantity =
    cart?.filter((item: any) => item.Id === Id).map((item: any) => item.quantity)[0] >= Quantity;

  const defaultValues = useMemo(()=>({
    ProductId: Id,
    Quantity: 1,
  }),[Id])

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data: IDataAddCart) => {
    try {
      onAddCart(data);
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

          <Typography
            variant="overline"
            component="div"
            sx={{
              color: IsBestSeller === true ? 'error.main' : 'info.main',
            }}
          >
            {IsBestSeller ? 'BestSeller' : ''}
          </Typography>

          <Typography variant="h5">{Name}</Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating value={Number(Rate) > 1 ? Number(Rate) : 0} precision={0.1} readOnly />

            { Number(Rate) < 1 && <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              (chưa có đánh giá)
            </Typography>}
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
            {/* <Box
              component="span"
              sx={{ color: 'text.disabled', textDecoration: 'line-through', mr: 0.5 }}
            >
              {fCurrency(Price + 10)}
            </Box> */}
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
            <IconButton key={social.name} href={social.path}>
              <Iconify icon={social.icon} />
            </IconButton>
          ))}
        </Stack>
      </Stack>
    </FormProvider>
  );
}
