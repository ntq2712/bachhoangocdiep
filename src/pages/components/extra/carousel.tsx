// next
import Head from 'next/head';
// @mui
import { Box, Stack, Card, Container, CardHeader, CardContent } from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// _mock
import _mock from '../../../_mock';
// layouts
import MainLayout from '../../../layouts/main';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import {
  CarouselBasic1,
  CarouselBasic2,
  CarouselBasic3,
  CarouselBasic4,
  CarouselAnimation,
  CarouselThumbnail,
  CarouselCenterMode,
} from '../../../sections/_examples/extra/carousel';
import { useEffect, useState } from 'react';
import { getBanner, getProductsBestSeller } from 'src/api/ortherEcom';
import { IBanner, IProduct } from 'src/@types/product';
import CarouselCenterMode1 from 'src/sections/_examples/extra/carousel/CarouselCenterMode';
import { getLatestProducts } from 'src/redux/slices/product';

// ----------------------------------------------------------------------

const _carouselsExample = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.text.title(index),
  image: _mock.image.cover(index),
  description: _mock.text.description(index),
}));

// ----------------------------------------------------------------------

DemoCarouselsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export type ICarousels = {
  id: string;
  title: string;
  image?: string;
  description: string;
};
// ----------------------------------------------------------------------

export default function DemoCarouselsPage() {
  const [productBestSeller, setProductBestSeller] = useState<ICarousels[]>([]);
  const [latestProducts, setLatestProducts] = useState<ICarousels[]>([]);
  const [newProducts, setNewProducts] = useState<ICarousels[]>([]);
  const [history, setHistory] = useState<ICarousels[]>([]);
  const [event, setEvent] = useState<ICarousels[]>([]);
  const [highlight, setHighlight] = useState<ICarousels[]>([]);

  useEffect(() => {
    const tamproductBestSeller: ICarousels[] = [];
    const tampevent: ICarousels[] = [];
    const tamhighlight: ICarousels[] = [];
    const newProductsTam: ICarousels[] = [];
    const latestProductstam: ICarousels[] = [];
    const historytam: ICarousels[] = [];

    getProductsBestSeller()
      .then((res) => {
        if (res.data.success == true) {
          res.data.Products.Data.map((e: IProduct) => {
            tamproductBestSeller.push({
              id: e.Id,
              title: e.Name,
              image: e.ImageURL,
              description: e.Description,
            });
          });
          setProductBestSeller(tamproductBestSeller);
        }
      })
      .catch((err) => console.log(err));
    getBanner('event').then((res) => {
      if (res.data.success == true) {
        res.data.Banners.Data.map((e: IBanner) => {
          tampevent.push({
            id: e.Id,
            title: e.Title,
            image: e.ImageURL,
            description: e.Description,
          });
        });
        setEvent(tampevent);
      }
    });
    getBanner('highlight').then((res) => {
      if (res.data.success == true) {
        res.data.Banners.Data.map((e: IBanner) => {
          tamhighlight.push({
            id: e.Id,
            title: e.Title,
            image: e.ImageURL,
            description: e.Description,
          });
        });
        setHighlight(tamhighlight);
      }
    });
    getBanner('latestProduct').then((res) => {
      if (res.data.success == true) {
        res.data.Banners.Data.map((e: IBanner) => {
          newProductsTam.push({
            id: e.Id,
            title: e.Title,
            image: e.ImageURL,
            description: e.Description,
          });
        });
        setNewProducts(newProductsTam);
      }
    });
    getBanner('history').then((res) => {
      if (res.data.success == true) {
        res.data.Banners.Data.map((e: IBanner) => {
          historytam.push({
            id: e.Id,
            title: e.Title,
            image: e.ImageURL,
            description: e.Description,
          });
        });
        setHistory(historytam);
      }
    });
    getLatestProducts().then((res) => {
      if (res.data.success == true) {
        res.data.Products.Data.map((e: IProduct) => {
          latestProductstam.push({
            id: e.Id,
            title: e.Name,
            image: e.ImageURL,
            description: e.Description,
          });
        });
        setLatestProducts(latestProductstam);
      }
    });
  }, []);
  return (
    <>
      <Head>
        <title> Extra Components: Carousels | Minimal UI</title>
      </Head>

      <Container sx={{ my: 10 }}>
        <Stack spacing={3} sx={{ mb: 5 }}>
          <Card>
            <CardContent>
              <CarouselThumbnail data={highlight} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Sản phẩm nỗi bật" subheader="Bán chạy nhất & chất lượng nhất" />
            <CardContent>
              <CarouselCenterMode data={productBestSeller} />
            </CardContent>
          </Card>
          <Card>
            {/* <CardHeader title="Carousel Animation" /> */}
            <CardContent>
              <CarouselAnimation data={event} />
            </CardContent>
          </Card>
        </Stack>

        <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
          <Card>
            <CardContent>
              <CarouselBasic3 data={history} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Dòng sản phẩm mới" />
            <CardContent>
              <CarouselBasic2 data={newProducts} />
            </CardContent>
          </Card>
        </Masonry>
        <Stack sx={{ mb: 1, mt: 2 }}>
          <Card>
            <CardHeader title="Sản phẩm mới nhất" subheader="Mới cập nhật & chất lượng" />
            <CardContent>
              <CarouselCenterMode1 data={latestProducts} />
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </>
  );
}
