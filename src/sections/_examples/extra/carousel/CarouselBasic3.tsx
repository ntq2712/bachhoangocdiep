import { useRef } from 'react';
// @mui
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import { ICarousels } from 'src/pages/components/extra/carousel';
import Carousel, { CarouselArrows, CarouselDots } from '../../../../components/carousel';
import Image from '../../../../components/image';

// ----------------------------------------------------------------------

type Props = {
  data: ICarousels[];
};

export default function CarouselBasic3({ data }: Props) {
  const theme = useTheme();

  const carouselRef = useRef<Carousel | null>(null);

  const carouselSettings = {
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      rounded: true,
      sx: { mt: 3 },
    }),
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
        position: 'relative',
        '& .slick-list': {
          borderRadius: 2,
          boxShadow: theme.customShadows.z16,
        },
      }}
    >
      <CarouselArrows filled shape="rounded" onNext={handleNext} onPrevious={handlePrev}>
        <Carousel ref={carouselRef} {...carouselSettings}>
          {data.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  title: string;
  description: string;
  image: string;
};

function CarouselItem({ item }: { item: ICarousels }) {
  const { image, title } = item;

  return <Image alt={title} src={image} ratio="1/1" />;
}
