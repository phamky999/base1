import { AppDrawer } from '@/components/app-ui/app-drawer';
import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import {
  useGetFlightDetailQuery,
  useUpdateRulesMutation,
} from '@/features/flight-management/query';
import type { TUpdateRulesPayload } from '@/features/flight-management/types';
import { Form, Input, Skeleton, Empty } from 'antd';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { FareRulesSection } from '@/features/flight-management/components/flight/flight-form/fare-rules';

type FlightRulesUpdateDrawerProps = {
  flightId?: string;
  transactionCode?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type FormValues = TUpdateRulesPayload;

export const FlightRulesUpdateDrawer = ({
  flightId,
  transactionCode,
  open,
  onOpenChange,
}: FlightRulesUpdateDrawerProps) => {
  const [form] = Form.useForm<FormValues>();
  const [updateRules, { isLoading }] = useUpdateRulesMutation();

  const queryArg = !flightId || !open ? skipToken : String(flightId);
  const { data, isFetching } = useGetFlightDetailQuery(queryArg);
  const detail = data?.data;

  const handleOpenChange = (o: boolean) => {
    if (!o) {
      form.resetFields();
    }
    onOpenChange(o);
  };

  useEffect(() => {
    if (!open || !detail) return;

    form.setFieldsValue({
      remark: '',
      fareRules: detail.fareRules || [],
    });
  }, [detail, form, open]);

  const onFinish = async (values: FormValues) => {
    if (!flightId) return;

    try {
      await updateRules({
        id: flightId,
        payload: values,
      }).unwrap();
      toast.success('Cập nhật điều kiện vé thành công');
      onOpenChange(false);
    } catch {
      // handled by RTK
    }
  };

  return (
    <AppDrawer
      open={open}
      onOpenChange={handleOpenChange}
      title={`Cập nhật điều kiện vé${transactionCode ? ` - ${transactionCode}` : ''}`}
      footer={
        <div className="flex w-full items-center justify-end gap-4">
          <DrawerClose asChild>
            <Button variant="outline">Hủy</Button>
          </DrawerClose>
          <Button loading={isLoading} onClick={() => form.submit()}>
            Cập nhật
          </Button>
        </div>
      }
    >
      <Skeleton loading={isFetching} active>
        {detail ? (
          <Form
            form={form}
            layout="vertical"
            disabled={isLoading}
            scrollToFirstError
            onFinish={onFinish}
          >
            <Form.Item
              name="remark"
              label="Remark"
              rules={[
                {
                  required: true,
                  message: 'Nhập remark',
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Nhập remark" />
            </Form.Item>

            <FareRulesSection />
          </Form>
        ) : (
          <Empty description="Không có dữ liệu" />
        )}
      </Skeleton>
    </AppDrawer>
  );
};
