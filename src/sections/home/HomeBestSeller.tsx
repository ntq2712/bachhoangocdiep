import React, { useEffect } from 'react';
import { getProducts } from 'src/redux/slices/product';
import { useDispatch, useSelector } from 'src/redux/store';
import BestSellerList from './comps/BestSellerList';
import { Container } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { PATH_DASHBOARD } from 'src/routes/paths';

function HomeBestSeller() {
  const { products, checkout, filter } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <Container sx={{alignItems: 'center'}}>
      <Typography variant="h3" sx={{alignSelf: 'center'}}>
        BEST SELLER
      </Typography>
      <BestSellerList products={products} loading={!products.length && false} />
      <Button href={PATH_DASHBOARD.eCommerce.shop} variant="outlined">Xem tất cả</Button>
    </Container>
  );
}

export default HomeBestSeller;
