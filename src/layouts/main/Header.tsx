// @mui
import { AppBar, Box, BoxProps, Button, Container, Link, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic'
//
import NextLink from 'next/link';
import { useCallback, useLayoutEffect, useState } from 'react';
import { getBranByCategory, getCategoryById, getCategoryGroup } from 'src/api/ortherEcom';
import Iconify from 'src/components/iconify/Iconify';
import { ShopProductSearch } from 'src/sections/@dashboard/e-commerce/shop';
import navConfig from './nav/config-navigation';
import NavMobile from './nav/mobile';
import { NavItemProps } from './nav/types';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgBlur } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config-global';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../routes/paths';
// components
import Logo from '../../components/logo';

    
const NavDesktop = dynamic(() => import('./nav/desktop'), { ssr: false });
// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

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
        })
      }
      setDatenav(tam);
    });
  }, [navcategory]);

  return (
    <AppBar color="transparent" sx={{ boxShadow: 0 }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Logo sx={{ mr: 5 }} />
          <ShopProductSearch />
          <Box sx={{ flexGrow: 1 }} />

          {isDesktop && <NavDesktop isOffset={isOffset} data={datanav} />}

          <Button variant="contained" rel="noopener" href={PATH_AUTH.login}>
            Đăng nhập
          </Button>
          <Link component={NextLink} href={PATH_DASHBOARD.eCommerce.checkout}>
            <Iconify
              icon="eva:shopping-cart-fill"
              width={24}
              color="#333"
              sx={{ ml: 5, mr: -10 }}
            />
          </Link>
          {!isDesktop && <NavMobile isOffset={isOffset} data={navConfig} />}
        </Container>
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  );
}

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
