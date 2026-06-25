import { AppInputNumber } from '@/components/app-ui/app-input-number';
import { AppTooltip } from '@/components/app-ui/app-tooltip';
import { Button } from '@/components/ui/button';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from '@/features/tour-management/components/tour/tour-form.schema';
import {
  DAY_OF_WEEK_OPTIONS,
  MOCK_DESTINATIONS,
  MOCK_NOTES,
  MOCK_TOUR_ROUTES,
  TOUR_TYPE,
  TOUR_TYPE_OPTIONS,
} from '@/features/tour-management/constants';
import { DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

type GeneralInfoSectionProps = {
  className?: string;
};

export const GeneralInfoSection = ({ className }: GeneralInfoSectionProps) => {
  const [open, setOpen] = useState(false);

  const form = Form.useFormInstance();
  const tourType = Form.useWatch(FORM_FIELDS.TOUR_TYPE, form);

  return (
    <section className={className}>
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="group mb-4 flex w-full cursor-pointer items-center justify-between border-none bg-transparent p-0"
      >
        <h3 className="text-base font-semibold">Thông tin chung</h3>
        <AppTooltip content={open ? 'Thu gọn' : 'Mở rộng'}>
          <ChevronDownIcon
            className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </AppTooltip>
      </button>

      <div className="mb-4 grid grid-cols-1 gap-x-5 gap-y-0 md:grid-cols-2 xl:grid-cols-4">
        <Form.Item
          name={FORM_FIELDS.TOUR_ROUTE_ID}
          label={FORM_LABELS[FORM_FIELDS.TOUR_ROUTE_ID]}
          rules={FORM_VALIDATIONS[FORM_FIELDS.TOUR_ROUTE_ID]}
        >
          <Select
            placeholder="Chọn tuyến tour"
            options={MOCK_TOUR_ROUTES}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item
          name={FORM_FIELDS.PROGRAM_NAME}
          label={FORM_LABELS[FORM_FIELDS.PROGRAM_NAME]}
          rules={FORM_VALIDATIONS[FORM_FIELDS.PROGRAM_NAME]}
        >
          <Input placeholder="Nhập tên chương trình tour" />
        </Form.Item>

        <Form.Item
          name={FORM_FIELDS.HOLD_TIME}
          label={FORM_LABELS[FORM_FIELDS.HOLD_TIME]}
          rules={FORM_VALIDATIONS[FORM_FIELDS.HOLD_TIME]}
        >
          <AppInputNumber
            className="w-full"
            placeholder={FORM_LABELS[FORM_FIELDS.HOLD_TIME]}
            precision={0}
            min={1}
            suffix="phút"
          />
        </Form.Item>

        <Form.Item
          name={FORM_FIELDS.SEAT_COUNT}
          label={FORM_LABELS[FORM_FIELDS.SEAT_COUNT]}
          rules={FORM_VALIDATIONS[FORM_FIELDS.SEAT_COUNT]}
        >
          <InputNumber
            className="w-full"
            placeholder="Nhập số lượng chỗ"
            precision={0}
            min={1}
          />
        </Form.Item>

        <Form.Item
          name={FORM_FIELDS.DEPARTURE_POINT}
          label={FORM_LABELS[FORM_FIELDS.DEPARTURE_POINT]}
          rules={FORM_VALIDATIONS[FORM_FIELDS.DEPARTURE_POINT]}
        >
          <Select
            placeholder="Chọn điểm khởi hành"
            options={MOCK_DESTINATIONS}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item
          name={FORM_FIELDS.DESTINATION_POINTS}
          label={FORM_LABELS[FORM_FIELDS.DESTINATION_POINTS]}
          rules={FORM_VALIDATIONS[FORM_FIELDS.DESTINATION_POINTS]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn điểm đến"
            options={MOCK_DESTINATIONS}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item
          name={FORM_FIELDS.NUMBER_OF_DAYS}
          label={FORM_LABELS[FORM_FIELDS.NUMBER_OF_DAYS]}
          rules={FORM_VALIDATIONS[FORM_FIELDS.NUMBER_OF_DAYS]}
        >
          <InputNumber
            className="w-full"
            placeholder="Nhập số ngày"
            precision={0}
            min={1}
          />
        </Form.Item>

        <Form.Item
          name={FORM_FIELDS.NUMBER_OF_NIGHTS}
          label={FORM_LABELS[FORM_FIELDS.NUMBER_OF_NIGHTS]}
          rules={FORM_VALIDATIONS[FORM_FIELDS.NUMBER_OF_NIGHTS]}
        >
          <InputNumber
            className="w-full"
            placeholder="Nhập số đêm"
            precision={0}
            min={1}
          />
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-0 md:grid-cols-2 xl:grid-cols-4">
        <Form.Item
          name={FORM_FIELDS.TOUR_TYPE}
          label={FORM_LABELS[FORM_FIELDS.TOUR_TYPE]}
          rules={FORM_VALIDATIONS[FORM_FIELDS.TOUR_TYPE]}
        >
          <Select placeholder="Chọn loại tour" options={TOUR_TYPE_OPTIONS} />
        </Form.Item>

        {tourType === TOUR_TYPE.WEEKLY && (
          <Form.Item
            name={FORM_FIELDS.DEPARTURE_DAY_OF_WEEK}
            label={FORM_LABELS[FORM_FIELDS.DEPARTURE_DAY_OF_WEEK]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.DEPARTURE_DAY_OF_WEEK]}
          >
            <Select
              placeholder="Chọn ngày khởi hành"
              options={DAY_OF_WEEK_OPTIONS}
            />
          </Form.Item>
        )}

        {tourType === TOUR_TYPE.SINGLE_DAY && (
          <Form.Item
            name={FORM_FIELDS.DEPARTURE_DATE}
            label={FORM_LABELS[FORM_FIELDS.DEPARTURE_DATE]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.DEPARTURE_DATE]}
          >
            <DatePicker
              className="w-full"
              placeholder="Chọn ngày khởi hành"
              format="DD/MM/YYYY"
            />
          </Form.Item>
        )}

        {tourType === TOUR_TYPE.MULTI_DAY && (
          <Form.Item
            name={FORM_FIELDS.DEPARTURE_DATES}
            label={FORM_LABELS[FORM_FIELDS.DEPARTURE_DATES]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.DEPARTURE_DATES]}
          >
            <DatePicker
              className="w-full"
              placeholder="Chọn ngày khởi hành"
              format="DD/MM/YYYY"
              multiple
            />
          </Form.Item>
        )}
      </div>
      <section>
        <div className={open ? '' : 'hidden'}>
          <div className="mb-4 grid grid-cols-1 gap-x-5 gap-y-0 md:grid-cols-2 xl:grid-cols-4">
            <Form.Item
              name={FORM_FIELDS.TRANSPORTATION}
              label={FORM_LABELS[FORM_FIELDS.TRANSPORTATION]}
            >
              <Input placeholder="Nhập phương tiện di chuyển" />
            </Form.Item>

            <Form.Item
              name={FORM_FIELDS.SIGHTSEEING}
              label={FORM_LABELS[FORM_FIELDS.SIGHTSEEING]}
            >
              <Input placeholder="Nhập điểm tham quan" />
            </Form.Item>

            <Form.Item
              name={FORM_FIELDS.CUISINE}
              label={FORM_LABELS[FORM_FIELDS.CUISINE]}
            >
              <Input placeholder="Nhập ẩm thực" />
            </Form.Item>

            <Form.Item
              name={FORM_FIELDS.PROMOTIONS}
              label={FORM_LABELS[FORM_FIELDS.PROMOTIONS]}
            >
              <Input placeholder="Nhập ưu đãi" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-0 md:grid-cols-2 xl:grid-cols-4">
            <Form.Item
              name={FORM_FIELDS.BEST_TIME_TO_VISIT}
              label={FORM_LABELS[FORM_FIELDS.BEST_TIME_TO_VISIT]}
            >
              <Input placeholder="Nhập thời điểm tham quan" />
            </Form.Item>

            <Form.Item
              name={FORM_FIELDS.SUITABLE_FOR}
              label={FORM_LABELS[FORM_FIELDS.SUITABLE_FOR]}
            >
              <Input placeholder="Nhập đối tượng thích hợp" />
            </Form.Item>

            <Form.Item
              name={FORM_FIELDS.HOTEL}
              label={FORM_LABELS[FORM_FIELDS.HOTEL]}
            >
              <Input placeholder="Nhập khách sạn" />
            </Form.Item>

            <Form.Item
              name={FORM_FIELDS.NOTE_IDS}
              label={FORM_LABELS[FORM_FIELDS.NOTE_IDS]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn lưu ý"
                options={MOCK_NOTES}
                allowClear
              />
            </Form.Item>
          </div>
        </div>
      </section>
    </section>
  );
};
