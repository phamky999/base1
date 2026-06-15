import { AppDrawer } from '@/components/app-ui/app-drawer';
import { Button } from '@/components/ui/button';
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
import { Form, Input, Skeleton } from 'antd';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { RulesList } from './rules-list';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
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

  const queryArg = !selectedId ? skipToken : String(selectedId);

  const { data, isFetching } = useGetFareRuleDetailQuery(queryArg);

  const [createFareRuleMutationFn, { isLoading: isCreating }] =
    useCreateFareRuleMutation();

  const [updateFareRuleMutationFn, { isLoading: isUpdating }] =
    useUpdateFareRuleMutation();

  const isSubmitting = isCreating || isUpdating;

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
            disabled={isSubmitting}
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
                <RulesList fields={fields} add={add} remove={remove} />
              )}
            </Form.List>
          </div>
        </Form>
      </Skeleton>
    </AppDrawer>
  );
};
