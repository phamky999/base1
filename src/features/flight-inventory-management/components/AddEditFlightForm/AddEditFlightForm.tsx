import { AppFieldSet } from '@/components/app-fieldset';
import {
  FLIGHT_STATUS_LABEL,
  FLIGHT_STATUS_OPTION,
} from '@/features/flight-inventory-management/constants';
import { fillArrayWithNumber } from '@/lib/helpers/array';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Popover,
  Row,
  Select,
  TimePicker,
} from 'antd';
import { CircleMinusIcon, PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { type FlightFormValues } from './AddEditFlightForm.schema';

const { Option } = Select;
const { TextArea } = Input;

type AddEditFlightFormProps = {
  id?: string;
};

export const AddEditFlightForm = ({ id }: AddEditFlightFormProps) => {
  const [form] = Form.useForm<FlightFormValues>();
  const [popoverAnchor, setPopoverAnchor] = useState<boolean>(false);

  const onFinish = (values: FlightFormValues) => {
    console.log('Form submitted:', values);
  };

  const sectionCls = 'rounded-xl border bg-muted p-4 shadow-xs';

  const initialValues: Partial<FlightFormValues> = {
    airline: '',
    flightNumber: '',
    status: '',
    plane: '',
    class: '',
    seatTotal: '',
    flightTime: '',
    startPoint: '',
    startDate: '',
    startTime: '',
    endPoint: '',
    endDate: '',
    endTime: '',
    segments: [],
    adultPrice: '',
    childPrice: '',
    infantPrice: '',
    flightRules: [],
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
      scrollToFirstError
    >
      <div className="space-y-4">
        <section className={sectionCls}>
          <h3 className="mb-4 text-base font-semibold">Thông tin chung</h3>

          <Row gutter={16}>
            {/* Hãng hàng không */}
            <Col span={24} lg={8}>
              <Form.Item
                name="airline"
                label="Hãng hàng không"
                rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              >
                <Input placeholder="VD: Vietnam Airlines" />
              </Form.Item>
            </Col>

            {/* Số hiệu */}
            <Col span={12} lg={8}>
              <Form.Item
                name="flightNumber"
                label="Số hiệu"
                rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              >
                <Input placeholder="VD: VN101" />
              </Form.Item>
            </Col>

            {/* Trạng thái */}
            <Col span={12} lg={8}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              >
                <Select placeholder="Chọn trạng thái">
                  {Object.values(FLIGHT_STATUS_OPTION).map(item => (
                    <Option key={item} value={item}>
                      {FLIGHT_STATUS_LABEL[item]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Loại máy bay */}
            <Col span={24} lg={8}>
              <Form.Item
                name="plane"
                label="Loại máy bay"
                rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              >
                <Input placeholder="VD: Airbus A321" />
              </Form.Item>
            </Col>

            {/* Hạng vé */}
            <Col span={12} lg={4}>
              <Form.Item
                name="class"
                label="Hạng vé"
                rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              >
                <Input placeholder="VD: Phổ thông tiết kiệm" />
              </Form.Item>
            </Col>

            {/* Tổng số vé */}
            <Col span={12} lg={4}>
              <Form.Item
                name="seatTotal"
                label="Tổng số vé"
                rules={[
                  { required: true, message: 'Trường này là bắt buộc' },
                  {
                    type: 'number',
                    min: 0,
                    message: 'Phải là số không âm',
                    transform: value => (value ? Number(value) : value),
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  placeholder="Tổng số vé"
                  min={0}
                />
              </Form.Item>
            </Col>

            {/* Thời gian bay */}
            <Col span={24} lg={8}>
              <Form.Item name="flightTime" label="Thời gian bay">
                <Input placeholder="Thời gian bay" />
              </Form.Item>
            </Col>

            {/* Điểm khởi hành */}
            <Col span={24} lg={8}>
              <Form.Item name="startPoint" label="Điểm khởi hành">
                <Input placeholder="Điểm khởi hành" />
              </Form.Item>
            </Col>

            {/* Ngày khởi hành */}
            <Col span={12} lg={8}>
              <Form.Item name="startDate" label="Ngày khởi hành">
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>

            {/* Giờ khởi hành */}
            <Col span={12} lg={8}>
              <Form.Item name="startTime" label="Giờ khởi hành">
                <TimePicker className="w-full" format="HH:mm" />
              </Form.Item>
            </Col>

            {/* Điểm hạ cánh */}
            <Col span={24} lg={8}>
              <Form.Item name="endPoint" label="Điểm hạ cánh">
                <Input placeholder="Điểm hạ cánh" />
              </Form.Item>
            </Col>

            {/* Ngày hạ cánh */}
            <Col span={12} lg={8}>
              <Form.Item name="endDate" label="Ngày hạ cánh">
                <DatePicker className="w-full" />
              </Form.Item>
            </Col>

            {/* Giờ hạ cánh */}
            <Col span={12} lg={8}>
              <Form.Item name="endTime" label="Giờ hạ cánh">
                <TimePicker className="w-full" format="HH:mm" />
              </Form.Item>
            </Col>
          </Row>

          {/* ---- Hành trình phụ (segments) ---- */}
          <Form.List name="segments">
            {(fields, { add, remove }) => (
              <>
                <div className="mt-4 space-y-4">
                  {fields.map(({ key, name, ...restField }, index) => (
                    <AppFieldSet
                      key={key}
                      legend={
                        <div className="flex items-center gap-2">
                          <p>Hành trình {index + 2}</p>
                          <CircleMinusIcon
                            className="size-4 cursor-pointer hover:text-red-500"
                            onClick={() => remove(name)}
                          />
                        </div>
                      }
                    >
                      <Row gutter={[16, 20]} className="pt-2">
                        <Col span={12} lg={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'airline']}
                            label="Hãng hàng không"
                            rules={[
                              {
                                required: true,
                                message: 'Trường này là bắt buộc',
                              },
                            ]}
                          >
                            <Input placeholder="VD: Vietnam Airlines" />
                          </Form.Item>
                        </Col>
                        <Col span={12} lg={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'flightNumber']}
                            label="Số hiệu"
                            rules={[
                              {
                                required: true,
                                message: 'Trường này là bắt buộc',
                              },
                            ]}
                          >
                            <Input placeholder="VD: VN101" />
                          </Form.Item>
                        </Col>
                        <Col span={12} lg={4}>
                          <Form.Item
                            {...restField}
                            name={[name, 'plane']}
                            label="Loại máy bay"
                            rules={[
                              {
                                required: true,
                                message: 'Trường này là bắt buộc',
                              },
                            ]}
                          >
                            <Input placeholder="VD: Airbus A321" />
                          </Form.Item>
                        </Col>
                        <Col span={12} lg={4}>
                          <Form.Item
                            {...restField}
                            name={[name, 'flightTime']}
                            label="Thời gian bay"
                          >
                            <Input placeholder="Thời gian bay" />
                          </Form.Item>
                        </Col>
                        <Col span={24} lg={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'startPoint']}
                            label="Điểm khởi hành"
                          >
                            <Input placeholder="Điểm khởi hành" />
                          </Form.Item>
                        </Col>
                        <Col span={12} lg={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'startDate']}
                            label="Ngày khởi hành"
                          >
                            <DatePicker className="w-full" />
                          </Form.Item>
                        </Col>
                        <Col span={12} lg={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'startTime']}
                            label="Giờ khởi hành"
                          >
                            <TimePicker className="w-full" format="HH:mm" />
                          </Form.Item>
                        </Col>
                        <Col span={24} lg={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'endPoint']}
                            label="Điểm hạ cánh"
                          >
                            <Input placeholder="Điểm hạ cánh" />
                          </Form.Item>
                        </Col>
                        <Col span={12} lg={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'endDate']}
                            label="Ngày hạ cánh"
                          >
                            <DatePicker className="w-full" />
                          </Form.Item>
                        </Col>
                        <Col span={12} lg={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'endTime']}
                            label="Giờ hạ cánh"
                          >
                            <TimePicker className="w-full" format="HH:mm" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </AppFieldSet>
                  ))}
                </div>

                <Button
                  type="dashed"
                  className="mt-4 w-full"
                  onClick={() => add()}
                  icon={<PlusCircleIcon className="size-4" />}
                >
                  Thêm hành trình
                </Button>
              </>
            )}
          </Form.List>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Section: Cấu hình giá                                             */}
        {/* ---------------------------------------------------------------- */}
        <section className={sectionCls}>
          <h3 className="mb-4 text-base font-semibold">Cấu hình giá</h3>

          <Row gutter={[16, 20]}>
            <Col span={24} lg={8}>
              <Form.Item
                name="adultPrice"
                label="Giá vé người lớn"
                rules={[
                  { required: true, message: 'Trường này là bắt buộc' },
                  {
                    type: 'number',
                    min: 0,
                    message: 'Phải là số không âm',
                    transform: value => (value ? Number(value) : value),
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  placeholder="Giá vé người lớn"
                  min={0}
                />
              </Form.Item>
            </Col>

            <Col span={24} lg={8}>
              <Form.Item
                name="childPrice"
                label="Giá vé trẻ em"
                rules={[
                  { required: true, message: 'Trường này là bắt buộc' },
                  {
                    type: 'number',
                    min: 0,
                    message: 'Phải là số không âm',
                    transform: value => (value ? Number(value) : value),
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  placeholder="Giá vé trẻ em"
                  min={0}
                />
              </Form.Item>
            </Col>

            <Col span={24} lg={8}>
              <Form.Item
                name="infantPrice"
                label="Giá vé em bé"
                rules={[
                  { required: true, message: 'Trường này là bắt buộc' },
                  {
                    type: 'number',
                    min: 0,
                    message: 'Phải là số không âm',
                    transform: value => (value ? Number(value) : value),
                  },
                ]}
              >
                <InputNumber
                  className="w-full"
                  placeholder="Giá vé em bé"
                  min={0}
                />
              </Form.Item>
            </Col>
          </Row>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Section: Cấu hình bộ điều kiện                                    */}
        {/* ---------------------------------------------------------------- */}
        <section className={sectionCls}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold">Cấu hình bộ điều kiện</h3>

            <Popover
              content={
                <div className="w-60 lg:w-100">
                  <p className="mb-1 text-sm font-semibold">Chọn mẫu</p>
                  <ul className="custom-scrollbar max-h-60 overflow-y-auto">
                    {fillArrayWithNumber(50).map((_, index) => (
                      <li
                        key={index}
                        title={`Lorem ipsum dolor sit amet consectetur adipisicing elit. ${index + 1}`}
                        className="cursor-pointer truncate rounded p-1 text-sm hover:bg-gray-100"
                        onClick={() => setPopoverAnchor(false)}
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quis asperiores vel accusantium, veritatis laboriosam
                        quam ad, eligendi eum facilis iste mollitia voluptate in
                        minus consequuntur officia, magnam saepe blanditiis?
                        Temporibus. {index + 1}
                      </li>
                    ))}
                  </ul>
                </div>
              }
              title={null}
              trigger="click"
              open={popoverAnchor}
              onOpenChange={visible => setPopoverAnchor(visible)}
              placement="bottomLeft"
            >
              <Button type="default" size="small">
                Dùng mẫu có sẵn
              </Button>
            </Popover>
          </div>

          <Form.List name="flightRules">
            {(fields, { add, remove }) => (
              <>
                <div className="space-y-4">
                  {fields.map(({ key, name, ...restField }, index) => (
                    <AppFieldSet
                      key={key}
                      legend={
                        <div className="flex items-center gap-2">
                          <p>Điều kiện {index + 1}</p>
                          <CircleMinusIcon
                            className="size-4 cursor-pointer hover:text-red-500"
                            onClick={() => remove(name)}
                          />
                        </div>
                      }
                    >
                      <Row gutter={[16, 20]} className="pt-2">
                        <Col span={24}>
                          <Form.Item
                            {...restField}
                            name={[name, 'ruleType']}
                            label="Loại điều kiện"
                          >
                            <Select placeholder="Chọn loại điều kiện">
                              <Option value="basic">DK 1</Option>
                              <Option value="advanced">DK 2</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            {...restField}
                            name={[name, 'ruleDescription']}
                            label="Mô tả điều kiện"
                          >
                            <TextArea rows={4} placeholder="VD: VN101" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </AppFieldSet>
                  ))}
                </div>

                <Button
                  type="dashed"
                  className="mt-4 w-full"
                  onClick={() => add()}
                  icon={<PlusCircleIcon className="size-4" />}
                >
                  Thêm điều kiện
                </Button>
              </>
            )}
          </Form.List>
        </section>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Footer actions                                                       */}
      {/* ------------------------------------------------------------------ */}
      <div className="sticky bottom-0 mt-6 flex items-center justify-between gap-4 bg-(--main-background) py-4">
        <Button type="default" onClick={() => form.resetFields()}>
          Quay lại danh sách
        </Button>
        <Button type="primary" htmlType="submit">
          {id ? 'Cập nhật' : 'Tạo chuyến bay'}
        </Button>
      </div>
    </Form>
  );
};
