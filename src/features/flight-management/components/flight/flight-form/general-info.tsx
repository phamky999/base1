import { AppInputNumber } from '@/components/app-ui/app-input-number';
import { AirlineAutocomplete } from '@/features/flight-management/components/flight/flight-form/airline-autocomplete';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
  SEGMENT_FIELDS,
} from '@/features/flight-management/components/flight/flight-form/flight-form.schema';
import { upperCaseValue } from '@/lib/helpers/string';
import type { ObjectType } from '@/lib/types';
import { Regex } from '@/lib/validations';
import { Col, Form, Input, Row } from 'antd';

type GeneralInfoSectionProps = {
  className?: string;
  isCreate?: boolean;
};

const { useFormInstance } = Form;

export const GeneralInfoSection = ({
  className,
  isCreate = true,
}: GeneralInfoSectionProps) => {
  const form = useFormInstance();

  const mapAirlineCodeToSegments = (item: ObjectType, airlineCode: string) => {
    if (!item?.[SEGMENT_FIELDS.AIRLINE_CODE]) {
      return {
        ...item,
        [SEGMENT_FIELDS.AIRLINE_CODE]: airlineCode,
      };
    }
    return item;
  };

  const handleAirlineBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!isCreate) return;

    if (!Regex.AIRLINE_CODE.test(e.target.value)) return;

    const departureSegments = form.getFieldValue(
      FORM_FIELDS.DEPARTURE_SEGMENTS
    );
    const returnSegments = form.getFieldValue(FORM_FIELDS.RETURN_SEGMENTS);

    const departureSegmentsWithAirline = departureSegments.map(
      (item: ObjectType) => mapAirlineCodeToSegments(item, e.target.value)
    );

    const returnSegmentsWithAirline = returnSegments.map((item: ObjectType) =>
      mapAirlineCodeToSegments(item, e.target.value)
    );

    form.setFields([
      {
        name: FORM_FIELDS.DEPARTURE_SEGMENTS,
        value: departureSegmentsWithAirline,
      },
      {
        name: FORM_FIELDS.RETURN_SEGMENTS,
        value: returnSegmentsWithAirline,
      },
    ]);
  };

  return (
    <section className={className}>
      <h3 className="mb-4 text-base font-semibold">Cấu hình chung</h3>

      <Row gutter={20}>
        <Col span={24} xl={5}>
          <AirlineAutocomplete
            name={FORM_FIELDS.AIRLINE_CODE}
            label={FORM_LABELS[FORM_FIELDS.AIRLINE_CODE]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.AIRLINE_CODE]}
            autoCompleteProps={{
              onBlur: handleAirlineBlur,
            }}
          />
        </Col>

        <Col span={24} md={12} xl={5}>
          <Form.Item
            name={FORM_FIELDS.BOOKING_CODE}
            label={FORM_LABELS[FORM_FIELDS.BOOKING_CODE]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.BOOKING_CODE]}
            normalize={upperCaseValue}
          >
            <Input placeholder="VD: FPQXJ6" maxLength={6} />
          </Form.Item>
        </Col>

        <Col span={24} md={12} xl={5}>
          <Form.Item
            name={FORM_FIELDS.SEAT_TOTAL}
            label={FORM_LABELS[FORM_FIELDS.SEAT_TOTAL]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.SEAT_TOTAL]}
          >
            <AppInputNumber
              placeholder={FORM_LABELS[FORM_FIELDS.SEAT_TOTAL]}
              className="w-full"
              precision={0}
              min={0}
            />
          </Form.Item>
        </Col>

        <Col span={24} md={12} xl={5}>
          <Form.Item
            name={FORM_FIELDS.TIME_LIMIT}
            label={FORM_LABELS[FORM_FIELDS.TIME_LIMIT]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.TIME_LIMIT]}
          >
            <AppInputNumber
              placeholder={FORM_LABELS[FORM_FIELDS.TIME_LIMIT]}
              className="w-full"
              precision={0}
              min={0}
              suffix="phút"
            />
          </Form.Item>
        </Col>

        <Col span={24} md={12} xl={4}>
          <Form.Item
            name={FORM_FIELDS.CLOSING_DAYS_BEFORE_DEPARTURE}
            label={FORM_LABELS[FORM_FIELDS.CLOSING_DAYS_BEFORE_DEPARTURE]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.CLOSING_DAYS_BEFORE_DEPARTURE]}
            tooltip="Số ngày trước thời gian khởi hành mà hệ thống sẽ tự động đóng bán vé máy bay"
          >
            <AppInputNumber
              placeholder={
                FORM_LABELS[FORM_FIELDS.CLOSING_DAYS_BEFORE_DEPARTURE]
              }
              className="w-full"
              precision={0}
              min={0}
              suffix="ngày"
            />
          </Form.Item>
        </Col>
      </Row>
    </section>
  );
};
