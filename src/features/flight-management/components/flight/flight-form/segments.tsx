import { Button } from '@/components/ui/button';
import { SegmentItem } from './segment-item';
import {
  FORM_FIELDS,
  FORM_VALIDATIONS,
  SEGMENT_FIELDS,
} from './flight-form.schema';
import dayjs from '@/lib/date/dayjs-config';
import { Form, Radio } from 'antd';
import type { FormInstance } from 'antd';
import type { ValidatorRule } from '@rc-component/form/lib/interface';
import type { Dayjs } from 'dayjs';
import { PlusCircleIcon } from 'lucide-react';
import { useCallback } from 'react';
import {
  FLIGHT_ITINERARY_TYPE,
  FLIGHT_ITINERARY_TYPE_OPTIONS,
} from '@/features/flight-management/constants';

type SegmentListSectionProps = {
  form: FormInstance;
  fieldName: string;
  title: string;
  isCreate?: boolean;
};

type SegmentsSectionProps = {
  className?: string;
  isCreate?: boolean;
};

const buildNewSegmentPayload = ({
  form,
  fieldName,
}: {
  form: FormInstance;
  fieldName: string;
}) => {
  const currentSegments = form.getFieldValue(fieldName) || [];

  let baseDate: Dayjs | undefined;

  for (let i = currentSegments.length - 1; i >= 0; i--) {
    const segment = currentSegments[i];

    if (!segment) continue;

    const endDate = segment[SEGMENT_FIELDS.END_DATE];

    const startDate = segment[SEGMENT_FIELDS.START_DATE];

    if (dayjs.isDayjs(endDate)) {
      baseDate = endDate;
      break;
    }

    if (dayjs.isDayjs(startDate)) {
      baseDate = startDate;
      break;
    }
  }

  const payload: Record<string, unknown> = {
    [SEGMENT_FIELDS.AIRLINE_CODE]: form.getFieldValue(FORM_FIELDS.AIRLINE_CODE),
  };

  if (baseDate) {
    const nextStartDate = baseDate.add(3, 'hour');

    payload[SEGMENT_FIELDS.START_DATE] = nextStartDate;

    payload[SEGMENT_FIELDS.END_DATE] = nextStartDate.add(3, 'hour');
  }

  return payload;
};

export const SegmentListSection = ({
  form,
  fieldName,
  title,
  isCreate,
}: SegmentListSectionProps) => {
  const handleAddSegment = useCallback(
    (add: (defaultValue?: unknown) => void) => {
      add(
        buildNewSegmentPayload({
          form,
          fieldName,
        })
      );
    },
    [fieldName, form]
  );

  return (
    <>
      <p className="mb-2">{title}</p>

      <Form.List
        name={fieldName}
        rules={FORM_VALIDATIONS[fieldName] as ValidatorRule[]}
      >
        {(fields, { add, remove }) => {
          return (
            <>
              <div className="mb-4 space-y-4">
                {fields.map(({ key, name }, index) => (
                  <SegmentItem
                    key={key}
                    form={form}
                    fieldKey={fieldName}
                    fieldName={name}
                    index={index}
                    total={fields.length}
                    remove={remove}
                    isCreate={isCreate}
                  />
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border-dashed"
                onClick={() => handleAddSegment(add)}
              >
                <PlusCircleIcon className="mr-2 size-4" />
                Thêm hành trình
              </Button>
            </>
          );
        }}
      </Form.List>
    </>
  );
};

export const SegmentsSection = ({
  className,
  isCreate,
}: SegmentsSectionProps) => {
  const form = Form.useFormInstance();

  const itineraryType = Form.useWatch(FORM_FIELDS.ITINERARY_TYPE, form);

  return (
    <section className={className}>
      <h3 className="mb-4 text-base font-semibold">Hành trình</h3>

      <Form.Item
        name={FORM_FIELDS.ITINERARY_TYPE}
        label="Loại hành trình"
        rules={FORM_VALIDATIONS[FORM_FIELDS.ITINERARY_TYPE]}
        initialValue={FLIGHT_ITINERARY_TYPE.ROUND_TRIP}
      >
        <Radio.Group
          options={FLIGHT_ITINERARY_TYPE_OPTIONS}
          onChange={() => {
            form.setFieldValue(FORM_FIELDS.RETURN_SEGMENTS, [
              {
                [SEGMENT_FIELDS.AIRLINE_CODE]: form.getFieldValue(
                  FORM_FIELDS.AIRLINE_CODE
                ),
              },
            ]);
          }}
        />
      </Form.Item>

      <SegmentListSection
        form={form}
        fieldName={FORM_FIELDS.DEPARTURE_SEGMENTS}
        title={
          itineraryType === FLIGHT_ITINERARY_TYPE.ROUND_TRIP
            ? 'Chiều đi'
            : 'Chặng bay'
        }
        isCreate={isCreate}
      />

      {itineraryType === FLIGHT_ITINERARY_TYPE.ROUND_TRIP ? (
        <div className="mt-4">
          <SegmentListSection
            form={form}
            fieldName={FORM_FIELDS.RETURN_SEGMENTS}
            title="Chiều về"
            isCreate={isCreate}
          />
        </div>
      ) : null}
    </section>
  );
};
