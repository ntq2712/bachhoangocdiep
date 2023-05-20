import { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
// next
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';
// routes
// @types
import { ICategoy, ICategoyGroup, IProduct } from '../../../@types/product';
// components
import FormProvider, { RHFEditor, RHFSelect, RHFTextField } from '../../../components/hook-form';
import {
  getCategory,
  getCategoryById,
  getCategoryGroup,
  newBrand,
  newCategory,
  newCategoryGroup,
} from 'src/api/ortherEcom';
import { useSnackbar } from 'notistack';
import { error } from 'console';
import { getValue } from '@mui/system';

// ----------------------------------------------------------------------

const CATEGORY_OPTION = [
  { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather'] },
  { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats'] },
  { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] },
];

type Props = {
  isEdit?: boolean;
  currentProduct?: ICategoy;
  handleClose: any;
};

export default function BrandEditForm({ isEdit, currentProduct, handleClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const [categoryGroups, setCategoryGroups] = useState<ICategoyGroup[]>([]);
  const [categorys, setCategorys] = useState<ICategoy[]>([]);

  useEffect(() => {
    getCategoryGroup().then((res) => {
      if (res?.data?.success == true) {
        setCategoryGroups(res?.data?.CategoryGroups?.Data);
      } else {
        enqueueSnackbar('Không thành công');
      }
    });
  }, []);

  const NewProductSchema = Yup.object().shape({
    Name: Yup.string().required('Nhập tên nhóm danh mục'),
  });

  const defaultValues = useMemo<Partial<ICategoy>>(
    () => ({
      Name: '',
      CategoryGroupId: '',
      CategoryId: '',
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
    getValues,
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

  const onSubmit = (data: Partial<ICategoy>) => {
    try {
      newBrand(data).then((res) => {
        if (res?.data?.success == true) {
          enqueueSnackbar(!isEdit ? 'Thành công!' : 'Update success!');
          handleClose();
        } else {
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
            <RHFTextField name="Name" label="Tên thương hiệu" />
            <RHFSelect
              sx={{ marginBottom: 2 }}
              native
              name="CategoryGroupId"
              label="Thuộc nhóm danh mục"
              onChange={(e) => {
                setValue('CategoryGroupId', e.target.value);
                getCategoryById(e.target.value).then((res) => {
                  if (res?.data?.success == true) {
                    setCategorys(res?.data?.category);
                  } else {
                    enqueueSnackbar('Không thành công');
                  }
                });
              }}
            >
              <option value="" />
              {categoryGroups?.map((categoryGroup: any) => (
                <option key={categoryGroup.Id} value={categoryGroup.Id}>
                  {categoryGroup.Name}
                </option>
              ))}
            </RHFSelect>
            <RHFSelect sx={{ marginBottom: 2 }} native name="CategoryId" label="Thuộc danh mục">
              <option value="" />
              {categorys?.map((category: any) => (
                <option key={category.Id} value={category.Id}>
                  {category.Name}
                </option>
              ))}
            </RHFSelect>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Mô tả
              </Typography>

              <RHFEditor simple name="Description" />
            </Stack>
          </Stack>
        </Card>
        <LoadingButton
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
        >
          {!isEdit ? 'Tạo danh mục' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </FormProvider>
  );
}
