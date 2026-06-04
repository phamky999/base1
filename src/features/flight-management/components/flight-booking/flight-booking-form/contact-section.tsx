import { GENDER_OPTIONS } from '@/lib/constants';
import { Col, Form, Input, Row, Select } from 'antd';
import {
  CONTACT_FIELDS,
  FORM_FIELDS,
  FORM_VALIDATIONS,
} from './flight-booking-form.schema';

export const ContactSection = () => {
  return (
    <div className="card">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-base font-semibold"> Thông tin liên hệ</h3>
      </div>
      <Row gutter={[16, 12]}>
        <Col span={24} md={8}>
          <Form.Item
            name={[FORM_FIELDS.CONTACT_INFO, CONTACT_FIELDS.GENDER]}
            label="Giới tính"
            rules={FORM_VALIDATIONS.contact[CONTACT_FIELDS.GENDER]}
          >
            <Select placeholder="Giới tính" options={GENDER_OPTIONS} />
          </Form.Item>
        </Col>
        <Col span={24} md={8}>
          <Form.Item
            name={[FORM_FIELDS.CONTACT_INFO, CONTACT_FIELDS.LAST_NAME]}
            label="Họ"
            rules={FORM_VALIDATIONS.contact[CONTACT_FIELDS.LAST_NAME]}
          >
            <Input placeholder="Họ và tên đệm" />
          </Form.Item>
        </Col>
        <Col span={24} md={8}>
          <Form.Item
            name={[FORM_FIELDS.CONTACT_INFO, CONTACT_FIELDS.FIRST_NAME]}
            label="Tên"
            rules={FORM_VALIDATIONS.contact[CONTACT_FIELDS.FIRST_NAME]}
          >
            <Input placeholder="Tên" />
          </Form.Item>
        </Col>

        <Col span={24} md={8}>
          <Form.Item
            name={[FORM_FIELDS.CONTACT_INFO, CONTACT_FIELDS.PHONE]}
            label="Số điện thoại"
            rules={FORM_VALIDATIONS.contact[CONTACT_FIELDS.PHONE]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
        </Col>
        <Col span={24} md={8}>
          <Form.Item
            name={[FORM_FIELDS.CONTACT_INFO, CONTACT_FIELDS.EMAIL]}
            label="Email"
            rules={FORM_VALIDATIONS.contact[CONTACT_FIELDS.EMAIL]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>

        <Col span={24} md={8}>
          <Form.Item
            name={[FORM_FIELDS.CONTACT_INFO, CONTACT_FIELDS.ADDRESS]}
            label="Địa chỉ"
          >
            <Input placeholder="Địa chỉ" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};
