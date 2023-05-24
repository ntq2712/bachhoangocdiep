// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, AppBar, Toolbar, IconButton, Container, Box } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// config
import { HEADER, NAV } from '../../../config-global';
// components
import Logo from '../../../components/logo';
import Iconify from '../../../components/iconify';
import { useSettingsContext } from '../../../components/settings';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import ContactsPopover from './ContactsPopover';
import NotificationsPopover from './NotificationsPopover';
import { ShopProductSearch } from 'src/sections/@dashboard/e-commerce/shop';
import { useLayoutEffect, useState } from 'react';
import { getBranByCategory, getCategoryById, getCategoryGroup } from 'src/api/ortherEcom';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { NavItemProps } from 'src/layouts/main/nav/types';
import NavDesktop from 'src/layouts/main/nav/desktop/NavDesktop';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const [datanav, setDatenav] = useState<NavItemProps[]>([]);

  const navBrands = (id: string): [] => {
    const team: any = [];
    getBranByCategory(id).then((resb) => {
      if (resb.data.success == true) {
        if (resb?.data?.brands?.length < 1) {
          return team;
        } else {
          resb.data.brands.map((k: any) => {
            team.push({
              id: k.Id,
              title: k.Name,
              icon: <Iconify icon="eva:home-fill" />,
              path: PATH_DASHBOARD.eCommerce.shop,
            });
          });
        }
      }
    });
    return team;
  };

  const navcategory = (id: string) => {
    let tem: any = [];
    getCategoryById(id).then((resp) => {
      if (resp.data.success == true) {
        if (resp?.data?.category?.length < 1) {
          return;
        } else {
          resp.data.category.map((i: any) => {
            const team: any = navBrands(i.Id);
            tem.push({
              subheader: i.Name,
              items: team,
            });
          });
        }
      }
    });
    return tem;
  };

  useLayoutEffect(() => {
    const tam: any = [];
    getCategoryGroup().then((res) => {
      if (res.data.success == true) {
        res.data.CategoryGroups.Data.map((e: any) => {
          tam.push({
            id: e.Id,
            title: e.Name,
            icon: <Iconify icon="eva:home-fill" />,
            path: PATH_DASHBOARD.eCommerce.shop,
            children: navcategory(e.Id),
          });
        });
        tam.push({
          id: '',
          title: 'Khác',
          icon: <Iconify icon="eva:home-fill" />,
          path: PATH_DASHBOARD.eCommerce.shop,
        });
      }
      setDatenav(tam);
    });
  }, []);

  // const { themeLayout } = useSettingsContext();

  // const isNavHorizontal = themeLayout === 'horizontal';

  // const isNavMini = themeLayout === 'mini';

  const isDesktop = useResponsive('up', 'lg');

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) 
  //&& !isNavHorizontal;

  const renderContent = (
    <>
      {/* {isDesktop && isNavHorizontal && <Logo sx={{ mr: 2.5 }} />} */}

      {/* {!isDesktop && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )} */}

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
    </>
  );

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
        //`calc(100% - ${NAV.W_DASHBOARD + 1}px)`
        ...(isDesktop && {
          width: '100%',
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          // ...(isNavHorizontal && {
          //   width: 1,
          //   bgcolor: 'background.default',
          //   height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          //   borderBottom: `dashed 1px ${theme.palette.divider}`,
          // }),
          // ...(isNavMini && {
          //   width: `calc(100% - ${NAV.W_DASHBOARD_MINI + 1}px)`,
          // }),
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
