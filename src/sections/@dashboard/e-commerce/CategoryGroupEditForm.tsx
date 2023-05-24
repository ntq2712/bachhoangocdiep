import { useEffect, useMemo } from 'react';
import * as Yup from 'yup';
// next
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { newCategoryGroup } from 'src/api/ortherEcom';
// routes
// @types
import { ICategoyGroup, IProduct } from '../../../@types/product';
// components
import FormProvider, { RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
  currentProduct?: IProduct;
  handleClose: any;
};

export default function CategoryGroupEditForm({ isEdit, currentProduct, handleClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    Name: Yup.string().required('Nhập tên nhóm danh mục'),
  });

  const defaultValues = useMemo<Partial<ICategoyGroup>>(
    () => ({
      Name: '',
      Description: '',
    }),

    []
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  const onSubmit = (data: Partial<ICategoyGroup>) => {
    try {
      newCategoryGroup(data).then((res) => {
        if(res?.data?.success === true){
            enqueueSnackbar(!isEdit ? 'Thành công!' : 'Update success!');
            handleClose();
        }else{
            enqueueSnackbar('Không thành công');
        }
      });
      // reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12} md={8} sx={{ justifyContent: 'center' }}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            <RHFTextField name="Name" label="Tên nhóm danh mục" />
            <RHFTextField name="Description" label="Mô tả" />
          </Stack>
        </Card>
        <LoadingButton
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
        >
          {!isEdit ? 'Tạo nhóm danh mục' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </FormProvider>
  );
}
