// @mui
import { Box, Stack, Divider, TableRow, TableCell, Typography, IconButton } from '@mui/material';
// utils
import { fCurrency } from '../../../../../utils/formatNumber';
// @types
import { ICheckoutCartItem } from '../../../../../@types/product';
// components
import Image from '../../../../../components/image';
import Label from '../../../../../components/label';
import Iconify from '../../../../../components/iconify';
import { ColorPreview } from '../../../../../components/color-utils';
import { IncrementerButton } from '../../../../../components/custom-input';

// ----------------------------------------------------------------------

type CheckoutProductListRowProps = {
  row: ICheckoutCartItem;
  onDelete: VoidFunction;
  onDecrease: VoidFunction;
  onIncrease: VoidFunction;
};

export default function CheckoutCartProduct({
  row,
  onDelete,
  onDecrease,
  onIncrease,
}: CheckoutProductListRowProps) {
  const { Product,  SubTotal,  Quantity } = row;

  return (
    <TableRow>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Image
          alt="product image"
          src={Product?.ImageURL}
          sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
        />

        <Stack spacing={0.5}>
          <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
            {Product?.Name}
          </Typography>

        
        </Stack>
      </TableCell>

      <TableCell>{fCurrency(Product?.Price)}</TableCell>

      <TableCell>
        <Box sx={{ width: 96, textAlign: 'right' }}>
          <IncrementerButton
            quantity={Quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            disabledDecrease={Quantity <= 1}
            disabledIncrease={Quantity > Product?.Quantity}
          />

          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Số lượng: {Product?.Quantity}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="right">{fCurrency(SubTotal)}</TableCell>

      <TableCell align="right">
        <IconButton onClick={onDelete}>
          <Iconify icon="eva:trash-2-outline" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
