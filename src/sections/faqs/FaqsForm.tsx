import { m } from 'framer-motion';
// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
//
import { varFade, MotionViewport } from '../../components/animate';

// ----------------------------------------------------------------------

export default function FaqsForm() {
  return (
    <Stack component={MotionViewport} spacing={3}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h4">{`Chưa tìm được sự trợ giúp phù hợp?`}</Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Họ và tên" />
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Địa chỉ Email" />
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Chủ thể" />
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label="Nhập câu hỏi của bạn ở đây." multiline rows={4} />
      </m.div>

      <m.div variants={varFade().inUp}>
        <Button size="large" variant="contained">
          Giử ngay
        </Button>
      </m.div>
    </Stack>
  );
}
