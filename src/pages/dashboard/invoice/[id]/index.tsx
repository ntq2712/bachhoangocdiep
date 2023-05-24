// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _invoices } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import InvoiceDetails from '../../../../sections/@dashboard/invoice/details';
import { useEffect, useState } from 'react';
import { IInvoice, IInvoiceDetaill } from 'src/@types/invoice';
import { getOderById } from 'src/api/ortherEcom';

// ----------------------------------------------------------------------

InvoiceDetailsPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function InvoiceDetailsPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { id },
  } = useRouter();

  const [currentInvoice, setCurrentInvoice] = useState<IInvoiceDetaill>()

  useEffect(()=>{
    getOderById(id).then((res)=>{
      if(res?.data?.success == true){
        setCurrentInvoice(res.data)
      }
    })
  },[id])

  return (
    <>
      <Head>
        <title> Invoice: View | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          // heading="Invoice Details"
          links={[
            { name: 'Trang chủ', href: '/' },
            {
              name: 'Đơn hàng',
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: currentInvoice?.order.InvoiceNumber },
          ]}
        />

        {currentInvoice &&
          <InvoiceDetails invoice={currentInvoice} />
        }
      </Container>
    </>
  );
}
