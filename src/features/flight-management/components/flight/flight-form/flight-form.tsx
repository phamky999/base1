import { Button } from '@/components/ui/button';
import {
  FORM_FIELDS,
  SEGMENT_FIELDS,
} from '@/features/flight-management/components/flight/flight-form/flight-form.schema';
import { FLIGHT_ITINERARY_TYPE } from '@/features/flight-management/constants';
import {
  useCreateFlightMutation,
  useGetFlightDetailQuery,
  useUpdateFlightMutation,
} from '@/features/flight-management/query';
import { flightManagementPaths } from '@/features/flight-management/routes';
import type {
  TCreateFlightPayload,
  TFlightSegment,
  TUpdateFlightPayload,
} from '@/features/flight-management/types';
import { FLIGHT_DATE_TIME_FORMAT } from '@/lib/date/constants';
import dayjs from '@/lib/date/dayjs-config';
import type { ObjectType } from '@/lib/types';
import { skipToken } from '@reduxjs/toolkit/query';
import { Form, Skeleton } from 'antd';
import type { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FareRulesSection } from './fare-rules';
import { GeneralInfoSection } from './general-info';
import { PriceInfoSection } from './price-info';
import { SegmentsSection } from './segments';

type FlightFormProps = {
  id?: string;
  actionType: 'create' | 'edit';
};

const formatSegmentToFormValue = (segment: TFlightSegment) => {
  return {
    ...segment,
    startDate: dayjs(segment.startDate),
    endDate: dayjs(segment.endDate),
  };
};

const mapSegmentToPayload = (segment: ObjectType) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { airlineCodeAutoFilled, ...restItem } = segment;

  return {
    ...restItem,
    startDate: (restItem.startDate as Dayjs)?.format(FLIGHT_DATE_TIME_FORMAT),
    endDate: (restItem.endDate as Dayjs)?.format(FLIGHT_DATE_TIME_FORMAT),
  };
};

