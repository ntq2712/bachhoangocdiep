import { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Box, Container, Tab, Tabs } from '@mui/material';
// sections
import { useAuthContext } from 'src/auth/useAuthContext';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
import { _userAbout, _userInvoices, _userPayment } from '../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Iconify from '../../../components/iconify';
import { useSettingsContext } from '../../../components/settings';

import {
  AccountBilling,
  AccountChangePassword,
  AccountGeneral,
  AccountNotifications,
  AccountSocialLinks,
} from '../../../sections/@dashboard/user/account';

// ----------------------------------------------------------------------

UserAccountPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserAccountPage() {
  const { themeStretch } = useSettingsContext();

  const { user } = useAuthContext();

  const [currentTab, setCurrentTab] = useState('general');

  const TABS = [
    {
      value: 'general',
      label: 'Thông tin',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <AccountGeneral user={user?.general}/>,
    },
    {
      value: 'billing',
      label: 'Địa chỉ nhận hàng',
      icon: <Iconify icon="ic:round-receipt" />,
      component: (
        <AccountBilling
          cards={_userPayment}
          addressBook={[user?.address]}
          invoices={_userInvoices}
        />
      ),
    },
    {
      value: 'notifications',
      label: 'Thông báo',
      icon: <Iconify icon="eva:bell-fill" />,
      component: <AccountNotifications />,
    },
    {
      value: 'social_links',
      label: 'Liên kết',
      icon: <Iconify icon="eva:share-fill" />,
      component: <AccountSocialLinks socialLinks={_userAbout.socialLinks} />,
    },
    {
      value: 'change_password',
      label: 'Đổi mật khẩu',
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <>
      <Head>
        <title> User: Account Settings | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            { name: 'Người dùng', href: PATH_DASHBOARD.user.root },
            { name: 'Cài đặt tài khoảng' },
          ]}
        />

        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value} sx={{ mt: 5 }}>
                {tab.component}
              </Box>
            )
        )}
      </Container>
    </>
  );
}
