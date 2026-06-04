import { Button } from '@/components/ui/button';
import { PassengerItem } from '@/features/flight-management/components/flight-booking/flight-booking-form/passenger-item';
import { GENDER, PASSENGER_TYPE } from '@/lib/constants';
import { Form } from 'antd';
import { PlusCircleIcon } from 'lucide-react';
import { FORM_FIELDS, PASSENGER_FIELDS } from './flight-booking-form.schema';

export const PassengerSection = () => {
  return (
    <div className="card">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-base font-semibold">Thông tin hành khách</h3>
      </div>

      <Form.List name={FORM_FIELDS.PASSENGERS}>
        {(fields, { add, remove }) => (
          <div className="space-y-6">
            {fields.map((field, idx) => (
              <PassengerItem
                key={field.key}
                fieldName={field.name}
                index={idx}
                total={fields.length}
                remove={remove}
              />
            ))}

            <Button
              type="button"
              variant="outline"
              className="flex w-full items-center border-dashed"
              onClick={() =>
                add({
                  [PASSENGER_FIELDS.TYPE]: PASSENGER_TYPE.ADULT,
                  [PASSENGER_FIELDS.GENDER]: GENDER.MALE,
                })
              }
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