export const FlightForm = ({ id, actionType }: FlightFormProps) => {
  const isEditForm = actionType === 'edit';

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const queryArg = !id ? skipToken : String(id);

  const { data, isFetching } = useGetFlightDetailQuery(queryArg);

  const [createFlightMutationFn, { isLoading: isCreating }] =
    useCreateFlightMutation();

  const [updateFlightMutationFn, { isLoading: isUpdating }] =
    useUpdateFlightMutation();

  const isSubmitting = isCreating || isUpdating;

  useEffect(() => {
    if (!id || !data?.data) return;

    const flightDetail = data.data;

    form.setFieldsValue({
      [FORM_FIELDS.AIRLINE_CODE]: flightDetail.airlineCode,
      [FORM_FIELDS.BOOKING_CODE]: isEditForm
        ? flightDetail.bookingCode
        : undefined,
      [FORM_FIELDS.SEAT_TOTAL]: flightDetail.seatTotal,
      [FORM_FIELDS.TIME_LIMIT]: flightDetail.timeLimit,
      [FORM_FIELDS.CLOSING_DAYS_BEFORE_DEPARTURE]:
        flightDetail.closingDaysBeforeDeparture,
      [FORM_FIELDS.FARE_RULES]: flightDetail.fareRules || [],
      [FORM_FIELDS.PRICE_ADULT]: flightDetail.priceAdult,
      [FORM_FIELDS.PRICE_CHILD]: flightDetail.priceChild,
      [FORM_FIELDS.PRICE_INFANT]: flightDetail.priceInfant,
      [FORM_FIELDS.ITINERARY_TYPE]:
        flightDetail.itineraryType || FLIGHT_ITINERARY_TYPE.ONE_WAY,
      [FORM_FIELDS.DEPARTURE_SEGMENTS]: (
        flightDetail.departureSegments || []
      ).map(formatSegmentToFormValue),
      [FORM_FIELDS.RETURN_SEGMENTS]: (flightDetail.returnSegments || []).map(
        formatSegmentToFormValue
      ),
    });
  }, [data, form, id, isEditForm]);

  const onFinish = async (values: ObjectType) => {
    if (isSubmitting) return;

    try {
      const { departureSegments, returnSegments, fareRules, ...restValues } =
        values || {};

      const payload = {
        ...restValues,
        departureSegments: departureSegments?.map(mapSegmentToPayload) || [],
        returnSegments: returnSegments?.map(mapSegmentToPayload) || [],
        fareRules: fareRules || [],
      };

      if (isEditForm) {
        await updateFlightMutationFn({
          ...payload,
          id,
        } as TUpdateFlightPayload).unwrap();
      } else {
        await createFlightMutationFn({
          payload: payload as TCreateFlightPayload,
        }).unwrap();
      }

      toast.success(
        isEditForm
          ? 'Cập nhật chuyến bay thành công'
          : 'Tạo chuyến bay thành công'
      );

      navigate(flightManagementPaths.flightList.fullPath);
    } catch (error) {
      console.error('Submit Error', error);
    }
  };

  const handleFormValueChange = (
    changedValues: Partial<ObjectType>,
    allValues: ObjectType
  ) => {
    // ROUND TRIP SYNC
    const itineraryType = allValues?.[FORM_FIELDS.ITINERARY_TYPE];

    const isRoundTrip = itineraryType === FLIGHT_ITINERARY_TYPE.ROUND_TRIP;

    if (!isRoundTrip) {
      return;
    }

    const hasDepartureChanged = Object.prototype.hasOwnProperty.call(
      changedValues,
      FORM_FIELDS.DEPARTURE_SEGMENTS
    );

    const hasTypeChanged = Object.prototype.hasOwnProperty.call(
      changedValues,
      FORM_FIELDS.ITINERARY_TYPE
    );

    if (!hasDepartureChanged && !hasTypeChanged) {
      return;
    }

    const departureSegments =
      form.getFieldValue(FORM_FIELDS.DEPARTURE_SEGMENTS) || [];

    const lastValidDepartureSegment = [...departureSegments]
      .reverse()
      .find(segment => {
        const startDate = segment?.[SEGMENT_FIELDS.START_DATE];
        const endDate = segment?.[SEGMENT_FIELDS.END_DATE];
        return dayjs.isDayjs(startDate) && dayjs.isDayjs(endDate);
      });

    if (!lastValidDepartureSegment) {
      return;
    }
    const depStartDate = lastValidDepartureSegment?.[SEGMENT_FIELDS.START_DATE];

    const depEndDate = lastValidDepartureSegment?.[SEGMENT_FIELDS.END_DATE];

    if (!dayjs.isDayjs(depStartDate) || !dayjs.isDayjs(depEndDate)) {
      return;
    }

    const nextReturnStartDate = depStartDate.add(3, 'day');

    const nextReturnEndDate = depEndDate.add(3, 'day');

    const firstReturnSegment = form.getFieldValue([
      FORM_FIELDS.RETURN_SEGMENTS,
      0,
    ]);

    if (!firstReturnSegment?.[SEGMENT_FIELDS.START_DATE]) {
      form.setFields([
        {
          name: [FORM_FIELDS.RETURN_SEGMENTS, 0, SEGMENT_FIELDS.START_DATE],
          value: nextReturnStartDate,
        },
        {
          name: [FORM_FIELDS.RETURN_SEGMENTS, 0, SEGMENT_FIELDS.END_DATE],
          value: nextReturnEndDate,
        },
      ]);
    }
  };

  return (
    <Skeleton loading={isFetching} active>
      <Form
        form={form}
        layout="vertical"
        disabled={isSubmitting}
        scrollToFirstError
        onFinish={onFinish}
        onValuesChange={handleFormValueChange}
        onKeyDown={e => {
          if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) {
            e.preventDefault();
          }
        }}
        {...(!isEditForm && {
          initialValues: {
            [FORM_FIELDS.DEPARTURE_SEGMENTS]: [undefined],
            [FORM_FIELDS.RETURN_SEGMENTS]: [undefined],
          },
        })}
      >
        <div className="space-y-4">
          <GeneralInfoSection className="card" isCreate={!isEditForm} />

          <SegmentsSection className="card" isCreate={!isEditForm} />

          <PriceInfoSection className="card" />

          <FareRulesSection className="card" />
        </div>

        <div className="card sticky bottom-0 z-1 mt-6 flex items-center justify-between gap-4 bg-card">
          <Button
            type="button"
            variant="outline"
            className="min-w-25"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Hủy
          </Button>

          <Button
            type="submit"
            variant="default"
            className="min-w-25"
            loading={isSubmitting}
          >
            {isEditForm ? 'Cập nhật' : 'Tạo chuyến bay'}
          </Button>
        </div>
      </Form>
    </Skeleton>
  );
};
