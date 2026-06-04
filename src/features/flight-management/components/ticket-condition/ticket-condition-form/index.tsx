import { AppDrawer } from '@/components/app-drawer';
import { AppFieldSet } from '@/components/app-fieldset';
import { normalizeQueryParamValue } from '@/components/app-filter/helper';
import { Button } from '@/components/ui/button';
import { FARE_RULE_TYPE_OPTIONS } from '@/features/flight-management/constants';
import {
  useCreateFareRuleMutation,
  useGetFareRuleDetailQuery,
  useUpdateFareRuleMutation,
} from '@/features/flight-management/query';
import type {
  TCreateFareRulePayload,
  TUpdateFareRulePayload,
} from '@/features/flight-management/types';
import { upperCaseValue } from '@/lib/helpers/string';
import type { ObjectType } from '@/lib/types';
import { skipToken } from '@reduxjs/toolkit/query';
import { Form, Input, Select, Skeleton } from 'antd';
import { PlusCircleIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
  RULE_FIELDS,
} from './ticket-condition-form.schema';

type TicketConditionFormProps = {
  selectedId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const TicketConditionForm = ({
  selectedId,
  open,
  onOpenChange,
}: TicketConditionFormProps) => {
  const actionLabel = selectedId
    ? 'Cập nhật bộ điều kiện vé'
    : 'Tạo bộ điều kiện vé';

  const [form] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const normalizeId = normalizeQueryParamValue(selectedId);

  const queryArg = !normalizeId ? skipToken : String(normalizeId);

  const { data, isFetching } = useGetFareRuleDetailQuery(queryArg);

  const [createFareRuleMutationFn] = useCreateFareRuleMutation();

  const [updateFareRuleMutationFn] = useUpdateFareRuleMutation();

  useEffect(() => {
    if (!open || !selectedId || !data) return;

    const ticketConditionDetail = data?.data;

    form.setFieldsValue({
      [FORM_FIELDS.NAME]: ticketConditionDetail?.name,
      [FORM_FIELDS.AIRLINE_CODE]: ticketConditionDetail?.airlineCode,
      [FORM_FIELDS.RULES]: ticketConditionDetail?.rules || [],
    });
  }, [open, selectedId, data, form]);

  const handleOpenChange = (o: boolean) => {
    if (!o) {
      form.resetFields();
    }
    onOpenChange(o);
  };

  const onFinish = async (values: ObjectType) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const { rules, ...restValues } = values || {};

      const payload = {
        ...restValues,

        rules: rules ?? [],
      };

      if (selectedId) {
        await updateFareRuleMutationFn({
          ...payload,
          id: selectedId,
        } as TUpdateFareRulePayload).unwrap();
      } else {
        await createFareRuleMutationFn(
          payload as TCreateFareRulePayload
        ).unwrap();
      }

      toast.success(`${actionLabel} thành công`);

      handleOpenChange(false);
    } catch (error) {
      console.error('Submit Error', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppDrawer
      open={open}
      onOpenChange={handleOpenChange}
      title={actionLabel}
      footer={
        <>
          <Button
            type="button"
            variant={'outline'}
            onClick={() => handleOpenChange(false)}
            className="min-w-25"
          >
            Hủy
          </Button>
          <Button
            onClick={() => form.submit()}
            variant={'default'}
            type="button"
            loading={isSubmitting}
            className="min-w-25"
          >
            {selectedId ? 'Cập nhật' : 'Tạo'}
          </Button>
        </>
      }
    >
      <Skeleton loading={isFetching} active>
        <Form
          disabled={isSubmitting}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          scrollToFirstError
          {...(selectedId
            ? {}
            : {
                initialValues: {
                  [FORM_FIELDS.RULES]: [undefined],
                },
              })}
        >
          <div className="space-y-4">
            <div className="grid gap-x-4 sm:grid-cols-2">
              <Form.Item
                name={FORM_FIELDS.NAME}
                label={FORM_LABELS[FORM_FIELDS.NAME]}
                rules={FORM_VALIDATIONS[FORM_FIELDS.NAME]}
              >
                <Input placeholder={FORM_LABELS[FORM_FIELDS.NAME]} />
              </Form.Item>

              <Form.Item
                normalize={upperCaseValue}
                name={FORM_FIELDS.AIRLINE_CODE}
                label={FORM_LABELS[FORM_FIELDS.AIRLINE_CODE]}
                rules={FORM_VALIDATIONS[FORM_FIELDS.AIRLINE_CODE]}
              >
                <Input placeholder={FORM_LABELS[FORM_FIELDS.AIRLINE_CODE]} />
              </Form.Item>
            </div>

            <div className="mb-4 flex items-center gap-2">
              Danh sách điều kiện
            </div>

            <Form.List name={FORM_FIELDS.RULES}>
              {(fields, { add, remove }) => (
                <>
                  <div className="space-y-4">
                    {fields.map(({ key, name, ...restField }, index) => (
                      <AppFieldSet
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
                            <Input
                              placeholder={FORM_LABELS[RULE_FIELDS.TEXT]}
                            />
                          </Form.Item>
                        </div>
                      </AppFieldSet>
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
              )}
            </Form.List>
          </div>
        </Form>
      </Skeleton>
    </AppDrawer>
  );
};
