// next
import Head from 'next/head';
// @mui
import { Link, Typography } from '@mui/material';
// layouts
import CompactLayout from '../../layouts/compact';
// routes
// components
// sections
import AuthVerifyCodeForm from '../../sections/auth/AuthVerifyCodeForm';
// assets
import { EmailInboxIcon } from '../../assets/icons';

// ----------------------------------------------------------------------

VerifyCodePage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function VerifyCodePage() {
  return (
    <>
      <Head>
        <title> Verify Code | Bách hóa Ngọc Diệp</title>
      </Head>

      <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Vui lòng kiểm tra email hoặc điện thoại của bạn!
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Chúng tôi đã gửi email mã xác nhận gồm 6 chữ số, vui lòng nhập mã vào bên dưới hộp để xác
        minh email của bạn.
      </Typography>

      <AuthVerifyCodeForm />

      <Typography variant="body2" sx={{ my: 3 }}>
        Bạn không có mã? &nbsp;
        <Link variant="subtitle2">Gửi lại</Link>
      </Typography>

    </>
  );
}
