import { AppFieldSet } from '@/components/app-fieldset';
import { AppInputNumber } from '@/components/app-input-number';
import { Button } from '@/components/ui/button';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from '@/features/flight-management/components/add-edit-flight-form/add-edit-flight-form.schema';
import { AirAutocomplete } from '@/features/flight-management/components/add-edit-flight-form/air-autocomplete';
import {
  FLIGHT_ITINERARY_TYPE,
  FLIGHT_ITINERARY_TYPE_OPTIONS,
} from '@/features/flight-management/constants';
import {
  DEFAULT_DATE_TIME_FORMAT,
  DEFAULT_TIME_FORMAT,
} from '@/lib/date/constants';
import { startAndEndDateValidator } from '@/lib/date/helpers';
import { upperCaseValue } from '@/lib/helpers/string';
import type { ValidatorRule } from '@rc-component/form/lib/interface';
import { Col, DatePicker, Form, Input, Radio, Row } from 'antd';
import type { Rule } from 'antd/es/form';
import { CircleMinusIcon, PlusCircleIcon } from 'lucide-react';

type SegmentsSectionProps = {
  className?: string;
};

export const SegmentsSection = ({ className }: SegmentsSectionProps) => {
  const form = Form.useFormInstance();

  const itineraryTypeValueWatched = Form.useWatch(
    FORM_FIELDS.ITINERARY_TYPE,
    form
  );

  const handleGetSegmentFields = (renderType: 'DEPARTURE' | 'RETURN') => {
    const formFieldName =
      renderType === 'DEPARTURE'
        ? FORM_FIELDS.DEPARTURE_SEGMENTS
        : FORM_FIELDS.RETURN_SEGMENTS;

    return (
      <>
        <p className="mb-2">
          Danh sách{' '}
          {itineraryTypeValueWatched === FLIGHT_ITINERARY_TYPE.ROUND_TRIP
            ? renderType === 'DEPARTURE'
              ? 'chiều đi'
              : 'chiều về'
            : 'hành trình'}
        </p>
        <Form.List
          name={formFieldName}
          rules={FORM_VALIDATIONS[formFieldName] as ValidatorRule[]}
        >
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
                    <Row gutter={20} className="pt-2">
                      <Col span={24} md={12} xl={6}>
                        <Form.Item
                          {...restField}
                          name={[name, FORM_FIELDS.SEGMENT_AIRLINE_CODE]}
                          label={FORM_LABELS[FORM_FIELDS.SEGMENT_AIRLINE_CODE]}
                          rules={
                            FORM_VALIDATIONS[FORM_FIELDS.SEGMENT_AIRLINE_CODE]
                          }
                          normalize={upperCaseValue}
                        >
                          <Input
                            placeholder="VD: VN"
                            onChange={() => {
                              form.setFieldValue(
                                [
                                  formFieldName,
                                  name,
                                  FORM_FIELDS.SEGMENT_AIRLINE_CODE_AUTO_FILLED,
                                ],
                                false
                              );
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24} md={12} xl={6}>
                        <Form.Item
                          {...restField}
                          name={[name, FORM_FIELDS.SEGMENT_FLIGHT_NUMBER]}
                          label={FORM_LABELS[FORM_FIELDS.SEGMENT_FLIGHT_NUMBER]}
                          rules={
                            FORM_VALIDATIONS[FORM_FIELDS.SEGMENT_FLIGHT_NUMBER]
                          }
                          normalize={upperCaseValue}
                        >
                          <Input placeholder="VD: VN101" />
                        </Form.Item>
                      </Col>

                      <Col span={24} md={12} xl={6}>
                        <Form.Item
                          {...restField}
                          name={[name, FORM_FIELDS.SEGMENT_SEAT_CLASS]}
                          label={FORM_LABELS[FORM_FIELDS.SEGMENT_SEAT_CLASS]}
                          rules={
                            FORM_VALIDATIONS[FORM_FIELDS.SEGMENT_SEAT_CLASS]
                          }
                        >
                          <Input
                            placeholder={
                              FORM_LABELS[FORM_FIELDS.SEGMENT_SEAT_CLASS]
                            }
                          />
                        </Form.Item>
                      </Col>

                      <Col span={24} md={12} xl={6}>
                        <Form.Item
                          {...restField}
                          name={[name, FORM_FIELDS.SEGMENT_PLANE]}
                          label={FORM_LABELS[FORM_FIELDS.SEGMENT_PLANE]}
                          rules={FORM_VALIDATIONS[FORM_FIELDS.SEGMENT_PLANE]}
                        >
                          <Input
                            placeholder={FORM_LABELS[FORM_FIELDS.SEGMENT_PLANE]}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={24} md={12} xl={5}>
                        <AirAutocomplete
                          name={[name, FORM_FIELDS.SEGMENT_START_POINT]}
                          label={FORM_LABELS[FORM_FIELDS.SEGMENT_START_POINT]}
                          rules={
                            FORM_VALIDATIONS[FORM_FIELDS.SEGMENT_START_POINT]
                          }
                        />
                      </Col>

                      <Col span={24} md={12} xl={5}>
                        <Form.Item
                          {...restField}
                          name={[name, FORM_FIELDS.SEGMENT_START_DATE]}
                          label={FORM_LABELS[FORM_FIELDS.SEGMENT_START_DATE]}
                          rules={[
                            ...(FORM_VALIDATIONS[
                              FORM_FIELDS.SEGMENT_START_DATE
                            ] ?? []),
                            ...[
                              startAndEndDateValidator({
                                comparisonFieldName: [
                                  formFieldName,
                                  name,
                                  FORM_FIELDS.SEGMENT_END_DATE,
                                ],
                                currentFieldType: 'START_DATE',
                                customErrorMessage:
                                  'Thời gian khởi hành phải nhỏ hơn thời gian hạ cánh',
                              }) as Rule,
                            ],
                          ]}
                        >
                          <DatePicker
                            className="w-full"
                            placeholder={
                              FORM_LABELS[FORM_FIELDS.SEGMENT_START_DATE]
                            }
                            format={DEFAULT_DATE_TIME_FORMAT}
                            showTime={{ format: DEFAULT_TIME_FORMAT }}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={24} md={12} xl={5}>
                        <AirAutocomplete
                          name={[name, FORM_FIELDS.SEGMENT_END_POINT]}
                          label={FORM_LABELS[FORM_FIELDS.SEGMENT_END_POINT]}
                          rules={
                            FORM_VALIDATIONS[FORM_FIELDS.SEGMENT_END_POINT]
                          }
                        />
                      </Col>

                      <Col span={24} md={12} xl={5}>
                        <Form.Item
                          {...restField}
                          name={[name, FORM_FIELDS.SEGMENT_END_DATE]}
                          label={FORM_LABELS[FORM_FIELDS.SEGMENT_END_DATE]}
                          rules={[
                            ...(FORM_VALIDATIONS[
                              FORM_FIELDS.SEGMENT_END_DATE
                            ] ?? []),
                            ...[
                              startAndEndDateValidator({
                                comparisonFieldName: [
                                  formFieldName,
                                  name,
                                  FORM_FIELDS.SEGMENT_START_DATE,
                                ],
                                currentFieldType: 'END_DATE',
                                customErrorMessage:
                                  'Thời gian hạ cánh phải lớn hơn thời gian khởi hành',
                              }) as Rule,
                            ],
                          ]}
                        >
                          <DatePicker
                            className="w-full"
                            placeholder={
                              FORM_LABELS[FORM_FIELDS.SEGMENT_END_DATE]
                            }
                            format={DEFAULT_DATE_TIME_FORMAT}
                            showTime={{ format: DEFAULT_TIME_FORMAT }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24} xl={4}>
                        <Form.Item
                          {...restField}
                          name={[name, FORM_FIELDS.SEGMENT_DURATION]}
                          label={FORM_LABELS[FORM_FIELDS.SEGMENT_DURATION]}
                          rules={FORM_VALIDATIONS[FORM_FIELDS.SEGMENT_DURATION]}
                        >
                          <AppInputNumber
                            placeholder={
                              FORM_LABELS[FORM_FIELDS.SEGMENT_DURATION]
                            }
                            className="w-full"
                            precision={0}
                            min={1}
                            suffix="phút"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      className="hidden"
                      name={[
                        name,
                        FORM_FIELDS.SEGMENT_AIRLINE_CODE_AUTO_FILLED,
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </AppFieldSet>
                ))}
              </div>

              <Button
                type="button"
                variant={'outline'}
                className="w-full border-dashed"
                onClick={() =>
                  add({
                    [FORM_FIELDS.SEGMENT_AIRLINE_CODE]: form.getFieldValue(
                      FORM_FIELDS.AIRLINE_CODE
                    ),

                    [FORM_FIELDS.SEGMENT_AIRLINE_CODE_AUTO_FILLED]: true,
                  })
                }
              >
                <PlusCircleIcon className="mr-2 size-4" /> Thêm hành trình
              </Button>
            </>
          )}
        </Form.List>
      </>
    );
  };

  return (
    <section className={className}>
      <h3 className="mb-4 text-base font-semibold">Hành trình</h3>

      <Form.Item
        name={FORM_FIELDS.ITINERARY_TYPE}
        label="Loại hành trình"
        rules={FORM_VALIDATIONS[FORM_FIELDS.ITINERARY_TYPE]}
      >
        <Radio.Group
          onChange={() => {
            form.setFieldValue(FORM_FIELDS.RETURN_SEGMENTS, [
              {
                [FORM_FIELDS.SEGMENT_AIRLINE_CODE_AUTO_FILLED]: true,
              },
            ]);
          }}
          options={FLIGHT_ITINERARY_TYPE_OPTIONS}
          defaultValue={FLIGHT_ITINERARY_TYPE.ONE_WAY}
        />
      </Form.Item>

      {handleGetSegmentFields('DEPARTURE')}

      {itineraryTypeValueWatched === FLIGHT_ITINERARY_TYPE.ROUND_TRIP ? (
        <div className="mt-4">{handleGetSegmentFields('RETURN')}</div>
      ) : null}
    </section>
  );
};
