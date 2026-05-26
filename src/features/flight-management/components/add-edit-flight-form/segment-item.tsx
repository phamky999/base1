import { AppFieldSet } from '@/components/app-fieldset';
import { AppInputNumber } from '@/components/app-input-number';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from '@/features/flight-management/components/add-edit-flight-form/add-edit-flight-form.schema';
import { AirAutocomplete } from '@/features/flight-management/components/add-edit-flight-form/air-autocomplete';
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
import { CircleMinusIcon } from 'lucide-react';
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

  const startDate = segmentValue?.[FORM_FIELDS.SEGMENT_START_DATE];

  const endDate = segmentValue?.[FORM_FIELDS.SEGMENT_END_DATE];

  const duration = segmentValue?.[FORM_FIELDS.SEGMENT_DURATION];

  const segmentPath = useMemo(
    () => [fieldKey, fieldName],
    [fieldKey, fieldName]
  );

  useEffect(() => {
    const hasStart = dayjs.isDayjs(startDate);
    const hasEnd = dayjs.isDayjs(endDate);

    if (hasStart && !hasEnd) {
      form.setFieldValue(
        [...segmentPath, FORM_FIELDS.SEGMENT_END_DATE],
        startDate.add(3, 'hour')
      );

      return;
    }

    if (!hasStart && hasEnd) {
      form.setFieldValue(
        [...segmentPath, FORM_FIELDS.SEGMENT_START_DATE],
        endDate.subtract(3, 'hour')
      );

      return;
    }

    if (hasStart && hasEnd) {
      const nextDuration = endDate.diff(startDate, 'minute');

      if (nextDuration > 0 && duration !== nextDuration) {
        form.setFieldValue(
          [...segmentPath, FORM_FIELDS.SEGMENT_DURATION],
          nextDuration
        );
      }
    }
  }, [duration, endDate, form, segmentPath, startDate]);

  const startDateRules = useMemo(
    () =>
      [
        ...(FORM_VALIDATIONS[FORM_FIELDS.SEGMENT_START_DATE] ?? []),

        startAndEndDateValidator({
          comparisonFieldName: [...segmentPath, FORM_FIELDS.SEGMENT_END_DATE],

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
        ...(FORM_VALIDATIONS[FORM_FIELDS.SEGMENT_END_DATE] ?? []),

        startAndEndDateValidator({
          comparisonFieldName: [...segmentPath, FORM_FIELDS.SEGMENT_START_DATE],

          currentFieldType: 'END_DATE',

          customErrorMessage:
            'Thời gian hạ cánh phải lớn hơn thời gian khởi hành',
        }) as Rule,
      ] satisfies Rule[],
    [segmentPath]
  );

  const legend = useMemo(() => {
    return (
      <div className="flex items-center gap-2">
        <p>Chặng bay {index + 1}</p>

        {total > 1 ? (
          <CircleMinusIcon
            className="size-4 cursor-pointer hover:text-red-500"
            onClick={() => remove(fieldName)}
          />
        ) : null}
      </div>
    );
  }, [fieldName, index, remove, total]);

  return (
    <AppFieldSet legend={legend}>
      <Row gutter={20} className="pt-2">
        <Col span={24} md={12} xl={6}>
          <Form.Item
            name={[fieldName, FORM_FIELDS.SEGMENT_AIRLINE_CODE]}
            label={FORM_LABELS[FORM_FIELDS.SEGMENT_AIRLINE_CODE]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.SEGMENT_AIRLINE_CODE]}
            normalize={upperCaseValue}
          >
            <Input placeholder="VD: VN" />
          </Form.Item>
        </Col>

        <Col span={24} md={12} xl={6}>
          <Form.Item
            name={[fieldName, FORM_FIELDS.SEGMENT_FLIGHT_NUMBER]}
            label={FORM_LABELS[FORM_FIELDS.SEGMENT_FLIGHT_NUMBER]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.SEGMENT_FLIGHT_NUMBER]}
            normalize={upperCaseValue}
          >
            <Input placeholder="VD: VN101" />
          </Form.Item>
        </Col>

        <Col span={24} md={12} xl={6}>
          <Form.Item
            name={[fieldName, FORM_FIELDS.SEGMENT_SEAT_CLASS]}
            label={FORM_LABELS[FORM_FIELDS.SEGMENT_SEAT_CLASS]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.SEGMENT_SEAT_CLASS]}
          >
            <Input placeholder={FORM_LABELS[FORM_FIELDS.SEGMENT_SEAT_CLASS]} />
          </Form.Item>
        </Col>

        <Col span={24} md={12} xl={6}>
          <Form.Item
            name={[fieldName, FORM_FIELDS.SEGMENT_PLANE]}
            label={FORM_LABELS[FORM_FIELDS.SEGMENT_PLANE]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.SEGMENT_PLANE]}
          >
            <Input placeholder={FORM_LABELS[FORM_FIELDS.SEGMENT_PLANE]} />
          </Form.Item>
        </Col>

        <Col span={24} md={12} xl={5}>
          <AirAutocomplete
            name={[fieldName, FORM_FIELDS.SEGMENT_START_POINT]}
            label={FORM_LABELS[FORM_FIELDS.SEGMENT_START_POINT]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.SEGMENT_START_POINT]}
          />
        </Col>

        <Col span={24} md={12} xl={5}>
          <SegmentDateField
            name={[fieldName, FORM_FIELDS.SEGMENT_START_DATE]}
            label={FORM_LABELS[FORM_FIELDS.SEGMENT_START_DATE] as string}
            rules={startDateRules}
            isCreate={isCreate}
          />
        </Col>

        <Col span={24} md={12} xl={5}>
          <AirAutocomplete
            name={[fieldName, FORM_FIELDS.SEGMENT_END_POINT]}
            label={FORM_LABELS[FORM_FIELDS.SEGMENT_END_POINT]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.SEGMENT_END_POINT]}
          />
        </Col>

        <Col span={24} md={12} xl={5}>
          <SegmentDateField
            name={[fieldName, FORM_FIELDS.SEGMENT_END_DATE]}
            label={FORM_LABELS[FORM_FIELDS.SEGMENT_END_DATE] as string}
            rules={endDateRules}
            isCreate={isCreate}
          />
        </Col>

        <Col span={24} xl={4}>
          <Form.Item
            name={[fieldName, FORM_FIELDS.SEGMENT_DURATION]}
            label={FORM_LABELS[FORM_FIELDS.SEGMENT_DURATION]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.SEGMENT_DURATION]}
          >
            <AppInputNumber
              placeholder={FORM_LABELS[FORM_FIELDS.SEGMENT_DURATION]}
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
