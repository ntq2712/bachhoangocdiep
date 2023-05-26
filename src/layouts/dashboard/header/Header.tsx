// @mui
import { AppBar, Box, Container, Stack, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCallback, useLayoutEffect, useState } from 'react';
import { getBranByCategory, getCategoryById, getCategoryGroup } from 'src/api/ortherEcom';
import NavDesktop from 'src/layouts/main/nav/desktop/NavDesktop';
import { NavItemProps } from 'src/layouts/main/nav/types';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { ShopProductSearch } from 'src/sections/@dashboard/e-commerce/shop';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// config
import { HEADER } from '../../../config-global';
// components
import Iconify from '../../../components/iconify';
import Logo from '../../../components/logo';
//

import AccountPopover from './AccountPopover';
import ContactsPopover from './ContactsPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const [datanav, setDatenav] = useState<NavItemProps[]>([]);

  const navBrands = useCallback((id: string): [] => {
    const team: any = [];
    getBranByCategory(id).then((resb) => {
      if (resb.data.success === true) {
        if (resb?.data?.brands?.length > 0) {
          resb.data.brands.map((k: any) =>
            team.push({
              id: k.Id,
              title: k.Name,
              icon: <Iconify icon="eva:home-fill" />,
              path: PATH_DASHBOARD.eCommerce.shop,
            })
          );
        }
      }
    });
    return team;
  }, []);

  const navcategory = useCallback(
    (id: string) => {
      const tem: any = [];
      getCategoryById(id).then((resp) => {
        if (resp.data.success === true) {
          if (resp?.data?.category?.length > 0) {
            resp.data.category.map((i: any) => {
              const team: any = navBrands(i.Id);
              return tem.push({
                subheader: i.Name,
                items: team,
              });
            });
          }
        }
      });
      return tem;
    },
    [navBrands]
  );

  useLayoutEffect(() => {
    const tam: any = [];
    getCategoryGroup().then((res) => {
      if (res.data.success === true) {
        res.data.CategoryGroups.Data.map((e: any) =>
          tam.push({
            id: e.Id,
            title: e.Name,
            icon: <Iconify icon="eva:home-fill" />,
            path: PATH_DASHBOARD.eCommerce.shop,
            children: navcategory(e.Id),
          })
        );
        tam.push({
          id: '',
          title: 'Khác',
          icon: <Iconify icon="eva:home-fill" />,
          path: PATH_DASHBOARD.eCommerce.shop,
        });
      }
      setDatenav(tam);
    });
  }, [navcategory]);

  const isDesktop = useResponsive('up', 'lg');

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP);

  const renderContent = (
    <Stack
      flexGrow={1}
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      spacing={{ xs: 0.5, sm: 1.5 }}
    >
      <LanguagePopover />

      <NotificationsPopover />

      <ContactsPopover />

      <AccountPopover />
    </Stack>
  );

  console.log('datanav:', datanav)
  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),

        ...(isDesktop && {
          width: '100%',
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
        }),
      }}
    >
      <Container>
        <Toolbar
          sx={{
            height: 1,
            // px: { lg: 5 },
          }}
        >
          <Logo sx={{ mr: 5 }} />
          <ShopProductSearch />
          <Box sx={{ flexGrow: 1 }} />
          {isDesktop && <NavDesktop isOffset={isOffset} data={datanav} />}
          {renderContent}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
