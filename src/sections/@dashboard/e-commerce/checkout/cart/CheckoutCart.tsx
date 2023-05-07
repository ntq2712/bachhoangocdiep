import sum from 'lodash/sum';
// next
import NextLink from 'next/link';
// @mui
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// @types
import { IProductCheckoutState } from '../../../../../@types/product';
// components
import Iconify from '../../../../../components/iconify';
import EmptyContent from '../../../../../components/empty-content';
//
import CheckoutSummary from '../CheckoutSummary';
import CheckoutCartProductList from './CheckoutCartProductList';

// ----------------------------------------------------------------------

type Props = {
  checkout: IProductCheckoutState;
  onNextStep: VoidFunction;
  onApplyDiscount: (value: number) => void;
  onDeleteCart: (productId: string) => void;
  onIncreaseQuantity: (id: string, productId: string,  quantity:number) => void;
  onDecreaseQuantity: (id: string, productId: string,  quantity:number) => void;
};

export default function CheckoutCart({
  checkout,
  onNextStep,
  onApplyDiscount,
  onDeleteCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: Props) {
  const { Data, TotalPrice, TotalQuantity} = checkout;

  // const { Data, discount, shipping, subtotal, total, totalItems } = checkout;

  const isEmptyCart = !Data?.length;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Giỏ hàng của bạn
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({TotalQuantity} sản phẩm)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <CheckoutCartProductList
              products={Data}
              onDelete={onDeleteCart}
              onIncreaseQuantity={onIncreaseQuantity}
              onDecreaseQuantity={onDecreaseQuantity}
            />
          ) : (
            <EmptyContent
              title="Cart is empty"
              description="Look like you have no items in your shopping cart."
              img="/assets/illustrations/illustration_empty_cart.svg"
            />
          )}
        </Card>

        <Button
          component={NextLink}
          href={PATH_DASHBOARD.eCommerce.root}
          color="inherit"
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        >
          Continue Shopping
        </Button>
      </Grid>

      <Grid item xs={12} md={4}>
        <CheckoutSummary
          enableDiscount
          total={TotalPrice}
          discount={5}
          TotalQuantity={TotalQuantity}
          subtotal={10}
          shipping={0}
          onApplyDiscount={onApplyDiscount}
        />
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={!Data?.length}
          onClick={onNextStep}
        >
          Đặt hàng
        </Button>
      </Grid>
    </Grid>
  );
}
