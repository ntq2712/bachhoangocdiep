import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
// @types
import { IAddress } from '../../../../../@types/product';
// assets
import { useEffect, useState } from 'react';
import { getDistrict, getProvince, getWard } from 'src/api/ortherEcom';
import FormProvider, {
  RHFCheckbox,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from '../../../../../components/hook-form';

// ----------------------------------------------------------------------

interface FormValuesProps extends IAddress {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onCreateBilling: (address: IAddress) => void;
};

export default function CheckoutBillingNewAddressForm({ open, onClose, onCreateBilling }: Props) {
  const NewAddressSchema = Yup.object().shape({
    Name: Yup.string().required('Trường này bắt buộc'),
    ReceiverName: Yup.string().required('Trường này bắt buộc'),
    City: Yup.string().required('Trường này bắt buộc'),
    Ward: Yup.string().required('Trường này bắt buộc'),
    Street: Yup.string().required('Trường này bắt buộc'),
    District: Yup.string().required('Trường này bắt buộc'),
    ReceiverPhoneNumber: Yup.string().required('Trường này bắt buộc'),
  });

  const defaultValues = {
    Name: '',
    IsDefault: true,
    City: '',
    District: '',
    Ward: '',
    Street: '',
    ReceiverName: '',
    ReceiverPhoneNumber: '',
  
  };

  const methods = useForm<IAddress>({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: IAddress) => {
    
    const body: IAddress = {
      Name: data?.Name,
      IsDefault: data?.IsDefault,
      City: JSON.parse(data?.City).name,
      District: JSON.parse(data?.District).name,
      Ward: JSON.parse(data?.Ward).name,
      Street: data?.Street,
      ReceiverName: data?.ReceiverName,
      ReceiverPhoneNumber: data?.ReceiverPhoneNumber,
      CityGHNId: JSON.parse(data?.City).id | 0,
      DistrictGHNId: JSON.parse(data?.District).id | 0,
      WardGHNid: JSON.parse(data?.Ward).id |0
    };
    try {
      onCreateBilling(body);
    } catch (error) {
      console.error(error);
    }
  };

  const [provinces, setProvinces] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [wards, setWards] = useState<any>([]);

  useEffect(() => {
    getProvince().then((res) => {
      if (res?.data?.message === 'Success') {
        setProvinces(res.data.data);
      }
    });
  }, []);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Thêm địa chỉ mới</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            <RHFRadioGroup
              row
              name="Name"
              options={[
                { label: 'Nhà riêng ', value: 'home' },
                { label: 'Văn phòng', value: 'office' },
              ]}
            />
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="ReceiverName" label="Tên người nhận" />
              <RHFTextField name="ReceiverPhoneNumber" label="Số điện thoại" />
            </Box>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFSelect
                native
                onChange={(e) => {
                  setValue('City', e.target.value);
                  getDistrict(JSON.parse(e.target.value).id).then((res) => {
                    if (res?.data?.message === 'Success') {
                      setDistricts(res.data.data);
                    }
                  });
                }}
                name="City"
                label="Tỉnh / Thành phố"
              >
                <option value="" />
                {provinces?.map((province: any) => (
                  <option
                    key={province.ProvinceID}
                    value={JSON.stringify({ id: province.ProvinceID, name: province.ProvinceName })}
                  >
                    {province.ProvinceName}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect
                native
                onChange={(e) => {
                  setValue('District', e.target.value);
                  getWard(JSON.parse(e.target.value).id).then((res) => {
                    if (res?.data?.message === 'Success') {
                      setWards(res.data.data);
                    }
                  });
                }}
                name="District"
                label="Huyện / Quận"
              >
                <option value="" />
                {districts?.map((district: any) => (
                  <option
                    key={district.DistrictID}
                    value={JSON.stringify({ id: district.DistrictID, name: district.DistrictName })}
                  >
                    {district.DistrictName}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect native name="Ward" label="Xã / Phường">
                <option value="" />
                {wards?.map((ward: any) => (
                  <option
                    key={ward.WardCode}
                    value={JSON.stringify({ id: ward.WardCode, name: ward.WardName })}
                  >
                    {ward.WardName}
                  </option>
                ))}
              </RHFSelect>
            </Box>
            <RHFTextField name="Street" label="Số nhà đường / đường" />

            <RHFCheckbox name="IsDefault" label="Đặt làm địa chỉ mặc định." sx={{ mt: 3 }} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Gửi đến địa chỉ này
          </LoadingButton>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            Thoát
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
