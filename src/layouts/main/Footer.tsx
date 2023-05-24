// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { Box, Grid, Link, Stack, Divider, Container, Typography, IconButton } from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
// _mock
import { _socials } from '../../_mock/arrays';
// components
import Logo from '../../components/logo';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Bách hóa Ngọc Diệp',
    children: [
      { name: 'Về chúng tôi', href: PATH_PAGE.about },
      { name: 'Liên hệ hợp tác', href: PATH_PAGE.contact },
      { name: 'Hổ trợ & giải đáp', href: PATH_PAGE.faqs },
    ],
  },
  {
    headline: 'Dịch vụ khách hàng',
    children: [
      { name: 'Chính sách điều khoản', href: '#' },
      { name: 'Chính sách thanh toán', href: '#' },
      { name: 'Chính sách bảo hành', href: '#' },
      { name: 'Chính sách đổi trả', href: '#' },
      { name: 'Chính sách vận chuyển', href: '#' },
    ],
  },
  {
    headline: 'Liên hệ',
    children: [
      { name: 'Hotline', href: '#' },
      { name: 'Email', href: '#' },
      { name: 'Messenger', href: '#' },
    ],
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const { pathname } = useRouter();

  const isHome = pathname === '/';

  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container>
        <Logo sx={{ mb: 1, mx: 'auto' }} />

        <Typography variant="caption" component="div">
          ©Mọi thứ đều có
          <br /> tại &nbsp;
          <Link href="https://www.facebook.com/profile.php?id=100074081858455">
            Bách hóa Ngọc Diệp
          </Link>
        </Typography>
      </Container>
    </Box>
  );

  const mainFooter = (
    <Box
      // component="footer"
      sx={{
        position: 'relative',
        // bgcolor: 'background.default',

        pt: 10,
        pr: 10,
        pl: 10,
      }}
    >
      <Divider />

      <Grid
        container
        xs={20}
        justifyContent={{
          xs: 'center',
          md: 'space-between',
        }}
        sx={{
          textAlign: {
            xs: 'center',
            md: 'left',
          },
        }}
      >
        <Grid item xs={20} sx={{ mb: 3 }}>
          <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
        </Grid>

        <Grid item xs={8} md={3}>
          <Typography variant="body1" sx={{ pr: { md: 5 } }}>
            Bách hóa Ngọc Diệp chuyên cung cấp sỉ và lẻ sữa bột và hàng tạp hóa, luôn đặt uy tín và
            chất lượng lên hàng đầu
          </Typography>
          <Stack
            spacing={1}
            direction="row"
            sx={{
              mt: 5,

              alignItems: 'center',
              alignContent: 'center',
            }}
          >
            <Typography variant="h6">Số điện thoại:</Typography>
            <Typography variant="body2">0397516328</Typography>
          </Stack>
          <Stack
            spacing={1}
            direction="row"
            sx={{
              mt: 2,

              alignItems: 'center',
              alignContent: 'center',
            }}
          >
            <Typography variant="h6">Gmail:</Typography>
            <Typography variant="body2">trongqui2712@gmail.com</Typography>
          </Stack>
          <Stack
            spacing={1}
            direction="row"
            sx={{
              mt: 2,

              alignItems: 'center',
              alignContent: 'center',
            }}
          >
            <Typography variant="h6">Địa chỉ:</Typography>
            <Typography variant="body2">
              đường 30/4, phường 5, thị xã Cai Lậy, tỉnh Tiền Giang
            </Typography>
          </Stack>

          <Stack
            spacing={1}
            direction="row"
            justifyContent={{ xs: 'center', md: 'flex-start' }}
            sx={{
              mt: 5,
              mb: { xs: 5, md: 0 },
            }}
          >
            {_socials.map((social) => (
              <IconButton key={social.name} href={social.path} target="_blank">
                <Iconify icon={social.icon} />
              </IconButton>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} md={7} sx={{mr: 10}}>
          <Stack spacing={5} justifyContent="space-between" direction={{ xs: 'column', md: 'row' }}>
            {LINKS.map((list) => (
              <Stack
                key={list.headline}
                spacing={2}
                alignItems={{ xs: 'center', md: 'flex-start' }}
              >
                <Typography component="div" variant="overline">
                  {list.headline}
                </Typography>

                {list.children.map((link) => (
                  <Link
                    key={link.name}
                    component={NextLink}
                    href={link.href}
                    color="inherit"
                    variant="body2"
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>

      <Typography
        variant="caption"
        component="div"
        sx={{
          mt: 10,
          pb: 5,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        © 2023. Bách hóa Ngọc Diệp
      </Typography>
    </Box>
  );

  return !isHome ? simpleFooter : mainFooter;
}
