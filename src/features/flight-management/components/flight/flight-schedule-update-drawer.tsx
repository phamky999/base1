import { AppCard } from '@/components/app-ui/app-card';
import { AppDrawer } from '@/components/app-ui/app-drawer';
import { AppInputNumber } from '@/components/app-ui/app-input-number';
import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import { FLIGHT_ITINERARY_TYPE } from '@/features/flight-management/constants';
import {
  useGetFlightDetailQuery,
  useScheduleUpdateMutation,
} from '@/features/flight-management/query';
import type {
  TFlightScheduleUpdatePayload,
  TFlightSegment,
} from '@/features/flight-management/types';
import {
  DEFAULT_DATE_TIME_FORMAT,
  DEFAULT_TIME_FORMAT,
  FLIGHT_DATE_TIME_FORMAT,
} from '@/lib/date/constants';
import dayjs from '@/lib/date/dayjs-config';
import { startAndEndDateValidator } from '@/lib/date/helpers';
import { skipToken } from '@reduxjs/toolkit/query';
import { DatePicker, Empty, Form, Input, Skeleton } from 'antd';
import type { Rule } from 'antd/es/form';
import type { FormInstance } from 'antd/es/form';
import type { Dayjs } from 'dayjs';
import { useCallback, useEffect, useMemo } from 'react';
import { toast } from 'sonner';

type TSegmentWithId = TFlightSegment & { id: string };

