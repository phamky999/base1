import { AppInputNumber } from '@/components/app-ui/app-input-number';
import { PAYMENT_METHODS } from '@/features/tour-management/constants';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from '@/features/tour-management/components/tour/tour-form.schema';
import { Form, Select } from 'antd';

type PriceInfoSectionProps = {
  className?: string;
};

export const PriceInfoSection = ({ className }: PriceInfoSectionProps) => {
  return (
    <section className={className}>
      <h3 className="mb-4 text-base font-semibold">Cấu hình giá</h3>

      <div className="grid grid-cols-1 gap-x-5 gap-y-0 md:grid-cols-2 xl:grid-cols-5">
        <Form.Item
          name={FORM_FIELDS.ADULT_PRICE}
          label={FORM_LABELS[FORM_FIELDS.ADULT_PRICE]}
          rules={FORM_VALIDATIONS[FORM_FIELDS.ADULT_PRICE]}
        >
          <AppInputNumber
            className="w-full"
            placeholder={FORM_LABELS[FORM_FIELDS.ADULT_PRICE]}
            precision={0}
            min={0}
            suffix="₫"
          />
        </Form.Item>

        <Form.Item
          name={FORM_FIELDS.CHILD_PRICE}
          label={FORM_LABELS[FORM_FIELDS.CHILD_PRICE]}
          rules={FORM_VALIDATIONS[FORM_FIELDS.CHILD_PRICE]}
        >
          <AppInputNumber
            className="w-full"
            placeholder={FORM_LABELS[FORM_FIELDS.CHILD_PRICE]}
            precision={0}
            min={0}
            suffix="₫"
          />
        </Form.Item>

        <Form.Item
          name={FORM_FIELDS.INFANT_PRICE}
          label={FORM_LABELS[FORM_FIELDS.INFANT_PRICE]}
          rules={FORM_VALIDATIONS[FORM_FIELDS.INFANT_PRICE]}
        >
          <AppInputNumber
            className="w-full"
            placeholder={FORM_LABELS[FORM_FIELDS.INFANT_PRICE]}
            precision={0}
            min={0}
            suffix="₫"
          />
        </Form.Item>

        <Form.Item
          name={FORM_FIELDS.PRIVATE_ROOM_PRICE}
          label={FORM_LABELS[FORM_FIELDS.PRIVATE_ROOM_PRICE]}
          rules={FORM_VALIDATIONS[FORM_FIELDS.PRIVATE_ROOM_PRICE]}
        >
          <AppInputNumber
            className="w-full"
            placeholder={FORM_LABELS[FORM_FIELDS.PRIVATE_ROOM_PRICE]}
            precision={0}
            min={0}
            suffix="₫"
          />
        </Form.Item>

        <Form.Item
          name={FORM_FIELDS.PAYMENT_METHOD}
          label={FORM_LABELS[FORM_FIELDS.PAYMENT_METHOD]}
        >
          <Select
            placeholder="Chọn hình thức thanh toán"
            options={PAYMENT_METHODS}
            allowClear
          />
        </Form.Item>
      </div>
    </section>
  );
};
