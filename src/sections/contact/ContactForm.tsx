import { m } from 'framer-motion';
// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function ContactForm() {
  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3">
        Cứ liên lạc nếu cần. <br />
          Chúng tôi sẻ rất vui khi được nghe từ bạn, anh bạn.
        </Typography>
      </m.div>

      <Stack spacing={3}>
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
          <TextField fullWidth label="Viết câu hỏi của bạn ở đây." multiline rows={4} />
        </m.div>
      </Stack>

      <m.div variants={varFade().inUp}>
        <Button size="large" variant="contained">
          Gửi ngay
        </Button>
      </m.div>
    </Stack>
  );
}
