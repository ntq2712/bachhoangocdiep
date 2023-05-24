import { useEffect, useState } from 'react';
// @mui
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { deleteAddress, getAdress } from 'src/api/ortherEcom';
// @types
import {
  IAddress,
  IProductCheckoutState
} from '../../../../../@types/product';
// _mock
// components
import Iconify from '../../../../../components/iconify';
import Label from '../../../../../components/label';
//

import CheckoutSummary from '../CheckoutSummary';
import CheckoutBillingNewAddressForm from './CheckoutBillingNewAddressForm';

// ----------------------------------------------------------------------

type Props = {
  checkout: IProductCheckoutState;
  onBackStep: VoidFunction;
  onCreateBilling: (address: IAddress) => void;
  onAddBilling: (address: IAddress) => void;
};

export default function CheckoutBillingAddress({
  checkout,
  onBackStep,
  onCreateBilling,
  onAddBilling,
}: Props) {
  const { TotalPrice, TotalQuantity } = checkout;
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [onload, setOnload] = useState<boolean>(false);
  const [listaddress, setListAdress] = useState<IAddress[]>([]);

  useEffect(() => {
    getAdress().then((res) => {
      if (res?.data?.success === true) {
        setListAdress(res?.data?.Data);
      }
    })
  }, [onload]);

  const onDeleteBilling = (Id: any) => {
    deleteAddress(Id).then((res)=>{
      if(res?.data?.success === true){
        setOnload(!onload)
        enqueueSnackbar('Xóa thành công!');
      }else{
        enqueueSnackbar('Đã có lỗi xảy ra!', { variant: 'error' })
      }
    }).catch((err)=>enqueueSnackbar('Đã có lỗi xảy ra!', { variant: 'error' }))
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {listaddress.map((address, index) => (
            <AddressItem
              key={index}
              address={address}
              onCreateBilling={() => onAddBilling(address)}
              onDeleteBilling={()=>onDeleteBilling(address.Id)}
            />
          ))}

          <Stack direction="row" justifyContent="space-between">
            <Button
              size="small"
              color="inherit"
              onClick={onBackStep}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              Trở về
            </Button>

            <Button
              size="small"
              variant="soft"
              onClick={handleOpen}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Thêm địa chỉ mới
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary
            total={TotalPrice}
            discount={5}
            shipping={0}
            TotalQuantity={TotalQuantity}
            subtotal={10}
          />
        </Grid>
      </Grid>

      <CheckoutBillingNewAddressForm
        open={open}
        onClose={handleClose}
        onCreateBilling={onCreateBilling}
      />
    </>
  );
}

// ----------------------------------------------------------------------

type AddressItemProps = {
  address: IAddress;
  onCreateBilling: VoidFunction;
  onDeleteBilling: VoidFunction;
};

function AddressItem({ address, onCreateBilling, onDeleteBilling }: AddressItemProps) {
  const { Name, IsDefault, City, District, Ward, Street, ReceiverPhoneNumber, ReceiverName } =
    address;

  return (
    <Card
      sx={{
        p: 3,
        mb: 3,
      }}
    >
      <Stack
        spacing={2}
        alignItems={{
          md: 'flex-end',
        }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
      >
        <Stack flexGrow={1} spacing={1}>
          <Stack direction="row" alignItems="center">
            <Typography variant="subtitle1">
              {ReceiverName}
              <Box component="span" sx={{ ml: 0.5, typography: 'body2', color: 'text.secondary' }}>
                ({Name})
              </Box>
            </Typography>

            {IsDefault && (
              <Label color="info" sx={{ ml: 1 }}>
                Default
              </Label>
            )}
          </Stack>

          <Typography variant="body2">{`${City}, ${District}, ${Ward}, ${Street}`}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {ReceiverPhoneNumber}
          </Typography>
        </Stack>

        <Stack flexDirection="row" flexWrap="wrap" flexShrink={0}>
          {!IsDefault && (
            <Button
              onClick={onDeleteBilling}
              variant="outlined"
              size="small"
              color="inherit"
              sx={{ mr: 1 }}
            >
              Xóa
            </Button>
          )}

          <Button variant="outlined" size="small" onClick={onCreateBilling}>
            Gửi đến địa chỉ này
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
