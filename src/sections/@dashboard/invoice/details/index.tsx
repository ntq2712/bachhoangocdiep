// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
  MenuItem,
  Select,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// _mock_
import { IInvoice, IInvoiceDetaill } from '../../../../@types/invoice';
// components
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import Scrollbar from '../../../../components/scrollbar';
//
import InvoiceToolbar from './InvoiceToolbar';
import { useState } from 'react';
import { RHFSelect } from 'src/components/hook-form';
import { updateStatus } from 'src/api/ortherEcom';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const StyledRowResult = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  invoice: IInvoiceDetaill;
};

const STATUS_OPTIONS = ['Đang chờ duyệt', 'Duyệt', 'Đang giao hàng', 'Hoàn thành', 'Hủy'];

export default function InvoiceDetails({ invoice }: Props) {
  const { order, carts } = invoice;
  const {
    push,
    query: { id },
  } = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  if (!invoice) {
    return null;
  }

  return (
    <>
      <InvoiceToolbar invoice={invoice} />

      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Image disabledEffect alt="logo" src="/logo/Group_5.svg" sx={{ maxWidth: 120 }} />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
                variant="soft"
                color={
                  (order?.Status === 'Hoàn thành' && 'success') ||
                  (order?.Status === 'Đang chờ duyệt' && 'warning') ||
                  (order?.Status === 'Đã duyệt' && 'info') ||
                  (order?.Status === 'Hủy' && 'error') ||
                  'default'
                }
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {order?.Status}
              </Label>

              <Typography variant="h6">{order.InvoiceNumber}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                Từ
            </Typography>

            <Typography variant="body2">Bách hóa Ngọc Diệp</Typography>

            <Typography variant="body2">30/04 phường 5, Thị xã Cai Lậy, tỉnh Tiền Giang</Typography>

            <Typography variant="body2">Số điện thoại: 0397516328</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              đến
            </Typography>

            <Typography variant="body2">{order?.ReceiverName}</Typography>

            <Typography variant="body2">{order?.FullAddress}</Typography>

            <Typography variant="body2">Số điện thoại: {order?.ReceiverPhoneNumber}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Ngày đặt hàng
            </Typography>

            <Typography variant="body2">{fDate(order?.createdAt)}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Ngày hoàn thành
            </Typography>

            <Typography variant="body2">
              {order?.DeliveryDate ? order?.DeliveryDate : 'Chưa hoàn thành'}
            </Typography>
          </Grid>
        </Grid>

        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 960 }}>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell width={40}>#</TableCell>

                  <TableCell align="left">Tên sản phẩm</TableCell>

                  <TableCell align="center">Số lượng</TableCell>

                  <TableCell align="right">Đơn giá</TableCell>

                  <TableCell align="right">Tổng tiền</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {carts?.map((row: any, index: number) => (
                  <TableRow
                    key={index}
                    sx={{
                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>

                    <TableCell align="left">
                      <Box sx={{ maxWidth: 560 }}>
                        <Image
                          disabledEffect
                          visibleByDefault
                          alt={row.ProductName}
                          src={row.ProductImageURL}
                          sx={{ borderRadius: 1.5, width: 48, height: 48 }}
                        />
                        <Typography variant="subtitle2">{row.ProductName}</Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="center">{row.BuyingQuantity}</TableCell>

                    <TableCell align="right">{fCurrency(row.ProductPrice)}</TableCell>

                    <TableCell align="right">{fCurrency(row.Amount)}</TableCell>
                  </TableRow>
                ))}

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 2 }} />
                    Phương thức thanh toán
                  </TableCell>

                  <TableCell align="right" width={120} sx={{ typography: 'body1' }}>
                    <Box sx={{ mt: 2 }} />
                    {order.PaidType == 'transfer' ? 'Chuyển khoản' : 'Tiền mặt'}
                  </TableCell>
                </StyledRowResult>

                <StyledRowResult>
                  <TableCell colSpan={3} />

                  <TableCell align="right" sx={{ typography: 'h6' }}>
                    Thành tiền
                  </TableCell>

                  <TableCell align="right" width={140} sx={{ typography: 'h6' }}>
                    {fCurrency(order.SubAmount)}
                  </TableCell>
                </StyledRowResult>
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <Divider sx={{ mt: 5 }} />

        <Grid container>
          <Grid item xs={12} md={9} sx={{ py: 3 }}>
            <Typography variant="subtitle2">CHÚ Ý</Typography>

            <Typography variant="body2">
              Chúng tôi luôn sẳn sàn phục vụ quý khách, mọi thắc mắt hảy gửi về họp thư hổ trợ !
            </Typography>
          </Grid>

          <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
            <Typography variant="subtitle2">Hổ trợ</Typography>

            <Typography variant="body2">trongqui2712@gmail.com</Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
