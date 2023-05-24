import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormHelperText,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
// components
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { newReview } from 'src/api/ortherEcom';
import { getProduct } from 'src/redux/slices/product';
import FormProvider, { RHFTextField } from '../../../../components/hook-form';
import { useDispatch } from '../../../../redux/store';

// ----------------------------------------------------------------------

type FormValuesProps = {
  rate: number | string | null;
  content: string;
  // name: string;
  // email: string;
};

interface Props extends DialogProps {
  onClose: VoidFunction;
}

export default function ProductDetailsNewReviewForm({ onClose, ...other }: Props) {
  const {
    query: { name },
  } = useRouter();

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const ReviewSchema = Yup.object().shape({
    rate: Yup.mixed().required('Rating is required'),
    content: Yup.string().required('Review is required'),
    // name: Yup.string().required('Name is required'),
    // email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    productid: name,
    content: '',
    rate: null,
    // rating: null,
    // review: '',
    // name: '',
    // email: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ReviewSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      newReview(data).then((res) => {
        if (res?.data?.success == true) {
          dispatch(getProduct(name as string));
          reset();
          onClose();
        } else {
          enqueueSnackbar(res?.data.message, { variant: 'error' });
        }
      });
    } catch (error) {
      enqueueSnackbar('Bạn chưa đăng nhập!', { variant: 'error' });
    }
  };

  const onCancel = () => {
    onClose();
    reset();
  };

  return (
  
      <Dialog onClose={onClose} {...other}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle> Tạo đánh giá </DialogTitle>

          <DialogContent>
            <Stack direction="row" flexWrap="wrap" alignItems="center" spacing={1.5}>
              <Typography variant="body2">Đánh giá của bạn về sản phẩm này:</Typography>

              <Controller
                name="rate"
                control={control}
                render={({ field }) => <Rating {...field} value={Number(field.value)} />}
              />
            </Stack>

            {!!errors.rate && <FormHelperText error> {errors.rate?.message}</FormHelperText>}

            <RHFTextField
              name="content"
              label="Đánh giá *"
              multiline
              rows={3}
              sx={{ mt: 3, width: 500 }}
            />

            {/* <RHFTextField name="name" label="Name *" sx={{ mt: 3 }} />

          <RHFTextField name="email" label="Email *" sx={{ mt: 3 }} /> */}
          </DialogContent>

          <DialogActions>
            <Button color="inherit" variant="outlined" onClick={onCancel}>
              Thoát
            </Button>

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Tạo đánh giá
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
  
  );
}
