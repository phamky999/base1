import { AppCard } from '@/components/app-ui/app-card';
import { Button } from '@/components/ui/button';
import {
  FORM_VALIDATIONS,
  PASSENGER_FIELDS,
} from '@/features/flight-management/components/flight-booking/flight-booking-form/flight-booking-form.schema';
import { GENDER_OPTIONS, PASSENGER_TYPE_OPTIONS } from '@/lib/constants';
import { DEFAULT_DATE_FORMAT } from '@/lib/date/constants';
import { upperCaseValue } from '@/lib/helpers/string';
import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { ChevronDownIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

type PassengerItemProps = {
  fieldName: number;
  index: number;
  total: number;
  remove: (index: number) => void;
};

export const PassengerItem = ({
  fieldName,
  index,
  total,
  remove,
}: PassengerItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppCard
      title={`Hành khách ${index + 1}`}
      headerAction={
        <>
          {total > 1 ? (
            <Button
              variant="destructive"
              size="icon-sm"
              onClick={() => remove(fieldName)}
            >
              <Trash2Icon />
            </Button>
          ) : null}
          <Button
            variant="outline"
            size="icon-sm"
            type="button"
            onClick={() => setIsOpen(prev => !prev)}
          >
            <ChevronDownIcon
              className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </Button>
        </>
      }
    >
      <Row gutter={20}>
        <Col span={24} md={12} lg={5}>
          <Form.Item
            name={[fieldName, PASSENGER_FIELDS.TYPE]}
            label="Loại hành khách"
            rules={FORM_VALIDATIONS.passenger[PASSENGER_FIELDS.TYPE]}
          >
            <Select
              placeholder="Chọn loại khách"
              options={PASSENGER_TYPE_OPTIONS}
            />
          </Form.Item>
        </Col>

        <Col span={24} md={12} lg={5}>
          <Form.Item
            name={[fieldName, PASSENGER_FIELDS.GENDER]}
            label="Giới tính"
            rules={FORM_VALIDATIONS.passenger[PASSENGER_FIELDS.GENDER]}
          >
            <Select placeholder="Chọn giới tính" options={GENDER_OPTIONS} />
          </Form.Item>
        </Col>

        <Col span={24} md={12} lg={5}>
          <Form.Item
            name={[fieldName, PASSENGER_FIELDS.LAST_NAME]}
            label="Họ"
            rules={FORM_VALIDATIONS.passenger[PASSENGER_FIELDS.LAST_NAME]}
            normalize={upperCaseValue}
          >
            <Input placeholder="VD: NGUYEN" />
          </Form.Item>
        </Col>
        <Col span={24} md={12} lg={5}>
          <Form.Item
            name={[fieldName, PASSENGER_FIELDS.FIRST_NAME]}
            label="Tên"
            rules={FORM_VALIDATIONS.passenger[PASSENGER_FIELDS.FIRST_NAME]}
            normalize={upperCaseValue}
          >
            <Input placeholder="VD: VAN MINH" />
          </Form.Item>
        </Col>

        <Col span={24} md={24} lg={4}>
          <Form.Item
            name={[fieldName, PASSENGER_FIELDS.BIRTHDAY]}
            label="Ngày sinh"
          >
            <DatePicker
              className="w-full"
              format={DEFAULT_DATE_FORMAT}
              placeholder="Ngày sinh"
            />
          </Form.Item>
        </Col>
      </Row>

      <div className={isOpen ? '' : 'hidden'}>
        <Row gutter={20}>
          <Col span={24} md={12} lg={5}>
            <Form.Item
              name={[fieldName, PASSENGER_FIELDS.DOCUMENT_NUMBER]}
              label="Số CCCD / Hộ chiếu"
            >
              <Input placeholder="Nhập Số CCCD / Hộ chiếu" />
            </Form.Item>
          </Col>

          <Col span={24} md={12} lg={5}>
            <Form.Item
              name={[fieldName, PASSENGER_FIELDS.DOCUMENT_EXPIRY_DATE]}
              label="Ngày hết hạn"
            >
              <DatePicker
                className="w-full"
                format={DEFAULT_DATE_FORMAT}
                placeholder="Ngày hết hạn"
              />
            </Form.Item>
          </Col>

          <Col span={24} md={12} lg={5}>
            <Form.Item
              name={[fieldName, PASSENGER_FIELDS.DOCUMENT_ISSUING_COUNTRY]}
              label="Quốc gia cấp"
            >
              <Input placeholder="VD: Việt Nam" />
            </Form.Item>
          </Col>

          <Col span={24} md={12} lg={9}>
            <Form.Item
              name={[fieldName, PASSENGER_FIELDS.DOCUMENT_NATIONALITY]}
              label="Quốc tịch"
            >
              <Input placeholder="VD: Việt Nam" />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </AppCard>
  );
};
