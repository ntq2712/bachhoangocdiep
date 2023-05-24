// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
// components
import { useEffect, useState } from 'react';
import { getBran, getCategory, getCategoryGroup } from 'src/api/ortherEcom';
// config
import { NAV } from '../../../../config-global';

import { RHFMultiCheckbox, RHFRadioGroup, RHFSlider } from '../../../../components/hook-form';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';

// ----------------------------------------------------------------------

export const FILTER_GENDER_OPTIONS = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
];

export const FILTER_CATEGORY_OPTIONS = [
  { label: 'All', value: 'All' },
  { label: 'Shose', value: 'Shose' },
  { label: 'Apparel', value: 'Apparel' },
  { label: 'Accessories', value: 'Accessories' },
];

export const FILTER_RATING_OPTIONS = [4, 3, 2, 1];

export const FILTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  isDefault: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  onResetFilter: VoidFunction;
};

export default function ShopFilterDrawer({
  open,
  onOpen,
  onClose,
  isDefault,
  onResetFilter,
}: Props) {
  const { control } = useFormContext();

  const [categorys, setCategorys] = useState<any>([])
  const [brands, setBrands] = useState<any>([])
  const [categoryGroups, setCategoryGroups] = useState<any>([])

  useEffect(() => {
    getCategory().then((res)=>{
      if(res.data.success === true){
        const tam:any = []
        res?.data?.Categories?.Data?.map((e:any)=>{
         tam.push( { label: e.Name, value: `${e.Id}&${e.Name}` })
        })
        setCategorys(tam)
      }
    })
    getBran().then((res)=>{
      if(res.data.success === true){
        const tam:any = []
        res?.data?.Brands?.Data?.map((e:any)=>{
         tam.push( { label: e.Name, value: `${e.Id}&${e.Name}` })
        })
        setBrands(tam)
      }
    })
    getCategoryGroup().then((res)=>{
      if(res.data.success === true){
        const tam:any = []
        res?.data?.CategoryGroups?.Data?.map((e:any)=>{
         tam.push( { label: e.Name, value: `${e.Id}&${e.Name}` })
        })
        setCategoryGroups(tam)
      }
    })
  }, []);

  const marksLabel = [...Array(21)].map((_, index) => {
    const value = index * 50;

    const firstValue = index === 0 ? `${value}k` : `${value}k`;

    return {
      value,
      label: index % 4 ? '' : firstValue,
    };
  });

  const getSelected = (selectedItems: string[], item: string) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpen}
      >
        Bộ lọc
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        BackdropProps={{
          invisible: true,
        }}
        PaperProps={{
          sx: { width: NAV.W_BASE },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2, pr: 1, py: 2 }}
        >
          <Typography variant="subtitle1">Bộ lọc</Typography>

          <IconButton onClick={onClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 2.5 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1"> Danh mục </Typography>
              <RHFMultiCheckbox name="categorygroup" options={categoryGroups} sx={{ width: 1 }} />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1"> Loại sản phẩm </Typography>
              <RHFMultiCheckbox name="categorys" options={categorys} sx={{ width: 1 }} />
            </Stack>
            
            <Stack spacing={1}>
              <Typography variant="subtitle1"> Thương hiệu </Typography>
              <RHFRadioGroup name="brand" options={brands} />
            </Stack>

            {/* <Stack spacing={1}>
              <Typography variant="subtitle1"> Color </Typography>

              <Controller
                name="colors"
                control={control}
                render={({ field }) => (
                  <ColorMultiPicker
                    selected={field.value}
                    colors={FILTER_COLOR_OPTIONS}
                    onChangeColor={(color) => field.onChange(getSelected(field.value, color))}
                    sx={{ maxWidth: 36 * 4 }}
                  />
                )}
              />
            </Stack> */}

            <Stack spacing={1} sx={{ pb: 2 }}>
              <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                Giá
              </Typography>

              <Stack direction="row" spacing={2}>
                <InputRange type="min" />
                <InputRange type="max" />
              </Stack>

              <RHFSlider
                name="pricerange"
                step={5}
                min={0}
                max={1000}
                marks={marksLabel}
                getAriaValueText={(value) => `${value}k`}
                valueLabelFormat={(value) => `${value}k`}
                sx={{ alignSelf: 'center', width: `calc(100% - 20px)` }}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1">Đánh giá</Typography>

              <Controller
                name="rate"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    {FILTER_RATING_OPTIONS.map((item, index) => (
                      <FormControlLabel
                        key={item}
                        value={item}
                        control={
                          <Radio
                            disableRipple
                            color="default"
                            icon={<Rating readOnly value={4 - index} />}
                            checkedIcon={<Rating readOnly value={4 - index} />}
                            sx={{
                              '&:hover': { bgcolor: 'transparent' },
                            }}
                          />
                        }
                        label="& trở lên"
                        sx={{
                          my: 0.5,
                          borderRadius: 1,
                          '&:hover': { opacity: 0.48 },
                          ...(field?.value?.includes(item) && {
                            bgcolor: 'action.selected',
                          }),
                        }}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
            </Stack>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <Badge
            color="error"
            variant="dot"
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            invisible={isDefault}
            sx={{ width: 1 }}
          >
            <Button
              fullWidth
              size="large"
              type="submit"
              color="inherit"
              variant="outlined"
              onClick={onResetFilter}
              startIcon={<Iconify icon="eva:trash-2-outline" />}
            >
              Clear
            </Button>
          </Badge>
        </Box>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

type InputRangeProps = {
  type: 'min' | 'max';
};

function InputRange({ type }: InputRangeProps) {
  const { control, setValue } = useFormContext();

  const handleBlurInputRange = (value: [number, number]) => {
    const min = value[0];

    const max = value[1];

    if (min < 0) {
      setValue('pricerange', [0, max]);
    }
    if (min > 1000) {
      setValue('pricerange', [1000, max]);
    }
    if (max < 0) {
      setValue('pricerange', [min, 0]);
    }
    if (max > 1000) {
      setValue('pricerange', [min, 1000]);
    }
  };

  return (
    <Controller
      name="pricerange"
      control={control}
      render={({ field }) => {
        const isMin = type === 'min';

        const min = field.value[0];

        const max = field.value[1];

        return (
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ width: 1 }}>
            <Typography
              variant="caption"
              sx={{
                flexShrink: 0,
                color: 'text.disabled',
                textTransform: 'capitalize',
                fontWeight: 'fontWeightBold',
              }}
            >
              {`${type} (k)`}
            </Typography>

            <Input
              disableUnderline
              fullWidth
              size="small"
              value={isMin ? min : max}
              onChange={(event) =>
                isMin
                  ? field.onChange([Number(event.target.value), max])
                  : field.onChange([min, Number(event.target.value)])
              }
              onBlur={() => handleBlurInputRange(field.value)}
              inputProps={{
                step: 5,
                min: 0,
                max: 1000,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
              sx={{
                pr: 1,
                py: 0.5,
                borderRadius: 0.75,
                typography: 'body2',
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                '& .MuiInput-input': { p: 0, textAlign: 'right' },
              }}
            />
          </Stack>
        );
      }}
    />
  );
}
