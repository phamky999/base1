import { AppFieldSet } from '@/components/app-fieldset';
import { Button } from '@/components/ui/button';
import { GENDER_OPTIONS, PASSENGER_TYPE_OPTIONS } from '@/lib/constants';
import { DEFAULT_DATE_FORMAT } from '@/lib/date/constants';
import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { CircleMinusIcon, PlusCircleIcon } from 'lucide-react';
import {
  FORM_FIELDS,
  FORM_VALIDATIONS,
  PASSENGER_FIELDS,
} from './flight-booking-form.schema';
import { upperCaseValue } from '@/lib/helpers/string';

export const PassengerSection = () => {
  return (
    <div className="card">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-base font-semibold">Thông tin hành khách</h3>
      </div>

      <Form.List name={FORM_FIELDS.PASSENGERS}>
        {(fields, { add, remove }) => (
          <div className="space-y-6">
            {fields.map(({ key, name, ...restField }, idx) => (
              <AppFieldSet
                key={key}
                legend={
                  <div className="flex items-center gap-2">
                    <p>Hành khách {idx + 1}</p>

                    {fields.length > 1 ? (
                      <CircleMinusIcon
                        className="size-4 cursor-pointer hover:text-red-500"
                        onClick={() => remove(name)}
                      />
                    ) : null}
                  </div>
                }
              >
                <Row gutter={20}>
                  <Col span={24} md={6} lg={5}>
                    <Form.Item
                      {...restField}
                      name={[name, PASSENGER_FIELDS.TYPE]}
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
                      {...restField}
                      name={[name, PASSENGER_FIELDS.LAST_NAME]}
                      label="Họ"
                      rules={
                        FORM_VALIDATIONS.passenger[PASSENGER_FIELDS.LAST_NAME]
                      }
                      normalize={upperCaseValue}
                    >
                      <Input placeholder="Họ và tên đệm" />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={6} lg={5}>
                    <Form.Item
                      {...restField}
                      name={[name, PASSENGER_FIELDS.FIRST_NAME]}
                      label="Tên"
                      rules={
                        FORM_VALIDATIONS.passenger[PASSENGER_FIELDS.FIRST_NAME]
                      }
                      normalize={upperCaseValue}
                    >
                      <Input placeholder="Tên" />
                    </Form.Item>
                  </Col>

                  <Col span={24} md={6} lg={5}>
                    <Form.Item
                      {...restField}
                      name={[name, PASSENGER_FIELDS.BIRTHDAY]}
                      label="Ngày sinh"
                    >
                      <DatePicker
                        className="w-full"
                        format={DEFAULT_DATE_FORMAT}
                        placeholder="Ngày sinh"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24} md={6} lg={4}>
                    <Form.Item
                      {...restField}
                      name={[name, PASSENGER_FIELDS.GENDER]}
                      label="Giới tính"
                      rules={
                        FORM_VALIDATIONS.passenger[PASSENGER_FIELDS.GENDER]
                      }
                    >
                      <Select
                        placeholder="Chọn giới tính"
                        options={GENDER_OPTIONS}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={24} md={6} lg={5}>
                    <Form.Item
                      {...restField}
                      name={[name, PASSENGER_FIELDS.DOCUMENT_NUMBER]}
                      label="Số CCCD / Hộ chiếu"
                    >
                      <Input placeholder="Nhập Số CCCD / Hộ chiếu" />
                    </Form.Item>
                  </Col>

                  <Col span={24} md={6} lg={5}>
                    <Form.Item
                      {...restField}
                      name={[name, PASSENGER_FIELDS.DOCUMENT_EXPIRY_DATE]}
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
                      {...restField}
                      name={[name, PASSENGER_FIELDS.DOCUMENT_ISSUING_COUNTRY]}
                      label="Quốc gia cấp"
                    >
                      <Input placeholder="VD: Việt Nam" />
                    </Form.Item>
                  </Col>

                  <Col span={24} md={3} lg={9}>
                    <Form.Item
                      {...restField}
                      name={[name, PASSENGER_FIELDS.DOCUMENT_NATIONALITY]}
                      label="Quốc tịch"
                    >
                      <Input placeholder="VD: Việt Nam" />
                    </Form.Item>
                  </Col>
                </Row>
              </AppFieldSet>
            ))}

            <Button
              type="button"
              variant="outline"
              className="flex w-full items-center border-dashed"
              onClick={() => add()}
            >
              <PlusCircleIcon className="mr-2 size-4" />
              Thêm hành khách
            </Button>
          </div>
        )}
      </Form.List>
    </div>
  );
};
