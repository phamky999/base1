import { AppCard } from '@/components/app-ui/app-card';
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
  FARE_RULE_FIELD_LABELS,
  FARE_RULE_FIELD_VALIDATIONS,
  FARE_RULE_FIELDS,
  FORM_FIELDS,
} from '@/features/flight-management/components/flight/flight-form/flight-form.schema';
import { FARE_RULE_TYPE_OPTIONS } from '@/features/flight-management/constants';
import {
  useGetFareRulesQuery,
  useLazyGetFareRuleDetailQuery,
} from '@/features/flight-management/query';
import { Col, Form, Input, Row, Select, Spin } from 'antd';
import { PlusCircleIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

type FareRulesSectionProps = {
  className?: string;
};

export const FareRulesSection = ({ className }: FareRulesSectionProps) => {
  const form = Form.useFormInstance();

  const { data } = useGetFareRulesQuery();
  const [triggerGetFareRuleDetail, { isFetching }] =
    useLazyGetFareRuleDetailQuery();

  const fareRules = data?.data || [];

  const handleSelectedTemplate = async (id: string) => {
    try {
      const { data } = await triggerGetFareRuleDetail(id);

      const currentFareRules = form.getFieldValue(FORM_FIELDS.FARE_RULES) || [];

      const allFareRules = [...currentFareRules, ...(data?.data?.rules || [])];
      form.setFieldValue(FORM_FIELDS.FARE_RULES, allFareRules);
      toast.success('Áp dụng mẫu thành công');
    } catch (e) {
      console.error('Faile to load fare rule', e);
    }
  };

  return (
    <Spin spinning={isFetching}>
      <div className={className}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold">Cấu hình bộ điều kiện</h3>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Dùng mẫu có sẵn
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <Command>
                <CommandInput placeholder="Tìm kiếm" />
                <CommandList>
                  <CommandEmpty>Không tìm thấy kết quả</CommandEmpty>
                  {!!fareRules?.length && (
                    <CommandGroup>
                      {fareRules.map(option => {
                        return (
                          <CommandItem
                            key={option.id}
                            onSelect={() => {
                              handleSelectedTemplate(option.id);
                            }}
                          >
                            <span title={option.name}>{option.name}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  )}
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
                  <AppCard
                    key={key}
                    title={`Điều kiện ${index + 1}`}
                    headerAction={
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => remove(name)}
                      >
                        <Trash2Icon />
                      </Button>
                    }
                  >
                    <Row gutter={20}>
                      <Col span={24} xl={8}>
                        <Form.Item
                          {...restField}
                          name={[name, FARE_RULE_FIELDS.TYPE]}
                          label={FARE_RULE_FIELD_LABELS[FARE_RULE_FIELDS.TYPE]}
                          rules={
                            FARE_RULE_FIELD_VALIDATIONS[FARE_RULE_FIELDS.TYPE]
                          }
                        >
                          <Select
                            placeholder={
                              FARE_RULE_FIELD_LABELS[FARE_RULE_FIELDS.TYPE]
                            }
                            options={FARE_RULE_TYPE_OPTIONS}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24} xl={16}>
                        <Form.Item
                          {...restField}
                          name={[name, FARE_RULE_FIELDS.TEXT]}
                          label={FARE_RULE_FIELD_LABELS[FARE_RULE_FIELDS.TEXT]}
                          rules={
                            FARE_RULE_FIELD_VALIDATIONS[FARE_RULE_FIELDS.TEXT]
                          }
                        >
                          <Input
                            placeholder={
                              FARE_RULE_FIELD_LABELS[FARE_RULE_FIELDS.TEXT]
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </AppCard>
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
      </div>
    </Spin>
  );
};
