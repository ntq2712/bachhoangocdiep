import { useState } from 'react';
// @mui
import {
  Button,
  Checkbox,
  Divider,
  IconButton,
  Link,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
// @types
import { IInvoice } from '../../../../@types/invoice';
// components
import ConfirmDialog from '../../../../components/confirm-dialog';
import { CustomAvatar } from '../../../../components/custom-avatar';
import Iconify from '../../../../components/iconify';
import Label from '../../../../components/label';
import MenuPopover from '../../../../components/menu-popover';

// ----------------------------------------------------------------------

type Props = {
  row: IInvoice;
  selected: boolean;
  onSelectRow: VoidFunction;
  onViewRow: VoidFunction;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function InvoiceTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}: Props) {
  const {
    PaidType,
    InvoiceNumber,
    ReceiverPhoneNumber,
    createdAt,
    Status,
    ReceiverName,
    TotalAmount,
    DeliveryDate,
    SubAmount,
  } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CustomAvatar name={ReceiverName} />

            <div>
              <Typography variant="subtitle2" noWrap>
                {ReceiverName}
              </Typography>

              <Link
                noWrap
                variant="body2"
                onClick={onViewRow}
                sx={{ color: 'text.disabled', cursor: 'pointer' }}
              >
                {InvoiceNumber}
              </Link>
            </div>
          </Stack>
        </TableCell>

        <TableCell align="left">{fDate(createdAt)}</TableCell>

        <TableCell align="left">{fDate(DeliveryDate)}</TableCell>

        <TableCell align="center">{TotalAmount}</TableCell>

        <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
          {PaidType === 'cash' ? 'Tiền mặt' : 'Chuyển khoản'}
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={
              (Status === 'Hoàn thành' && 'success') ||
              (Status === 'Đang chờ duyệt' && 'warning') ||
              (Status === 'Hủy' && 'error') ||
              (Status === 'Đã duyệt' && 'info') ||
              'default'
            }
          >
            {Status}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:eye-fill" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
