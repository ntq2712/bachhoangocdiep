import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import {
  Link,
  Stack,
  Button,
  TableRow,
  Checkbox,
  MenuItem,
  TableCell,
  IconButton,
} from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// @types
import { IBanner, ICategoyGroup, IProduct } from '../../../@types/product';
// components
import Label from '../../../components/label';
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import ConfirmDialog from '../../../components/confirm-dialog';

// ----------------------------------------------------------------------

type Props = {
  row: IBanner;
  selected: boolean;
  onEditRow: VoidFunction;
  onViewRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function BannerTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
}: Props) {
  const { Title, Description, createdAt, updatedAt, RedirectUrl, ImageURL } = row;

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
          <Stack ddirection="row" alignItems="center" spacing={2}>
            <Image
              disabledEffect
              visibleByDefault
              alt={Title}
              src={ImageURL}
              sx={{ borderRadius: 1.5, width: 48, height: 48 }}
            />
            <Link
              noWrap
              color="inherit"
              variant="subtitle2"
              onClick={onViewRow}
              sx={{ cursor: 'pointer' }}
            >
              {Title}
            </Link>
          </Stack>
        </TableCell>

        <TableCell>{fDate(createdAt ? createdAt : '')}</TableCell>

        <TableCell align="left">
          <Link target="_blank" href={RedirectUrl}>
            {RedirectUrl}
          </Link>
        </TableCell>

        <TableCell align="left">{Description}</TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'primary' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
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

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
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
