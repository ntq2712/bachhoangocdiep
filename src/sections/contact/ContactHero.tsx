import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Container, Typography, Grid } from '@mui/material';
//
import { TextAnimate, MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const CONTACTS = [
  {
    country: 'Tiền Giang',
    address: '30/04 phường 5, thị xã Cai Lậy, tỉnh Tiền Giang',
    phoneNumber: '0364466591',
  },
  {
    country: 'Bến Tre',
    address: '349 ấp 7, xã Hưng Lế, Huyện Giồng Trôm, tỉnh Bến Tre',
    phoneNumber: '0397516328',
  },
  {
    country: 'TP.HCM',
    address: 'A75/6/7 Bạch Đằng, phường 2, quận Tân Bình, TP.HCM',
    phoneNumber: '0397516329',
  },
  {
    country: 'Tiền Giang',
    address: '30/04 phường 5, thị xã Cai Lậy, tỉnh Tiền Giang',
    phoneNumber: '0975446292',
  },
];

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(/assets/background/overlay_1.svg), url(/assets/images/contact/hero.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    bottom: 80,
    textAlign: 'left',
    position: 'absolute',
  },
}));

// ----------------------------------------------------------------------

export default function ContactHero() {
  return (
    <StyledRoot>
      <Container component={MotionContainer}>
        <StyledContent>
          <TextAnimate text="Where" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
          <br />

          <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
            <TextAnimate text="to" />
            <TextAnimate text="find" />
            <TextAnimate text="us?" />
          </Stack>

          <Grid container spacing={5} sx={{ mt: 5, color: 'common.white' }}>
            {CONTACTS.map((contact) => (
              <Grid
                key={contact.phoneNumber}
                item
                xs={12}
                sm={6}
                md={3}
                lg={2}
                sx={{
                  pr: {
                    md: 5,
                  },
                }}
              >
                <m.div variants={varFade().in}>
                  <Typography variant="h6" paragraph>
                    {contact.country}
                  </Typography>
                </m.div>

                <m.div variants={varFade().inRight}>
                  <Typography variant="body2">
                    {contact.address}
                    <br /> {contact.phoneNumber}
                  </Typography>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
