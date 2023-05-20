import { Container, Grid, Stack } from '@mui/material';
import React from 'react';
import Image from 'src/components/image/Image';

function HomeSale() {
  return (
    <Container sx={{ mt: 5 }}>
      <Stack spacing={2}>
        <Grid container>
          <img
            style={{ borderTopLeftRadius: 80, borderBottomRightRadius: 80 }}
            src={
              'https://pubcdn.ivymoda.com/files/news/2023/05/05/60cca3bdb05948a67057af4f78c8e002.png'
            }
            alt={'quis'}
            loading="lazy"
          />
        </Grid>
        <Grid container xs={12} spacing={2}>
          <Grid item xs={6}>
            <img
              style={{ borderTopLeftRadius: 80, borderBottomRightRadius: 80, marginLeft: -10 }}
              src={
                'https://pubcdn.ivymoda.com/files/news/2023/05/05/7dd53377694c998d20699e60a330ad09.png'
              }
              alt={'quis1'}
              loading="lazy"
            />
          </Grid>
          <Grid item xs={6}>
            <img
              style={{ borderTopLeftRadius: 80, borderBottomRightRadius: 80 }}
              src={
                'https://pubcdn.ivymoda.com/files/news/2023/05/05/e51686310e4a390c4ef633e4f8dd9233.png'
              }
              alt={'quis2'}
              loading="lazy"
            />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

export default HomeSale;
