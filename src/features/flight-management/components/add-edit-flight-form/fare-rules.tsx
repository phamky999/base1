import { AppFieldSet } from '@/components/app-fieldset';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from '@/features/flight-management/components/add-edit-flight-form/add-edit-flight-form.schema';
import { FARE_RULE_TYPE_OPTIONS } from '@/features/flight-management/constants';
import { Col, Form, Input, Row, Select } from 'antd';
import { CircleMinusIcon, PlusCircleIcon } from 'lucide-react';

type FareRulesSectionProps = {
  className?: string;
};

export const FareRulesSection = ({ className }: FareRulesSectionProps) => {
  return (
    <section className={className}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold">Cấu hình bộ điều kiện</h3>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              Dùng mẫu có sẵn
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-62.5 p-0" align="start">
            <Command>
              <CommandInput placeholder="Tìm kiếm" />
              <CommandList>
                <CommandEmpty>Không tìm thấy kết quả</CommandEmpty>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Form.List name={FORM_FIELDS.FARE_RULES}>
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
                  <Row gutter={20} className="pt-2">
                    <Col span={24} xl={8}>
                      <Form.Item
                        {...restField}
                        name={[name, FORM_FIELDS.FARE_RULE_TYPE]}
                        label={FORM_LABELS[FORM_FIELDS.FARE_RULE_TYPE]}
                        rules={FORM_VALIDATIONS[FORM_FIELDS.FARE_RULE_TYPE]}
                      >
                        <Select
                          placeholder={FORM_LABELS[FORM_FIELDS.FARE_RULE_TYPE]}
                          options={FARE_RULE_TYPE_OPTIONS}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24} xl={16}>
                      <Form.Item
                        {...restField}
                        name={[name, FORM_FIELDS.FARE_RULE_TEXT]}
                        label={FORM_LABELS[FORM_FIELDS.FARE_RULE_TEXT]}
                        rules={FORM_VALIDATIONS[FORM_FIELDS.FARE_RULE_TEXT]}
                      >
                        <Input
                          placeholder={FORM_LABELS[FORM_FIELDS.FARE_RULE_TEXT]}
                        />
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
  );
};
