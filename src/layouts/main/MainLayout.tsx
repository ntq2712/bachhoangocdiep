import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useAuthContext } from 'src/auth/useAuthContext';
import Header from '../dashboard/header/Header';
//
const HeaderNoneLOgin = dynamic(() => import('./Header'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { pathname } = useRouter();

  const { isAuthenticated } = useAuthContext();

  const isHome = pathname === '/';

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      {isAuthenticated ? <Header onOpenNav={handleOpen} /> : <HeaderNoneLOgin />}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 11 },
          }),
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
}
