import { useEffect, useState } from 'react';
// @mui
import { Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// auth
import AuthGuard from '../../auth/AuthGuard';
// components
import { useSettingsContext } from '../../components/settings';
//
import Main from './Main';
import HeaderLogin from './header';
import NavMini from './nav/NavMini';
import NavVertical from './nav/NavVertical';
import NavHorizontal from './nav/NavHorizontal';
import HeaderNoneLogin from '../main/Header';
import { useRouter } from 'next/router';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function DashboardLayoutNoneLogin({ children }: Props) {
  const { themeLayout } = useSettingsContext();

  const { isAuthenticated, isInitialized } = useAuthContext();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = <NavVertical openNav={open} onCloseNav={handleClose} />;

  const renderContent = () => {
    if (isNavHorizontal) {
      return (
        <>
          {/* <Header onOpenNav={handleOpen} /> */}

          {/* {isDesktop ? <NavHorizontal /> : renderNavVertical} */}

          <Main>{children}</Main>
        </>
      );
    }

    if (isNavMini) {
      return (
        <>
          {/* <Header  /> */}

          <Box
            sx={{
              display: { lg: 'flex' },
              minHeight: { lg: 1 },
            }}
          >
            {/* {isDesktop ? <NavMini /> : renderNavVertical} */}

            <Main>{children}</Main>
          </Box>
        </>
      );
    }

    return (
      <>
        {isAuthenticated ? <HeaderLogin /> : <HeaderNoneLogin />}

        <Box
          sx={{
            display: { lg: 'flex' },
            minHeight: { lg: 1 },
          }}
        >
          {/* {renderNavVertical} */}

          <Main>{children}</Main>
        </Box>
      </>
    );
  };

  return renderContent();
}
