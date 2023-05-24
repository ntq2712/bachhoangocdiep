import { m } from 'framer-motion';
import { useRef, useState } from 'react';
// @mui
import { Box, Button, Card, CardContent, Paper, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ICarousels } from 'src/pages/components/extra/carousel';
// utils
import { bgGradient } from '../../../../utils/cssStyles';
// components

import { MotionContainer, varFade } from '../../../../components/animate';
import Carousel, { CarouselArrowIndex } from '../../../../components/carousel';
import Image from '../../../../components/image';

// ----------------------------------------------------------------------

type Props = {
  // data: {
  //   id: string;
  //   title: string;
  //   image: string;
  //   description: string;
  // }[];
  data: ICarousels[];
};

export default function CarouselAnimation({ data }: Props) {
  const theme = useTheme();

  const carouselRef = useRef<Carousel | null>(null);

  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? data.length - 1 : 0);

  const carouselSettings = {
    speed: 800,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {data.map((item, index) => (
          <CarouselItem key={item.id} item={item} isActive={index === currentIndex} />
        ))}
      </Carousel>

      <CarouselArrowIndex
        index={currentIndex}
        total={data.length}
        onNext={handleNext}
        onPrevious={handlePrev}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: ICarousels;
  // item: {
  //   title: string;
  //   description: string;
  //   image: string;
  // };
  isActive: boolean;
};

function CarouselItem({ item, isActive }: CarouselItemProps) {
  const theme = useTheme();

  const { image, title } = item;

  return (
    <Paper sx={{ position: 'relative' }}>
      <Image alt={title} src={image} ratio="16/9" />

      <Box
        sx={{
          top: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          ...bgGradient({
            direction: 'to top',
            startColor: `${theme.palette.grey[900]} 0%`,
            endColor: `${alpha(theme.palette.grey[900], 0)} 100%`,
          }),
        }}
      />

      <CardContent
        component={MotionContainer}
        animate={isActive}
        action
        sx={{
          bottom: 0,
          width: 1,
          maxWidth: 720,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <m.div variants={varFade().inRight}>
          <Typography variant="h3" gutterBottom>
            {item.title}
          </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Typography variant="body2" noWrap gutterBottom>
            {item.description}
          </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Button variant="contained" sx={{ mt: 3 }}>
            <a target="_blank" href="https://www.facebook.com/trongqui2712">
              Xem thêm
            </a>
          </Button>
        </m.div>
      </CardContent>
    </Paper>
  );
}
