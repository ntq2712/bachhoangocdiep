import { useState } from 'react';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Button, MenuItem, Box } from '@mui/material';
import { sortProducts } from 'src/redux/slices/product';
import { useDispatch } from 'src/redux/store';
// components
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';


// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ShopProductSort() {
  const { control } = useFormContext();

  const dispatch = useDispatch();

  const OPTIONS = [
    { value: 'createdAt&asc', label: 'Cũ đến mới' },
    { value: 'createdAt&desc', label: 'Mới đến cũ' },
    { value: 'Price&desc', label: 'Giá: cao đến thấp' },
    { value: 'Price&asc', label: 'Giá: thấp đến cao' },
  ];

  function renderLabel(label: string) {
   
    return {
      'createdAt&asc': 'Cũ đến mới',
      'createdAt&desc': 'Mới đến cũ',
      'Price&desc': 'Giá: cao đến thấp',
      'Price&asc': 'Giá: thấp đến cao',
    }[label];
  }

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <Controller
      name="sortBy"
      control={control}
      render={({ field }) => (
        <>
          <Button
            disableRipple
            color="inherit"
            onClick={handleOpenPopover}
            endIcon={
              <Iconify icon={openPopover ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />
            }
            sx={{ fontWeight: 'fontWeightMedium' }}
          >
            Sort By:
            <Box component="span" sx={{ color: 'text.secondary', ml: 0.5 }}>
              {renderLabel(field.value)}
            </Box>
          </Button>

          <MenuPopover open={openPopover} onClose={handleClosePopover}>
            {OPTIONS.map((option) => (
              <MenuItem
                key={option.value}
                selected={option.value === field.value}
                onClick={() => {
                  handleClosePopover();
                  // dispatch(sortProducts(option.value));
                  field.onChange(option.value);
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </MenuPopover>
        </>
      )}
    />
  );
}
