import { AppCard } from '@/components/app-ui/app-card';
import { Button } from '@/components/ui/button';
import { FARE_RULE_TYPE_OPTIONS } from '@/features/flight-management/constants';
import { Form, Input, Select } from 'antd';
import { PlusCircleIcon, Trash2Icon } from 'lucide-react';
import {
  FORM_LABELS,
  FORM_VALIDATIONS,
  RULE_FIELDS,
} from './ticket-condition-form.schema';

type RulesListProps = {
  fields: { key: number; name: number }[];
  add: () => void;
  remove: (index: number | number[]) => void;
};

export const RulesList = ({ fields, add, remove }: RulesListProps) => (
  <>
    <div className="space-y-4">
      {fields.map(({ key, name, ...restField }, index) => (
        <AppCard
          key={key}
          title={`Điều kiện ${index + 1}`}
          headerAction={
            fields.length > 1 ? (
              <Button
                variant="destructive"
                size="icon-sm"
                onClick={() => remove(name)}
              >
                <Trash2Icon />
              </Button>
            ) : null
          }
        >
          <div className="popup-container grid gap-x-4 sm:grid-cols-2">
            <Form.Item
              {...restField}
              name={[name, RULE_FIELDS.TYPE]}
              label={FORM_LABELS[RULE_FIELDS.TYPE]}
              rules={FORM_VALIDATIONS[RULE_FIELDS.TYPE]}
            >
              <Select
                options={FARE_RULE_TYPE_OPTIONS}
                placeholder={FORM_LABELS[RULE_FIELDS.TYPE]}
                classNames={{
                  popup: {
                    root: 'pointer-events-auto',
                  },
                }}
              />
            </Form.Item>

            <Form.Item
              {...restField}
              name={[name, RULE_FIELDS.TEXT]}
              label={FORM_LABELS[RULE_FIELDS.TEXT]}
              rules={FORM_VALIDATIONS[RULE_FIELDS.TEXT]}
            >
              <Input placeholder={FORM_LABELS[RULE_FIELDS.TEXT]} />
            </Form.Item>
          </div>
        </AppCard>
      ))}
    </div>

    <Button
      type="button"
      variant={'outline'}
      className="w-full border-dashed"
      onClick={() => add()}
    >
      <PlusCircleIcon className="mr-2 size-4" /> Thêm điều kiện
    </Button>
  </>
);
