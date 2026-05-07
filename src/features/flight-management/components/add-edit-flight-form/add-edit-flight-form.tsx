import { AppFieldSet } from '@/components/app-fieldset';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  FLIGHT_STATUS_LABEL,
  FLIGHT_STATUS_OPTION,
} from '@/features/flight-management/constants';
import { fillArrayWithNumber } from '@/lib/helpers/array';
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  TimePicker,
} from 'antd';
import { CircleMinusIcon, PlusCircleIcon } from 'lucide-react';
import { type FlightFormValues } from './add-edit-flight-form.schema';

type AddEditFlightFormProps = {
  id?: string;
};

export const AddEditFlightForm = ({ id }: AddEditFlightFormProps) => {
  const [form] = Form.useForm<FlightFormValues>();

  const onFinish = (values: FlightFormValues) => {
    console.log('Form submitted:', values);
  };

  const sectionCls = 'rounded-xl border bg-card p-4 shadow-sm';

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      scrollToFirstError
      initialValues={{
        segments: [undefined],
      }}
    >
      <div className="space-y-4">
        <section className={sectionCls}>
          <h3 className="mb-4 text-base font-semibold">Thông tin chung</h3>

          <Row gutter={16}>
            {/* Hạng vé */}
            <Col span={24} lg={8}>
              <Form.Item
                name="class"
                label="Hạng vé"
                rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              >
                <Input placeholder="VD: Phổ thông tiết kiệm" />
              </Form.Item>
            </Col>

            {/* Tổng số vé */}
            <Col span={24} lg={8}>
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

            {/* Trạng thái */}
            <Col span={12} lg={8}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true, message: 'Trường này là bắt buộc' }]}
              >
                <Select
                  placeholder="Chọn trạng thái"
                  options={Object.values(FLIGHT_STATUS_OPTION).map(item => ({
                    value: item,
                    label: FLIGHT_STATUS_LABEL[item],
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* ---- Hành trình phụ (segments) ---- */}
          <Form.List name="segments">
            {(fields, { add, remove }) => (
              <>
                <div className="mb-4 space-y-4">
                  {fields.map(({ key, name, ...restField }, index) => (
                    <AppFieldSet
                      key={key}
                      legend={
                        <div className="flex items-center gap-2">
                          <p>Hành trình {index + 1}</p>
                          {fields.length > 1 ? (
                            <CircleMinusIcon
                              className="size-4 cursor-pointer hover:text-red-500"
                              onClick={() => remove(name)}
                            />
                          ) : null}
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
                  type="button"
                  variant={'outline'}
                  className="w-full border-dashed"
                  onClick={() => add()}
                >
                  <PlusCircleIcon className="size-4" /> Thêm hành trình
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

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  Dùng mẫu có sẵn
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Tìm kiếm" />
                  <CommandList>
                    <CommandEmpty>Không tìm thấy kết quả</CommandEmpty>
                    <CommandGroup>
                      {fillArrayWithNumber(10).map(option => {
                        return (
                          <CommandItem
                            key={`Option ${option + 1}`}
                            onSelect={() => {
                              console.log('click', option);
                            }}
                          >
                            <span>{`Option ${option + 1}`}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* <Popover
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
            </Popover> */}
          </div>

          <Form.List name="flightRules">
            {(fields, { add, remove }) => (
              <>
                <div className="mb-4 space-y-4">
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
                        <Col span={24} lg={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'ruleType']}
                            label="Loại điều kiện"
                          >
                            <Select
                              placeholder="Chọn loại điều kiện"
                              options={[
                                {
                                  value: 'basic',
                                  label: 'DK 1',
                                },
                                {
                                  value: 'advanced',
                                  label: 'DK 2',
                                },
                              ]}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={24} lg={16}>
                          <Form.Item
                            {...restField}
                            name={[name, 'ruleDescription']}
                            label="Mô tả điều kiện"
                          >
                            <Input placeholder="VD: VN101" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </AppFieldSet>
                  ))}
                </div>

                <Button
                  type="button"
                  variant={'outline'}
                  className="w-full border-dashed"
                  onClick={() => add()}
                >
                  <PlusCircleIcon className="size-4" /> Thêm điều kiện
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
        <Button
          type="button"
          variant={'outline'}
          onClick={() => form.resetFields()}
        >
          Quay lại danh sách
        </Button>
        <Button variant={'default'} type="submit">
          {id ? 'Cập nhật' : 'Tạo chuyến bay'}
        </Button>
      </div>
    </Form>
  );
};
