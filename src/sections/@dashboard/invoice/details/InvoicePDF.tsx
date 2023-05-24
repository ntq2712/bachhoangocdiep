/* eslint-disable jsx-a11y/alt-text */
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
import { fDate } from '../../../../utils/formatTime';
// @types
import { IInvoiceDetaill } from '../../../../@types/invoice';
//
import styles from './InvoiceStyle';

// ----------------------------------------------------------------------

type Props = {
  invoice: IInvoiceDetaill;
};

export default function InvoicePDF({ invoice }: Props) {
  const { order, carts } = invoice;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image source="/logo/Group_5.jpg" style={{ height: 32 }} />
          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text style={styles.h3}>{order?.Status}</Text>
            <Text> {order.InvoiceNumber} </Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Từ</Text>
            <Text style={styles.body1}>Bách hóa Ngọc Diệp</Text>
            <Text style={styles.body1}>30/04 phường 5, Thị xã Cai Lậy, tỉnh Tiền Giang</Text>
            <Text style={styles.body1}>Số điện thoại: 0397516328</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>đến</Text>
            <Text style={styles.body1}>{invoice.order.ReceiverName}</Text>
            <Text style={styles.body1}>{invoice.order.FullAddress}</Text>
            <Text style={styles.body1}>{invoice.order.ReceiverPhoneNumber}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Ngày đặt hàng</Text>
            <Text style={styles.body1}>{fDate(order?.createdAt)}</Text>
          </View>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Ngày hoàn thành</Text>
            <Text style={styles.body1}>
              {order?.DeliveryDate ? order?.DeliveryDate : 'Chưa hoàn thành'}
            </Text>
          </View>
        </View>

        <Text style={[styles.overline, styles.mb8]}>Chi tiết đơn hàng</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Sản phẩm</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Số lượng</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Đơn giá</Text>
              </View>

              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>Tổng tiền</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            {carts.map((item: any, index: number) => (
              <View style={styles.tableRow} key={item.Id}>
                <View style={styles.tableCell_1}>
                  <Text>{index + 1}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>{item.ProductName}</Text>
                  {/* <Text>{item.description}</Text> */}
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{item.BuyingQuantity}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{item.ProductPrice}</Text>
                </View>

                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{fCurrency(item.price * item.Amount)}</Text>
                </View>
              </View>
            ))}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Thanh toán</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text> {order.PaidType === 'transfer' ? 'Chuyển khoản' : 'Tiền mặt'}</Text>
              </View>
            </View>

            {/* <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Discount</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{fCurrency(-discount)}</Text>
              </View>
            </View> */}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>VAT</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{order.VAT}%</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h4}>Thành tiền</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h4}>{fCurrency(order.SubAmount)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.footer]}>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>CHÚ Ý</Text>
            <Text>
              Chúng tôi luôn sẳn sàn phục vụ quý khách, mọi thắc mắt hảy gửi về họp thư hổ trợ !
            </Text>
          </View>
          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>Hổ trợ?</Text>
            <Text>trongqui2712@gmail.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
