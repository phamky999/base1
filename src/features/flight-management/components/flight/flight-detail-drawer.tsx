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
import { FlightDetailActionGroups } from '@/features/flight-management/components/flight/flight-detail-action-groups';
import {
  FARE_RULE_TYPE_LABEL,
  FLIGHT_STATUS_COLOR,
  FLIGHT_STATUS_LABEL,
} from '@/features/flight-management/constants';
import { useGetFlightDetailQuery } from '@/features/flight-management/query';
import { formatDisplayCurrency } from '@/lib/helpers/string';
import { Descriptions, Empty, Skeleton, Space, Tag } from 'antd';
import { PlaneLandingIcon, PlaneTakeoffIcon, XIcon } from 'lucide-react';

type FlightDetailDrawerProps = {
  flightId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const FlightDetailDrawer = ({
  flightId,
  open,
  onOpenChange,
}: FlightDetailDrawerProps) => {
  const { isMobile } = useSidebar();

  const { data, isFetching } = useGetFlightDetailQuery(flightId || '', {
    skip: !flightId || !open,
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

          <FlightDetailActionGroups flightId={flightId || ''} />
        </DrawerHeader>
        <div className="overflow-y-auto p-4">
          <Skeleton loading={isFetching} active>
            {detail ? (
              <Space orientation="vertical" size="large" className="w-full">
                <div>
                  <p className="mb-2 text-base">Thông tin chung</p>
                  <Descriptions
                    bordered
                    className="rounded-lg shadow-xs"
                    column={isMobile ? 1 : 2}
                  >
                    <Descriptions.Item
                      label="Mã đặt chỗ"
                      span={isMobile ? 1 : 2}
                    >
                      <span className="font-bold">{detail.bookingCode}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Hãng hàng không">
                      {detail.airlineName} ({detail.airlineCode})
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                      <Tag
                        color={FLIGHT_STATUS_COLOR[detail.status]}
                        variant="solid"
                      >
                        {FLIGHT_STATUS_LABEL[detail.status]}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Tổng số ghế">
                      {detail.seatTotal}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số ghế trống">
                      {detail.seatAvailable}
                    </Descriptions.Item>
                    <Descriptions.Item label="Thời gian giữ chỗ">
                      {detail.timeLimit} phút
                    </Descriptions.Item>
                    <Descriptions.Item label="Đóng bán trước">
                      {detail.closingDaysBeforeDeparture} ngày
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                <div>
                  <p className="mb-2 text-base">Cấu hình giá</p>
                  <Descriptions
                    bordered
                    className="rounded-lg shadow-xs"
                    column={isMobile ? 1 : 3}
                  >
                    <Descriptions.Item label="Người lớn">
                      {formatDisplayCurrency(detail.priceAdult)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trẻ em">
                      {formatDisplayCurrency(detail.priceChild)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Em bé">
                      {formatDisplayCurrency(detail.priceInfant)}
                    </Descriptions.Item>
                  </Descriptions>
                </div>

                <div>
                  <p className="mb-2 text-base">Hành trình chi tiết</p>
                  {isMobile ? (
                    <div className="space-y-4">
                      {detail.segments.map((segment, index) => (
                        <div
                          key={`${segment.flightNumber}-${index}`}
                          className="rounded-lg border p-4 shadow-xs"
                        >
                          <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-brand font-bold">
                                {segment.startPoint}
                              </span>
                              <span className="text-gray-400">→</span>
                              <span className="text-brand font-bold">
                                {segment.endPoint}
                              </span>
                            </div>
                            <span className="font-bold">
                              {segment.flightNumber}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] tracking-wider text-gray-400 uppercase">
                                  Khởi hành
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <PlaneTakeoffIcon
                                    size={14}
                                    className="text-gray-400"
                                  />
                                  <AppDateTimeLabel value={segment.startDate} />
                                </div>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] tracking-wider text-gray-400 uppercase">
                                  Hạ cánh
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <PlaneLandingIcon
                                    size={14}
                                    className="text-gray-400"
                                  />
                                  <AppDateTimeLabel value={segment.endDate} />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2 text-right">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] tracking-wider text-gray-400 uppercase">
                                  Máy bay / Hạng
                                </span>
                                <span className="font-medium text-gray-700">
                                  {segment.plane} / {segment.seatClass}
                                </span>
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] tracking-wider text-gray-400 uppercase">
                                  Thời gian bay
                                </span>
                                <span className="font-medium text-gray-700">
                                  {segment.duration} phút
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <AppTable
                      dataSource={detail.segments}
                      pagination={false}
                      rowKey={record => record.flightNumber + record.startDate}
                      size="small"
                      bordered
                      columns={[
                        {
                          title: 'Chặng bay',
                          width: 120,
                          render: (_, record) => (
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">
                                {record.startPoint}
                              </span>
                              <span>→</span>
                              <span className="font-semibold">
                                {record.endPoint}
                              </span>
                            </div>
                          ),
                        },
                        {
                          title: 'Thời gian',
                          width: 180,
                          render: (_, record) => (
                            <div>
                              <div className="flex items-center gap-1">
                                <PlaneTakeoffIcon
                                  size={12}
                                  className="text-gray-400"
                                />
                                <AppDateTimeLabel value={record?.startDate} />
                              </div>
                              <div className="flex items-center gap-1">
                                <PlaneLandingIcon
                                  size={12}
                                  className="text-gray-400"
                                />
                                <AppDateTimeLabel value={record?.endDate} />
                              </div>
                            </div>
                          ),
                        },
                        {
                          title: 'Số hiệu',
                          width: 100,
                          dataIndex: 'flightNumber',
                        },
                        {
                          title: 'Máy bay',
                          width: 100,
                          dataIndex: 'plane',
                        },
                        {
                          title: 'Hạng ghế',
                          width: 100,
                          dataIndex: 'seatClass',
                        },
                        {
                          title: 'Thời gian bay',
                          width: 100,
                          dataIndex: 'duration',
                          render: value => `${value} phút`,
                        },
                      ]}
                    />
                  )}
                </div>

                {!!detail?.fareRules?.length && (
                  <div>
                    <p className="mb-2 text-base">Bộ điều kiện</p>
                    <Descriptions
                      bordered
                      column={1}
                      className="rounded-lg shadow-xs"
                    >
                      {detail?.fareRules.map((rule, index) => (
                        <Descriptions.Item
                          key={index}
                          label={FARE_RULE_TYPE_LABEL[rule.type]}
                        >
                          {rule.text}
                        </Descriptions.Item>
                      ))}
                    </Descriptions>
                  </div>
                )}
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
