import { AppInputNumber } from '@/components/app-input-number';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from '@/features/flight-management/components/add-edit-flight-form/add-edit-flight-form.schema';
import { Col, Form, Row } from 'antd';

type PriceInfoSectionProps = {
  className?: string;
};

export const PriceInfoSection = ({ className }: PriceInfoSectionProps) => {
  return (
    <section className={className}>
      <h3 className="mb-4 text-base font-semibold">Cấu hình giá</h3>

      <Row gutter={20}>
        <Col span={24} md={8}>
          <Form.Item
            name={FORM_FIELDS.PRICE_ADULT}
            label={FORM_LABELS[FORM_FIELDS.PRICE_ADULT]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.PRICE_ADULT]}
          >
            <AppInputNumber
              className="w-full"
              placeholder={FORM_LABELS[FORM_FIELDS.PRICE_ADULT]}
              precision={0}
              min={0}
              suffix="₫"
            />
          </Form.Item>
        </Col>

        <Col span={24} md={8}>
          <Form.Item
            name={FORM_FIELDS.PRICE_CHILD}
            label={FORM_LABELS[FORM_FIELDS.PRICE_CHILD]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.PRICE_CHILD]}
          >
            <AppInputNumber
              className="w-full"
              placeholder={FORM_LABELS[FORM_FIELDS.PRICE_CHILD]}
              precision={0}
              min={0}
              suffix="₫"
            />
          </Form.Item>
        </Col>

        <Col span={24} md={8}>
          <Form.Item
            name={FORM_FIELDS.PRICE_INFANT}
            label={FORM_LABELS[FORM_FIELDS.PRICE_INFANT]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.PRICE_INFANT]}
          >
            <AppInputNumber
              className="w-full"
              placeholder={FORM_LABELS[FORM_FIELDS.PRICE_INFANT]}
              precision={0}
              min={0}
              suffix="₫"
            />
          </Form.Item>
        </Col>
      </Row>
    </section>
  );
};
