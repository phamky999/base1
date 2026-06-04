import { AppFieldSet } from '@/components/app-fieldset';
import { AppInputNumber } from '@/components/app-input-number';
import { Button } from '@/components/ui/button';
import { AircraftAutocomplete } from '@/features/flight-management/components/flight/flight-form/aircraft-autocomplete';
import { AirlineAutocomplete } from '@/features/flight-management/components/flight/flight-form/airline-autocomplete';
import { AirlineClassesAutocomplete } from '@/features/flight-management/components/flight/flight-form/airline-classes-autocomplete';
import { AirportAutocomplete } from '@/features/flight-management/components/flight/flight-form/airport-autocomplete';
import {
  SEGMENT_FIELD_LABELS,
  SEGMENT_FIELD_VALIDATIONS,
  SEGMENT_FIELDS,
} from '@/features/flight-management/components/flight/flight-form/flight-form.schema';
import {
  DEFAULT_DATE_TIME_FORMAT,
  DEFAULT_TIME_FORMAT,
} from '@/lib/date/constants';
import dayjs from '@/lib/date/dayjs-config';
import { startAndEndDateValidator } from '@/lib/date/helpers';
import { upperCaseValue } from '@/lib/helpers/string';
import type { FormInstance } from 'antd';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import type { Rule } from 'antd/es/form';
import type { Dayjs } from 'dayjs';
import { Trash2Icon } from 'lucide-react';
import { useEffect, useMemo } from 'react';

type SegmentItemProps = {
  form: FormInstance;
  fieldKey: string;
  fieldName: number;
  index: number;
  total: number;
  remove: (index: number) => void;
  isCreate?: boolean;
};

const disablePastDate = (currentDate: Dayjs) => {
  return currentDate?.isBefore(dayjs().startOf('day'));
};

type SegmentDateFieldProps = {
  name: (string | number)[];
  label: string;
  rules?: Rule[];
  isCreate?: boolean;
};

const SegmentDateField = ({
  name,
  label,
  rules,
  isCreate,
}: SegmentDateFieldProps) => {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <DatePicker
        className="w-full"
        placeholder={label}
        format={DEFAULT_DATE_TIME_FORMAT}
        showTime={{
          format: DEFAULT_TIME_FORMAT,
        }}
        disabledDate={isCreate ? disablePastDate : undefined}
      />
    </Form.Item>
  );
};

