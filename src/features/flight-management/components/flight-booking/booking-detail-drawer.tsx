import { AppDateTimeLabel } from '@/components/app-date-time-label';
import { AppTable } from '@/components/app-table';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useSidebar } from '@/components/ui/sidebar';
import { BookingDetailActionGroups } from '@/features/flight-management/components/flight-booking/booking-detail-action-groups';
import {
  FLIGHT_BOOKING_STATUS_COLOR,
  FLIGHT_BOOKING_STATUS_LABEL,
} from '@/features/flight-management/constants';
import { useGetFlightBookingDetailQuery } from '@/features/flight-management/query';
import { formatDisplayCurrency } from '@/lib/helpers/string';
import { Descriptions, Empty, Skeleton, Space, Tag } from 'antd';
import { PlaneLandingIcon, PlaneTakeoffIcon, XIcon } from 'lucide-react';

type BookingDetailDrawerProps = {
  bookingId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const BookingDetailDrawer = ({
  bookingId,
  open,
  onOpenChange,
}: BookingDetailDrawerProps) => {
  const { isMobile } = useSidebar();

  const { data, isFetching } = useGetFlightBookingDetailQuery(bookingId || '', {
    skip: !bookingId || !open,
  });

  const detail = data?.data;

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-200! max-md:w-full!">
        <DrawerHeader className="flex flex-row items-center justify-start! gap-2">
          <DrawerClose asChild>
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              <XIcon className="size-4" />
            </Button>
          </DrawerClose>
          <DrawerTitle className="mr-auto">Thông tin đơn hàng</DrawerTitle>

          <BookingDetailActionGroups bookingId={bookingId || ''} />
        </DrawerHeader>
        <div className="overflow-y-auto p-4">
          <Skeleton loading={isFetching} active>
            {detail ? (
              <Space orientation="vertical" size="large" className="w-full">
                <div>
                  <p className="mb-2 text-base font-semibold text-gray-800">
                    Thông tin chung
                  </p>
                  <Descriptions
                    bordered
                    className="rounded-lg shadow-xs"
                    column={isMobile ? 1 : 2}
                  >
                    <Descriptions.Item label="Mã đặt chỗ">
                      <span className="text-brand font-semibold">
                        {detail.bookingCode}
                      </span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                      <Tag
                        color={FLIGHT_BOOKING_STATUS_COLOR[detail.status]}
                        variant="outlined"
                      >
                        {FLIGHT_BOOKING_STATUS_LABEL[detail.status]}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Chuyến bay">
                      <div className="space-y-0.5">
                        <div>{detail.airlineName}</div>
                        <div className="flex items-center gap-2 font-medium">
                          <span>{detail.startPoint}</span>
                          <span>→</span>
                          <span>{detail.endPoint}</span>
                        </div>
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian bay">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <PlaneTakeoffIcon className="size-3.5 shrink-0 text-gray-400" />
                          <AppDateTimeLabel value={detail.startDate} />
                        </div>
                        <div className="flex items-center gap-2">
                          <PlaneLandingIcon className="size-3.5 shrink-0 text-gray-400" />
                          <AppDateTimeLabel value={detail.endDate} />
                        </div>
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Kênh bán" span={isMobile ? 1 : 2}>
                      {detail?.merchantName ? (
                        detail.merchantName
                      ) : (
                        <span className="text-gray-400">Không rõ</span>
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày đặt">
                      <AppDateTimeLabel value={detail.createdAt} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Hạn thanh toán">
                      <AppDateTimeLabel value={detail.lastTicketDate} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Số lượng">
                      <div className="flex flex-col gap-4">
                        <span>Người lớn: {detail.adult}</span>
                        <span>Trẻ em: {detail.children}</span>
                        <span>Em bé: {detail.infant}</span>
                      </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="Tổng giá">
                      <span className="text-brand text-lg font-semibold">
                        {formatDisplayCurrency(detail.totalPrice)}
                      </span>
                    </Descriptions.Item>
                  </Descriptions>
                </div>

                <div>
                  <p className="mb-2 text-base font-semibold text-gray-800">
                    Thông tin liên hệ
                  </p>
                  <Descriptions
                    bordered
                    className="rounded-lg shadow-xs"
                    column={isMobile ? 1 : 2}
                  >
                    <Descriptions.Item label="Họ tên" span={isMobile ? 1 : 2}>
                      {detail.contactName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">
                      {detail.contactPhone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email" span={2}>
                      {detail.contactEmail}
                    </Descriptions.Item>
                  </Descriptions>
                </div>

                <div>
                  <p className="mb-2 text-base font-semibold text-gray-800">
                    Danh sách hành khách
                  </p>
                  {isMobile ? (
                    <div className="space-y-4">
                      {detail.passengers.map((passenger, index) => (
                        <div
                          key={passenger.id}
                          className="rounded-lg border p-4 shadow-xs"
                        >
                          <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-400">
                                #{index + 1}
                              </span>
                              <span className="font-semibold text-gray-800 uppercase">
                                {passenger.lastName} {passenger.firstName}
                              </span>
                            </div>
                            <span className="font-semibold">
                              {passenger.type}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] tracking-wider text-gray-400 uppercase">
                                  Giới tính
                                </span>
                                <span className="font-medium text-gray-700">
                                  {passenger.gender === 0 ? 'Nữ' : 'Nam'}
                                </span>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] tracking-wider text-gray-400 uppercase">
                                  Ngày sinh
                                </span>
                                <span className="font-medium text-gray-700">
                                  {passenger.birthday ? (
                                    <AppDateTimeLabel
                                      value={passenger.birthday}
                                      showTime={false}
                                    />
                                  ) : (
                                    '-'
                                  )}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-2 text-right">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] tracking-wider text-gray-400 uppercase">
                                  Số định danh
                                </span>
                                <span className="font-medium text-gray-700">
                                  {passenger.documentNumber}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <AppTable
                      dataSource={detail.passengers}
                      pagination={false}
                      rowKey={record => record.id}
                      size="small"
                      bordered
                      columns={[
                        {
                          title: 'STT',
                          width: 60,
                          align: 'center',
                          render: (_, __, index) => index + 1,
                        },
                        {
                          title: 'Họ tên',
                          key: 'name',
                          render: (_, record) => (
                            <span className="font-semibold uppercase">
                              {record.lastName} {record.firstName}
                            </span>
                          ),
                        },
                        {
                          title: 'Loại',
                          dataIndex: 'type',
                          width: 100,
                        },
                        {
                          title: 'Giới tính',
                          dataIndex: 'gender',
                          width: 100,
                          render: value => (value === 0 ? 'Nữ' : 'Nam'),
                        },
                        {
                          title: 'Ngày sinh',
                          dataIndex: 'birthday',
                          width: 120,
                          render: value =>
                            value ? (
                              <AppDateTimeLabel
                                value={value}
                                showTime={false}
                              />
                            ) : (
                              '-'
                            ),
                        },
                        {
                          title: 'Số định danh',
                          dataIndex: 'documentNumber',
                          width: 150,
                        },
                      ]}
                    />
                  )}
                </div>
              </Space>
            ) : (
              <Empty description="Không có dữ liệu" />
            )}
          </Skeleton>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
