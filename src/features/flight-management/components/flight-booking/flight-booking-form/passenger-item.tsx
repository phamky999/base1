import { AppFieldSet } from '@/components/app-fieldset';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  FORM_VALIDATIONS,
  PASSENGER_FIELDS,
} from '@/features/flight-management/components/flight-booking/flight-booking-form/flight-booking-form.schema';
import { GENDER_OPTIONS, PASSENGER_TYPE_OPTIONS } from '@/lib/constants';
import { DEFAULT_DATE_FORMAT } from '@/lib/date/constants';
import { upperCaseValue } from '@/lib/helpers/string';
import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { MaximizeIcon, MinimizeIcon, Trash2Icon } from 'lucide-react';
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
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <AppFieldSet
        title={`Hành khách ${index + 1}`}
        headerAction={
          <>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="icon-sm">
                {isOpen ? <MinimizeIcon /> : <MaximizeIcon />}
              </Button>
            </CollapsibleTrigger>
            {total > 1 ? (
              <Button
                variant="destructive"
                size="icon-sm"
                onClick={() => remove(fieldName)}
              >
                <Trash2Icon />
              </Button>
            ) : null}
          </>
        }
      >
        <Row gutter={20}>
          <Col span={24} md={6} lg={5}>
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

          <Col span={24} md={6} lg={5}>
            <Form.Item
              name={[fieldName, PASSENGER_FIELDS.GENDER]}
              label="Giới tính"
              rules={FORM_VALIDATIONS.passenger[PASSENGER_FIELDS.GENDER]}
            >
              <Select placeholder="Chọn giới tính" options={GENDER_OPTIONS} />
            </Form.Item>
          </Col>

          <Col span={24} md={6} lg={5}>
            <Form.Item
              name={[fieldName, PASSENGER_FIELDS.LAST_NAME]}
              label="Họ và tên đệm"
              rules={FORM_VALIDATIONS.passenger[PASSENGER_FIELDS.LAST_NAME]}
              normalize={upperCaseValue}
            >
              <Input placeholder="VD: NGUYEN VAN" />
            </Form.Item>
          </Col>
          <Col span={24} md={6} lg={5}>
            <Form.Item
              name={[fieldName, PASSENGER_FIELDS.FIRST_NAME]}
              label="Tên"
              rules={FORM_VALIDATIONS.passenger[PASSENGER_FIELDS.FIRST_NAME]}
              normalize={upperCaseValue}
            >
              <Input placeholder="VD: MINH" />
            </Form.Item>
          </Col>

          <Col span={24} md={6} lg={4}>
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
        <CollapsibleContent>
          <Row gutter={20}>
            <Col span={24} md={6} lg={5}>
              <Form.Item
                name={[fieldName, PASSENGER_FIELDS.DOCUMENT_NUMBER]}
                label="Số CCCD / Hộ chiếu"
              >
                <Input placeholder="Nhập Số CCCD / Hộ chiếu" />
              </Form.Item>
            </Col>

            <Col span={24} md={6} lg={5}>
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

            <Col span={24} md={3} lg={5}>
              <Form.Item
                name={[fieldName, PASSENGER_FIELDS.DOCUMENT_ISSUING_COUNTRY]}
                label="Quốc gia cấp"
              >
                <Input placeholder="VD: Việt Nam" />
              </Form.Item>
            </Col>

            <Col span={24} md={3} lg={9}>
              <Form.Item
                name={[fieldName, PASSENGER_FIELDS.DOCUMENT_NATIONALITY]}
                label="Quốc tịch"
              >
                <Input placeholder="VD: Việt Nam" />
              </Form.Item>
            </Col>
          </Row>
        </CollapsibleContent>
      </AppFieldSet>
    </Collapsible>
  );
};