export const SegmentItem = ({
  form,
  fieldKey,
  fieldName,
  index,
  total,
  remove,
  isCreate,
}: SegmentItemProps) => {
  const segmentValue = Form.useWatch([fieldKey, fieldName], form);

  const airlineCode = segmentValue?.[SEGMENT_FIELDS.AIRLINE_CODE];

  const startDate = segmentValue?.[SEGMENT_FIELDS.START_DATE];

  const endDate = segmentValue?.[SEGMENT_FIELDS.END_DATE];

  const duration = segmentValue?.[SEGMENT_FIELDS.DURATION];

  const segmentPath = useMemo(
    () => [fieldKey, fieldName],
    [fieldKey, fieldName]
  );

  useEffect(() => {
    const hasStart = dayjs.isDayjs(startDate);
    const hasEnd = dayjs.isDayjs(endDate);

    if (hasStart && !hasEnd) {
      form.setFieldValue(
        [...segmentPath, SEGMENT_FIELDS.END_DATE],
        startDate.add(3, 'hour')
      );

      return;
    }

    if (!hasStart && hasEnd) {
      form.setFieldValue(
        [...segmentPath, SEGMENT_FIELDS.START_DATE],
        endDate.subtract(3, 'hour')
      );

      return;
    }

    if (hasStart && hasEnd) {
      const nextDuration = endDate.diff(startDate, 'minute');

      if (nextDuration > 0 && duration !== nextDuration) {
        form.setFieldValue(
          [...segmentPath, SEGMENT_FIELDS.DURATION],
          nextDuration
        );
      }
    }
  }, [duration, endDate, form, segmentPath, startDate]);

  const startDateRules = useMemo(
    () =>
      [
        ...(SEGMENT_FIELD_VALIDATIONS[SEGMENT_FIELDS.START_DATE] ?? []),

        startAndEndDateValidator({
          comparisonFieldName: [...segmentPath, SEGMENT_FIELDS.END_DATE],

          currentFieldType: 'START_DATE',

          customErrorMessage:
            'Thời gian khởi hành phải nhỏ hơn thời gian hạ cánh',
        }) as Rule,
      ] satisfies Rule[],
    [segmentPath]
  );

  const endDateRules = useMemo(
    () =>
      [
        ...(SEGMENT_FIELD_VALIDATIONS[SEGMENT_FIELDS.END_DATE] ?? []),

        startAndEndDateValidator({
          comparisonFieldName: [...segmentPath, SEGMENT_FIELDS.START_DATE],

          currentFieldType: 'END_DATE',

          customErrorMessage:
            'Thời gian hạ cánh phải lớn hơn thời gian khởi hành',
        }) as Rule,
      ] satisfies Rule[],
    [segmentPath]
  );

  return (
    <AppFieldSet
      title={`Chặng bay ${index + 1}`}
      headerAction={
        total > 1 ? (
          <Button
            variant="destructive"
            size="icon-sm"
            onClick={() => remove(fieldName)}
          >
            <Trash2Icon />
          </Button>
        ) : null
      }
    >
      <Row gutter={20}>
        <Col span={24} md={12} xl={6}>
          <AirlineAutocomplete
            name={[fieldName, SEGMENT_FIELDS.AIRLINE_CODE]}
            label={SEGMENT_FIELD_LABELS[SEGMENT_FIELDS.AIRLINE_CODE]}
            rules={SEGMENT_FIELD_VALIDATIONS[SEGMENT_FIELDS.AIRLINE_CODE]}
          />
        </Col>

        <Col span={24} md={12} xl={6}>
          <Form.Item
            name={[fieldName, SEGMENT_FIELDS.FLIGHT_NUMBER]}
            label={SEGMENT_FIELD_LABELS[SEGMENT_FIELDS.FLIGHT_NUMBER]}
            rules={SEGMENT_FIELD_VALIDATIONS[SEGMENT_FIELDS.FLIGHT_NUMBER]}
            normalize={upperCaseValue}
          >
            <Input placeholder="VD: VN101" />
          </Form.Item>
        </Col>

        <Col span={24} md={12} xl={6}>
          <AirlineClassesAutocomplete
            name={[fieldName, SEGMENT_FIELDS.SEAT_CLASS]}
            label={SEGMENT_FIELD_LABELS[SEGMENT_FIELDS.SEAT_CLASS]}
            rules={SEGMENT_FIELD_VALIDATIONS[SEGMENT_FIELDS.SEAT_CLASS]}
            airlineCode={airlineCode}
          />
        </Col>

        <Col span={24} md={12} xl={6}>
          <AircraftAutocomplete
            name={[fieldName, SEGMENT_FIELDS.PLANE]}
            label={SEGMENT_FIELD_LABELS[SEGMENT_FIELDS.PLANE]}
            rules={SEGMENT_FIELD_VALIDATIONS[SEGMENT_FIELDS.PLANE]}
          />
        </Col>

        <Col span={24} md={12} xl={5}>
          <AirportAutocomplete
            name={[fieldName, SEGMENT_FIELDS.START_POINT]}
            label={SEGMENT_FIELD_LABELS[SEGMENT_FIELDS.START_POINT]}
            rules={SEGMENT_FIELD_VALIDATIONS[SEGMENT_FIELDS.START_POINT]}
          />
        </Col>

        <Col span={24} md={12} xl={5}>
          <SegmentDateField
            name={[fieldName, SEGMENT_FIELDS.START_DATE]}
            label={SEGMENT_FIELD_LABELS[SEGMENT_FIELDS.START_DATE] as string}
            rules={startDateRules}
            isCreate={isCreate}
          />
        </Col>

        <Col span={24} md={12} xl={5}>
          <AirportAutocomplete
            name={[fieldName, SEGMENT_FIELDS.END_POINT]}
            label={SEGMENT_FIELD_LABELS[SEGMENT_FIELDS.END_POINT]}
            rules={SEGMENT_FIELD_VALIDATIONS[SEGMENT_FIELDS.END_POINT]}
          />
        </Col>

        <Col span={24} md={12} xl={5}>
          <SegmentDateField
            name={[fieldName, SEGMENT_FIELDS.END_DATE]}
            label={SEGMENT_FIELD_LABELS[SEGMENT_FIELDS.END_DATE] as string}
            rules={endDateRules}
            isCreate={isCreate}
          />
        </Col>

        <Col span={24} xl={4}>
          <Form.Item
            name={[fieldName, SEGMENT_FIELDS.DURATION]}
            label={SEGMENT_FIELD_LABELS[SEGMENT_FIELDS.DURATION]}
            rules={SEGMENT_FIELD_VALIDATIONS[SEGMENT_FIELDS.DURATION]}
          >
            <AppInputNumber
              placeholder={SEGMENT_FIELD_LABELS[SEGMENT_FIELDS.DURATION]}
              className="w-full"
              precision={0}
              min={1}
              suffix="phút"
            />
          </Form.Item>
        </Col>
      </Row>
    </AppFieldSet>
  );
};
