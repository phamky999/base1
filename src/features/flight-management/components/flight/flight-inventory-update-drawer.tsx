import { AppDrawer } from '@/components/app-ui/app-drawer';
import { AppInputNumber } from '@/components/app-ui/app-input-number';
import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import {
  useGetFlightDetailQuery,
  useUpdateInventoryMutation,
} from '@/features/flight-management/query';
import type { TUpdateInventoryPayload } from '@/features/flight-management/types';
import { Form, Input, Skeleton, Empty } from 'antd';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { toast } from 'sonner';

type FlightInventoryUpdateDrawerProps = {
  flightId?: string;
  transactionCode?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type FormValues = TUpdateInventoryPayload;

export const FlightInventoryUpdateDrawer = ({
  flightId,
  transactionCode,
  open,
  onOpenChange,
}: FlightInventoryUpdateDrawerProps) => {
  const [form] = Form.useForm<FormValues>();
  const [updateInventory, { isLoading }] = useUpdateInventoryMutation();

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
      seatTotal: String(detail.seatTotal),
      priceAdult: detail.priceAdult,
      priceChild: detail.priceChild,
      priceInfant: detail.priceInfant,
    });
  }, [detail, form, open]);

  const onFinish = async (values: FormValues) => {
    if (!flightId) return;

    try {
      await updateInventory({
        id: flightId,
        payload: values,
      }).unwrap();
      toast.success('Cập nhật thành công');
      onOpenChange(false);
    } catch {
      // handled by RTK
    }
  };

  return (
    <AppDrawer
      open={open}
      onOpenChange={handleOpenChange}
      title={`Cập nhật số chỗ & giá${transactionCode ? ` - ${transactionCode}` : ''}`}
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

            <Form.Item
              name="seatTotal"
              label="Tổng số chỗ"
              rules={[{ required: true, message: 'Nhập tổng số chỗ' }]}
            >
              <Input placeholder="Tổng số chỗ" />
            </Form.Item>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Form.Item
                name="priceAdult"
                label="Giá vé người lớn"
                rules={[{ required: true, message: 'Nhập giá vé người lớn' }]}
              >
                <AppInputNumber
                  className="w-full"
                  placeholder="Giá vé người lớn"
                  precision={0}
                  min={0}
                  suffix="VND"
                />
              </Form.Item>

              <Form.Item
                name="priceChild"
                label="Giá vé trẻ em"
                rules={[{ required: true, message: 'Nhập giá vé trẻ em' }]}
              >
                <AppInputNumber
                  className="w-full"
                  placeholder="Giá vé trẻ em"
                  precision={0}
                  min={0}
                  suffix="VND"
                />
              </Form.Item>

              <Form.Item
                name="priceInfant"
                label="Giá vé em bé"
                rules={[{ required: true, message: 'Nhập giá vé em bé' }]}
              >
                <AppInputNumber
                  className="w-full"
                  placeholder="Giá vé em bé"
                  precision={0}
                  min={0}
                  suffix="VND"
                />
              </Form.Item>
            </div>
          </Form>
        ) : (
          <Empty description="Không có dữ liệu" />
        )}
      </Skeleton>
    </AppDrawer>
  );
};
