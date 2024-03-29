import { m, useScroll, useSpring } from 'framer-motion';
// next
import Head from 'next/head';
// @mui
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// layouts
import MainLayout from '../layouts/main';
// sections
import { HomeHero } from '../sections/home';
import DemoCarouselsPage from './components/extra/carousel';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  const theme = useTheme();

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progress = (
    <m.div
      style={{
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1999,
        position: 'fixed',
        transformOrigin: '0%',
        backgroundColor: theme.palette.primary.main,
        scaleX,
      }}
    />
  );

  return (
    <>
      <Head>
        <title> Bách hóa ngọc diệp | cửa hàng</title>
      </Head>

      {progress}

      <HomeHero />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
          pt: 3,
        }}
      >
        <DemoCarouselsPage />
      </Box>
    </>
  );
}