type FlightScheduleUpdateDrawerProps = {
  flightId?: string;
  transactionCode?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ScheduleSegmentFormValues = {
  segmentId: string;
  startDate: Dayjs;
  endDate: Dayjs;
  duration: number;
  startPoint: string;
  endPoint: string;
  flightNumber: string;
  plane: string;
  seatClass: string;
};

type ScheduleUpdateFormValues = {
  remark: string;
  departureSegments: ScheduleSegmentFormValues[];
  returnSegments?: ScheduleSegmentFormValues[];
};

const getSegmentId = (segment: TFlightSegment): string =>
  (segment as TSegmentWithId).id ?? '';

const mapSegmentToFormValues = (segments: TFlightSegment[]) =>
  segments.map(seg => ({
    segmentId: getSegmentId(seg),
    startDate: dayjs(seg.startDate),
    endDate: dayjs(seg.endDate),
    duration: seg.duration,
    startPoint: seg.startPoint,
    endPoint: seg.endPoint,
    flightNumber: seg.flightNumber,
    plane: seg.plane,
    seatClass: seg.seatClass,
  }));

const mapFormSegmentToPayload = (segments: ScheduleSegmentFormValues[]) =>
  segments.map(seg => ({
    segmentId: seg.segmentId,
    startDate: dayjs(seg.startDate).format(FLIGHT_DATE_TIME_FORMAT),
    endDate: dayjs(seg.endDate).format(FLIGHT_DATE_TIME_FORMAT),
    duration:
      seg.duration || dayjs(seg.endDate).diff(dayjs(seg.startDate), 'minute'),
  }));

type ScheduleSegmentCardProps = {
  form: FormInstance<ScheduleUpdateFormValues>;
  segmentPath: ['departureSegments' | 'returnSegments', number];
  segment: ScheduleSegmentFormValues;
  index: number;
};

const ScheduleSegmentCard = ({
  form,
  segmentPath,
  segment,
  index,
}: ScheduleSegmentCardProps) => {
  const duration = Form.useWatch([...segmentPath, 'duration'], form);
  const startDate = Form.useWatch([...segmentPath, 'startDate'], form);
  const endDate = Form.useWatch([...segmentPath, 'endDate'], form);

  useEffect(() => {
    if (!dayjs.isDayjs(startDate) || !dayjs.isDayjs(endDate)) return;
    const nextDuration = endDate.diff(startDate, 'minute');
    if (nextDuration > 0 && duration !== nextDuration) {
      form.setFieldValue([...segmentPath, 'duration'], nextDuration);
    }
  }, [startDate, endDate, duration, form, segmentPath]);

  return (
    <AppCard
      title={`Chặng ${index + 1}: ${segment.startPoint} → ${segment.endPoint}`}
      className="mb-4"
    >
      <Form.Item name={[...segmentPath, 'segmentId']} hidden>
        <Input />
      </Form.Item>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-24">
        <Form.Item
          className="md:col-span-9"
          name={[...segmentPath, 'startDate']}
          label="Thời gian khởi hành"
          rules={[
            { required: true, message: 'Hãy chọn thời gian khởi hành' },
            startAndEndDateValidator({
              comparisonFieldName: [...segmentPath, 'endDate'],
              currentFieldType: 'START_DATE',
              customErrorMessage:
                'Thời gian khởi hành phải nhỏ hơn thời gian hạ cánh',
            }) as Rule,
          ]}
        >
          <DatePicker
            className="w-full"
            placeholder="Thời gian khởi hành"
            format={DEFAULT_DATE_TIME_FORMAT}
            showTime={{ format: DEFAULT_TIME_FORMAT }}
          />
        </Form.Item>

        <Form.Item
          className="md:col-span-9"
          name={[...segmentPath, 'endDate']}
          label="Thời gian hạ cánh"
          rules={[
            { required: true, message: 'Hãy chọn thời gian hạ cánh' },
            startAndEndDateValidator({
              comparisonFieldName: [...segmentPath, 'startDate'],
              currentFieldType: 'END_DATE',
              customErrorMessage:
                'Thời gian hạ cánh phải lớn hơn thời gian khởi hành',
            }) as Rule,
          ]}
        >
          <DatePicker
            className="w-full"
            placeholder="Thời gian hạ cánh"
            format={DEFAULT_DATE_TIME_FORMAT}
            showTime={{ format: DEFAULT_TIME_FORMAT }}
          />
        </Form.Item>
        <Form.Item
          className="md:col-span-6"
          name={[...segmentPath, 'duration']}
          label="Thời gian bay (phút)"
        >
          <AppInputNumber
            className="w-full"
            placeholder="Thời gian bay"
            precision={0}
            min={1}
            suffix="phút"
          />
        </Form.Item>
      </div>
    </AppCard>
  );
};

export const FlightScheduleUpdateDrawer = ({
  flightId,
  transactionCode,
  open,
  onOpenChange,
}: FlightScheduleUpdateDrawerProps) => {
  const [form] = Form.useForm<ScheduleUpdateFormValues>();
  const [scheduleUpdate, { isLoading }] = useScheduleUpdateMutation();

  const queryArg = !flightId || !open ? skipToken : String(flightId);
  const { data, isFetching } = useGetFlightDetailQuery(queryArg);
  const detail = data?.data;

  const handleOpenChange = useCallback(
    (o: boolean) => {
      if (!o) {
        form.resetFields();
      }
      onOpenChange(o);
    },
    [form, onOpenChange]
  );

  useEffect(() => {
    if (!open || !detail) return;

    const values: Partial<ScheduleUpdateFormValues> = {
      remark: '',
      departureSegments: mapSegmentToFormValues(detail.departureSegments),
    };

    if (detail.returnSegments?.length) {
      values.returnSegments = mapSegmentToFormValues(detail.returnSegments);
    }

    form.setFieldsValue(values);
  }, [detail, form, open]);

  const onFinish = async (values: ScheduleUpdateFormValues) => {
    if (!flightId) return;

    const payload: TFlightScheduleUpdatePayload = {
      remark: values.remark,
      segments: [
        ...mapFormSegmentToPayload(values.departureSegments),
        ...(values.returnSegments
          ? mapFormSegmentToPayload(values.returnSegments)
          : []),
      ],
    };

    try {
      await scheduleUpdate({ id: flightId, payload }).unwrap();
      toast.success('Đổi lịch bay thành công');
      onOpenChange(false);
    } catch {
      // handled by RTK
    }
  };

  const formDepartureSegments = useMemo(
    () => mapSegmentToFormValues(detail?.departureSegments ?? []),
    [detail?.departureSegments]
  );
  const formReturnSegments = useMemo(
    () => mapSegmentToFormValues(detail?.returnSegments ?? []),
    [detail?.returnSegments]
  );

  return (
    <AppDrawer
      open={open}
      onOpenChange={handleOpenChange}
      title={`Đổi lịch bay${transactionCode ? ` - ${transactionCode}` : ''}`}
      footer={
        <div className="flex w-full items-center justify-end gap-4">
          <DrawerClose asChild>
            <Button variant="outline">Hủy</Button>
          </DrawerClose>
          <Button loading={isLoading} onClick={() => form.submit()}>
            Cập nhật
          </Button>
        </div>
      }
    >
      <Skeleton loading={isFetching} active>
        {detail ? (
          <Form
            form={form}
            layout="vertical"
            disabled={isLoading}
            scrollToFirstError
            onFinish={onFinish}
          >
            <Form.Item
              name="remark"
              label="Remark"
              rules={[
                {
                  required: true,
                  message: 'Nhập remark',
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Nhập remark" />
            </Form.Item>

            {!!formDepartureSegments.length && (
              <div>
                <p className="mb-3 text-base font-medium">
                  {detail.itineraryType === FLIGHT_ITINERARY_TYPE.ONE_WAY
                    ? 'Hành trình'
                    : 'Chiều đi'}
                </p>
                {formDepartureSegments.map((seg, index) => (
                  <ScheduleSegmentCard
                    key={seg.segmentId}
                    form={form}
                    segmentPath={['departureSegments', index]}
                    segment={seg}
                    index={index}
                  />
                ))}
              </div>
            )}

            {!!formReturnSegments.length && (
              <div>
                <p className="my-3 text-base font-medium">Chiều về</p>
                {formReturnSegments.map((seg, index) => (
                  <ScheduleSegmentCard
                    key={seg.segmentId}
                    form={form}
                    segmentPath={['returnSegments', index]}
                    segment={seg}
                    index={index}
                  />
                ))}
              </div>
            )}
          </Form>
        ) : (
          <Empty description="Không có dữ liệu" />
        )}
      </Skeleton>
    </AppDrawer>
  );
};
