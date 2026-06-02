import { AppInputNumber } from '@/components/app-input-number';
import { AirlineAutocomplete } from '@/features/flight-management/components/flight/flight-form/airline-autocomplete';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from '@/features/flight-management/components/flight/flight-form/flight-form.schema';
import { Col, Form, Input, Row } from 'antd';

type GeneralInfoSectionProps = {
  className?: string;
};

export const GeneralInfoSection = ({ className }: GeneralInfoSectionProps) => {
  return (
    <section className={className}>
      <h3 className="mb-4 text-base font-semibold">Cấu hình chung</h3>

      <Row gutter={20}>
        <Col span={24} xl={5}>
          <AirlineAutocomplete
            name={FORM_FIELDS.AIRLINE_CODE}
            label={FORM_LABELS[FORM_FIELDS.AIRLINE_CODE]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.AIRLINE_CODE]}
          />
        </Col>

        <Col span={24} md={12} xl={5}>
          <Form.Item
            name={FORM_FIELDS.BOOKING_CODE}
            label={FORM_LABELS[FORM_FIELDS.BOOKING_CODE]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.BOOKING_CODE]}
          >
            <Input placeholder="VD: FPQXJ6" />
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
