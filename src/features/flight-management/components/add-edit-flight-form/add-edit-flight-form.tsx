import { Button } from '@/components/ui/button';
import { FORM_FIELDS } from '@/features/flight-management/components/add-edit-flight-form/add-edit-flight-form.schema';
import {
  useCreateFlightMutation,
  useGetFlightDetailQuery,
  useUpdateFlightMutation,
} from '@/features/flight-management/query';
import { flightManagementPaths } from '@/features/flight-management/routes';
import type {
  TCreateFlightPayload,
  TUpdateFlightPayload,
} from '@/features/flight-management/types';
import { FLIGHT_DATE_TIME_FORMAT } from '@/lib/date/constants';
import dayjs from '@/lib/date/dayjs-config';
import { appendParentToKeys, removeParentFromKeys } from '@/lib/helpers/object';
import type { ObjectType } from '@/lib/types';
import { Form, Spin } from 'antd';
import { type Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FareRulesSection } from './fare-rules';
import { GeneralInfoSection } from './general-info';
import { PriceInfoSection } from './price-info';
import { SegmentsSection } from './segments';

type AddEditFlightFormProps = {
  id?: string;
};

export const AddEditFlightForm = ({ id }: AddEditFlightFormProps) => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, isFetching } = useGetFlightDetailQuery(id || '', {
    skip: !id,
  });

  const [createFlightMutationFn] = useCreateFlightMutation();

  const [updateFlightMutationFn] = useUpdateFlightMutation();

  useEffect(() => {
    if (!id || !data) return;

    const flightDetail = data?.data;

    form.setFieldsValue({
      [FORM_FIELDS.AIRLINE_CODE]: flightDetail?.airlineCode,
      [FORM_FIELDS.BOOKING_CODE]: flightDetail?.bookingCode,
      [FORM_FIELDS.SEAT_TOTAL]: flightDetail?.seatTotal,
      [FORM_FIELDS.TIME_LIMIT]: flightDetail?.timeLimit,
      [FORM_FIELDS.CLOSING_DAYS_BEFORE_DEPARTURE]:
        flightDetail?.closingDaysBeforeDeparture,
      [FORM_FIELDS.FARE_RULES]: (flightDetail?.fareRules || []).map(
        (fareRule: ObjectType) => appendParentToKeys(fareRule, 'fareRule')
      ),
      [FORM_FIELDS.PRICE_ADULT]: flightDetail?.priceAdult,
      [FORM_FIELDS.PRICE_CHILD]: flightDetail?.priceChild,
      [FORM_FIELDS.PRICE_INFANT]: flightDetail?.priceInfant,
      [FORM_FIELDS.SEGMENTS]: (flightDetail?.segments || []).map(
        (segment: ObjectType) => {
          const item = {
            ...segment,
            startDate: dayjs(segment?.startDate),
            endDate: dayjs(segment?.endDate),
          };

          return appendParentToKeys(item, 'segment');
        }
      ),
    });
  }, [id, data, form]);

  const onFinish = async (values: ObjectType) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const isUpdate = !!id;
      const { segments, fareRules, ...restValues } = values || {};

      const payload = {
        ...restValues,
        segments: segments?.map((segment: ObjectType) => {
          const item = removeParentFromKeys(segment);
          return {
            ...item,
            startDate: (item?.startDate as Dayjs)?.format(
              FLIGHT_DATE_TIME_FORMAT
            ),
            endDate: (item?.endDate as Dayjs)?.format(FLIGHT_DATE_TIME_FORMAT),
          };
        }),
        fareRules: fareRules?.map((fareRule: ObjectType) =>
          removeParentFromKeys(fareRule)
        ),
      };

      if (isUpdate) {
        await updateFlightMutationFn({
          ...payload,
          id,
        } as TUpdateFlightPayload).unwrap();
      } else {
        await createFlightMutationFn(payload as TCreateFlightPayload).unwrap();
      }

      toast.success(
        isUpdate
          ? 'Cập nhật chuyến bay thành công'
          : 'Tạo chuyến bay thành công'
      );

      navigate(flightManagementPaths.flightList.fullPath);
    } catch (error) {
      console.error('Submit Error', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionCls = 'rounded-xl border bg-card p-4 shadow-sm';

  return (
    <Spin spinning={isFetching}>
      <Form
        disabled={isSubmitting}
        form={form}
        layout="vertical"
        onFinish={onFinish}
        scrollToFirstError
        onValuesChange={(_, allValues) => {
          const segments = allValues?.[FORM_FIELDS.SEGMENTS];
          if (!Array.isArray(segments)) return;
          segments.forEach((segment: ObjectType, index: number) => {
            const startDate = segment?.[FORM_FIELDS.SEGMENT_START_DATE] as
              | Dayjs
              | undefined;
            const endDate = segment?.[FORM_FIELDS.SEGMENT_END_DATE] as
              | Dayjs
              | undefined;
            if (
              dayjs.isDayjs(startDate) &&
              dayjs.isDayjs(endDate) &&
              endDate.isAfter(startDate)
            ) {
              const durationInMinutes = endDate.diff(startDate, 'minute');
              form.setFieldValue(
                [FORM_FIELDS.SEGMENTS, index, FORM_FIELDS.SEGMENT_DURATION],
                durationInMinutes
              );
            }
          });
        }}
        initialValues={{
          segments: [undefined],
        }}
      >
        <div className="space-y-4">
          <GeneralInfoSection className={sectionCls} />

          <SegmentsSection className={sectionCls} />

          <PriceInfoSection className={sectionCls} />

          <FareRulesSection className={sectionCls} />
        </div>

        <div className="sticky bottom-0 mt-6 flex items-center justify-between gap-4 bg-(--main-background) p-4">
          <Button
            type="button"
            variant={'outline'}
            onClick={() => navigate(-1)}
            className="min-w-25"
          >
            Hủy
          </Button>
          <Button
            variant={'default'}
            type="submit"
            loading={isSubmitting}
            className="min-w-25"
          >
            {id ? 'Cập nhật' : 'Tạo chuyến bay'}
          </Button>
        </div>
      </Form>
    </Spin>
  );
};
