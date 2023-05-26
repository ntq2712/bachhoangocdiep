import { useRef } from 'react';
// @mui
import { Box, CardContent, Link, Paper } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { paramCase } from 'change-case';
import { IProduct } from 'src/@types/product';
import { PATH_DASHBOARD } from 'src/routes/paths';
// utils
import { bgGradient } from '../../../../utils/cssStyles';
// components
import Carousel, { CarouselArrows } from '../../../../components/carousel';
import Iconify from '../../../../components/iconify';
import Image from '../../../../components/image';
import TextMaxLine from '../../../../components/text-max-line';

// ----------------------------------------------------------------------

type Props = {
  data: IProduct[];
};

export default function SimilarProduct({ data }: Props) {
  const carouselRef = useRef<Carousel | null>(null);

  const theme = useTheme();

  const carouselSettings = {
    slidesToShow: data?.length > 3 ? 3 : data?.length,
    centerMode: true,
    centerPadding: '60px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <CarouselArrows
        filled
        icon="noto:rightwards-hand"
        onNext={handleNext}
        onPrevious={handlePrev}
      >
        <Carousel ref={carouselRef} {...carouselSettings}>
          {data.map((item) => (
            <Box key={item.Id} sx={{ px: 1 }}>
              <CarouselItem item={item} />
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

function CarouselItem({ item }: { item: IProduct }) {
  const theme = useTheme();

  // const { image, title } = item;

  return (
    <Paper
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        maxWidth: 300,
      }}
    >
      <Image alt={item.Name} src={item.ImageURL} ratio="3/4" sx={{ maxHeight: 100 }} />
      <CardContent
        sx={{
          bottom: 0,
          zIndex: 9,
          width: '100%',
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
          ...bgGradient({
            direction: 'to top',
            startColor: `${theme.palette.grey[900]} 25%`,
            endColor: `${alpha(theme.palette.grey[900], 0)} 100%`,
          }),
        }}
      >
        <TextMaxLine variant="h4" paragraph>
          {item.Name}
        </TextMaxLine>

        <Link
          color="inherit"
          variant="overline"
          href={PATH_DASHBOARD.eCommerce.view(paramCase(item.Id))}
          sx={{
            opacity: 0.72,
            alignItems: 'center',
            display: 'inline-flex',
            transition: theme.transitions.create('opacity'),
            '&:hover': { opacity: 1 },
          }}
        >
          Xem thêm
          <Iconify icon="eva:arrow-forward-fill" width={16} sx={{ ml: 1 }} />
        </Link>
      </CardContent>
    </Paper>
  );
}
