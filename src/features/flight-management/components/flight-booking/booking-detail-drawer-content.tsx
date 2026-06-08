import { AppDateTimeLabel } from '@/components/app-ui/app-date-time-label';
import { AppTable } from '@/components/app-ui/app-table';
import { useSidebar } from '@/components/ui/sidebar';
import {
  FLIGHT_BOOKING_STATUS_COLOR,
  FLIGHT_BOOKING_STATUS_LABEL,
} from '@/features/flight-management/constants';
import type { TGetFlightBookingDetailResponse } from '@/features/flight-management/types';
import { GENDER_LABEL, PASSENGER_TYPE_LABEL } from '@/lib/constants';
import { formatDisplayCurrency } from '@/lib/helpers/string';
import type { TGender, TPassengerType } from '@/lib/types';
import { Descriptions, Empty, Space, Tag } from 'antd';
import { PlaneLandingIcon, PlaneTakeoffIcon } from 'lucide-react';

type BookingDetailDrawerContentProps = {
  detail?: TGetFlightBookingDetailResponse;
};

export const BookingDetailDrawerContent = ({
  detail,
}: BookingDetailDrawerContentProps) => {
  const { isMobile } = useSidebar();

  return (
    <>
      {detail ? (
        <Space orientation="vertical" size="large" className="w-full">
          <div>
            <p className="mb-2 text-base">Thông tin chung</p>
            <Descriptions
              bordered
              className="rounded-lg shadow-xs"
              column={isMobile ? 1 : 2}
            >
              <Descriptions.Item label="Mã đặt chỗ">
                <span className="font-semibold">{detail.bookingCode}</span>
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
                <AppDateTimeLabel
                  value={detail.createdAt}
                  feedback={<span className="text-gray-400">Không rõ</span>}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Hạn thanh toán">
                <AppDateTimeLabel
                  value={detail.lastTicketDate}
                  feedback={<span className="text-gray-400">Không rõ</span>}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Số lượng">
                <div className="flex flex-col gap-2">
                  <span>Người lớn: {detail.adult}</span>
                  <span>Trẻ em: {detail.children}</span>
                  <span>Em bé: {detail.infant}</span>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Tổng giá">
                <span className="text-lg font-semibold">
                  {formatDisplayCurrency(detail.totalPrice)}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </div>

          <div>
            <p className="mb-2 text-base">Thông tin liên hệ</p>
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
            <p className="mb-2 text-base">Danh sách hành khách</p>
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
                      <span className="font-semibold">{passenger.type}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] tracking-wider text-gray-400 uppercase">
                            Giới tính
                          </span>
                          <span className="font-medium text-gray-700">
                            {GENDER_LABEL[passenger.gender]}
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
                className="border-none"
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
                    render: (value: TPassengerType) =>
                      PASSENGER_TYPE_LABEL[value],
                    width: 100,
                  },
                  {
                    title: 'Giới tính',
                    dataIndex: 'gender',
                    width: 100,
                    render: (value: TGender) => GENDER_LABEL[value],
                  },
                  {
                    title: 'Ngày sinh',
                    dataIndex: 'birthday',
                    width: 120,
                    render: value =>
                      value ? (
                        <AppDateTimeLabel value={value} showTime={false} />
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
    </>
  );
};
