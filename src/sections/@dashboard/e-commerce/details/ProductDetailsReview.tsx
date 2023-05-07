import { useCallback, useEffect, useState } from 'react';
import sumBy from 'lodash/sumBy';
// @mui
import { Divider, Typography, Rating, Button, LinearProgress, Stack, Box } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';
// @types
import { IProduct, IReview } from '../../../../@types/product';
// components
import Iconify from '../../../../components/iconify';
//
import ProductDetailsReviewList from './ProductDetailsReviewList';
import ProductDetailsReviewNewDialog from './ProductDetailsNewReviewForm';
import { getReviwByProduct } from 'src/api/ortherEcom';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

type rating = {
  name: string;
  starCount: string | number;
  reviewCount: string | number;
};

type Props = {
  reviews: IReview[];
};

export default function ProductDetailsReview({ reviews }: Props) {
  // const { totalRating, totalReview, ratings } = product;

  const [openReview, setOpenReview] = useState(false);

  const handleOpenReview = () => {
    setOpenReview(true);
  };

  const handleCloseReview = () => {
    setOpenReview(false);
  };

  const calculate = (): number => {
    let totalRating: number = 0;
    reviews?.map((e) => {
      totalRating = totalRating + Number(e.Rate);
    });
    return Math.round((totalRating / reviews.length) * 10) / 10;
  };
  // const total = sumBy(ratings, (star) => star.starCount);
  // const calculateRatings = useCallback(() => {
  //   let onestart: rating = {
  //     name: '0 Star',
  //     starCount: 0,
  //     reviewCount: 0,
  //   };
  //   let twostart: rating = {
  //     name: '0 Star',
  //     starCount: 0,
  //     reviewCount: 0,
  //   };
  //   let threestart: rating = {
  //     name: '0 Star',
  //     starCount: 0,
  //     reviewCount: 0,
  //   };
  //   let fourstart: rating = {
  //     name: '0 Star',
  //     starCount: 0,
  //     reviewCount: 0,
  //   };
  //   let fivestart: rating = {
  //     name: '0 Star',
  //     starCount: 0,
  //     reviewCount: 0,
  //   };
  //   reviews?.map((e) => {
  //     switch (Math.round(Number(e.Rate))) {
  //       case 1:
  //         onestart.starCount = Number(onestart.starCount) + Number(e.Rate);
  //         onestart.starCount = Number(onestart.starCount) + 1;
  //       case 2:
  //         twostart.starCount = Number(twostart.starCount) + Number(e.Rate);
  //         twostart.starCount = Number(twostart.starCount) + 1;

  //     }
  //   });
  // }, []);

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{
          paddingTop: 2,
          paddingBottom: 2
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{
            pt: { xs: 5, md: 0 },
            pb: { xs: 3, md: 0 },
          }}
        >
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          Xếp hạng trung bình
          </Typography>

          <Typography variant="h2">{calculate()}/5</Typography>

          <Rating readOnly value={calculate()} precision={0.1} />

          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            ({fShortenNumber(reviews.length)} đánh giá)
          </Typography>
        </Stack>

        <Stack
          spacing={1.5}
          sx={{
            p: 3,
            py: { md: 5 },
            borderLeft: (theme) => ({ md: `dashed 1px ${theme.palette.divider}` }),
            borderRight: (theme) => ({ md: `dashed 1px ${theme.palette.divider}` }),
          }}
        >
          {/* {ratings
            .slice(0)
            .reverse()
            .map((rating) => (
              <ProgressItem key={rating.name} star={rating} total={total} />
            ))} */}
        </Stack>

        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            pt: { xs: 3, md: 0 },
            pb: { xs: 5, md: 0 },
          }}
        >
          <Button
            color="inherit"
            size="large"
            onClick={handleOpenReview}
            variant="outlined"
            startIcon={<Iconify icon="eva:edit-fill" />}
          >
            Viết đánh giá
          </Button>
        </Stack>
      </Box>

      <Divider />

      <ProductDetailsReviewList reviews={reviews} />

      <ProductDetailsReviewNewDialog open={openReview} onClose={handleCloseReview} />
    </>
  );
}

// ----------------------------------------------------------------------

type ProgressItemProps = {
  star: {
    name: string;
    starCount: number;
    reviewCount: number;
  };
  total: number;
};

function ProgressItem({ star, total }: ProgressItemProps) {
  const { name, starCount, reviewCount } = star;

  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="subtitle2" sx={{ width: 42 }}>
        {name}
      </Typography>

      <LinearProgress
        color="inherit"
        variant="determinate"
        value={(starCount / total) * 100}
        sx={{
          mx: 2,
          flexGrow: 1,
        }}
      />

      <Typography
        variant="body2"
        sx={{
          minWidth: 48,
          color: 'text.secondary',
        }}
      >
        {fShortenNumber(reviewCount)}
      </Typography>
    </Stack>
  );
}
