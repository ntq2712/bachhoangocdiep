// @mui
import { Table, TableBody, TableContainer } from '@mui/material';
// @types
import { ICheckoutCartItem } from '../../../../../@types/product';
// components
import Scrollbar from '../../../../../components/scrollbar';
import { TableHeadCustom } from '../../../../../components/table';
//
import CheckoutCartProduct from './CheckoutCartProduct';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'product', label: 'Sản phẩm' },
  { id: 'price', label: 'Đơn giá' },
  { id: 'quantity', label: 'Số sượng' },
  { id: 'totalPrice', label: 'Tổng tiền', align: 'right' },
  { id: '' },
];

// ----------------------------------------------------------------------

type Props = {
  products: ICheckoutCartItem[];
  onDelete: (id: string) => void;
  onDecreaseQuantity: (id: string, productId: string,  quantity:number) => void;
  onIncreaseQuantity: (id: string, productId: string,  quantity:number) => void;
};

export default function CheckoutCartProductList({
  products,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: Props) {
  return (
    <TableContainer sx={{ overflow: 'unset' }}>
      <Scrollbar>
        <Table sx={{ minWidth: 720 }}>
          <TableHeadCustom headLabel={TABLE_HEAD} />

          <TableBody>
            {products.map((row) => (
              <CheckoutCartProduct
                key={row.Id}
                row={row}
                onDelete={() => onDelete(row.Id)}
                onDecrease={() => onDecreaseQuantity(row.Id, row.ProductId, row.Quantity)}
                onIncrease={() => onIncreaseQuantity(row.Id, row.ProductId, row.Quantity)}
              />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
}
