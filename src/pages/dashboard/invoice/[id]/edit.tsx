// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { IInvoiceDetaill } from 'src/@types/invoice';
import { getOderById } from 'src/api/ortherEcom';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// _mock_
// components
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
// sections

import InvoiceNewEditForm from '../../../../sections/@dashboard/invoice/form';

// ----------------------------------------------------------------------

InvoiceEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function InvoiceEditPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { id },
  } = useRouter();

  const [currentInvoice, setCurrentInvoice] = useState<IInvoiceDetaill>()

  useEffect(()=>{
    getOderById(id).then((res)=>{
      if(res?.data?.success === true){
        setCurrentInvoice(res.data)
      }
    })
  },[id])
  return (
    <>
      <Head>
        <title> Invoice: Edit | Bách hóa Ngọc Diệp</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit invoice"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Invoices',
              href: PATH_DASHBOARD.invoice.list,
            },
            { name: `INV-${currentInvoice?.order.InvoiceNumber}` },
          ]}
        />

       <InvoiceNewEditForm isEdit currentInvoice={currentInvoice} />
      </Container>
    </>
  );
}
