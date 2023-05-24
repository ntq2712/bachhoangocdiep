// routes
import { PATH_DASHBOARD, PATH_DOCS } from '../../../routes/paths';
// config
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" />,
    path: PATH_DASHBOARD.eCommerce.shop,
  },
  {
    title: 'Giỏ hàng',
    icon: <Iconify icon="ic:round-grain" />,
    path: PATH_DASHBOARD.eCommerce.checkout,
  },
  {
    title: 'Documentation',
    icon: <Iconify icon="eva:book-open-fill" />,
    path: PATH_DOCS.root,
  },
];

export default navConfig;
