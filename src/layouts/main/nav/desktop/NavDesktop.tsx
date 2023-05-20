// @mui
import { Stack } from '@mui/material';
//
import { NavProps } from '../types';
import NavList from './NavList';
import { useEffect, useLayoutEffect, useState } from 'react';
import { getCategoryGroup } from 'src/api/ortherEcom';
import Iconify from 'src/components/iconify/Iconify';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function NavDesktop({ isOffset, data }: NavProps) {
  

  return (
    <Stack component="nav" direction="row" spacing={5} sx={{ mr: 5, height: 1 }}>
      {data?.map((link: any) => (
        <NavList key={link.title} item={link} isOffset={isOffset} />
      ))}
    </Stack>
  );
}
