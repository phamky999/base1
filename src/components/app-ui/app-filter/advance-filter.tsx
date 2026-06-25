import { normalizeQueryParamValue } from '@/components/app-ui/app-filter/helper';
import { Button } from '@/components/ui/button';
import { DEFAULT_PAGE_INDEX, PAGINATION_QUERY_KEY } from '@/lib/constants';
import { DEFAULT_DATE_FORMAT } from '@/lib/date/constants';
import dayjs from '@/lib/date/dayjs-config';
import type { ObjectType } from '@/lib/types';
import { Form, Popover } from 'antd';
import { FunnelPlusIcon } from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useQueryHandle } from '@/hooks/use-query-handle';

type AdvanceFilterProps = {
  formElements: ReactNode;
  advanceFilterKeys: string[];
};

export const AdvanceFilter = ({
  formElements,
  advanceFilterKeys,
}: AdvanceFilterProps) => {
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const { queryParams, handleUpdateQuery } = useQueryHandle();

  const isFiltered = useMemo(() => {
    return advanceFilterKeys.some(key => key in queryParams);
  }, [queryParams, advanceFilterKeys]);

  const onFinish = (values: ObjectType) => {
    const processedValues: ObjectType = {};

    Object.entries(values).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        if (Array.isArray(value)) {
          processedValues[key] = value.map(v =>
            dayjs.isDayjs(v) ? v.format(DEFAULT_DATE_FORMAT) : String(v)
          );
        } else if (dayjs.isDayjs(value)) {
          processedValues[key] = value.format(DEFAULT_DATE_FORMAT);
        } else {
          processedValues[key] = String(value);
        }
      } else {
        processedValues[key] = undefined;
      }
    });

    processedValues[PAGINATION_QUERY_KEY.PAGE_INDEX] = DEFAULT_PAGE_INDEX;

    handleUpdateQuery(processedValues);

    setOpen(false);
  };

  const handleReset = () => {
    const resetValues: ObjectType = {
      [PAGINATION_QUERY_KEY.PAGE_INDEX]: DEFAULT_PAGE_INDEX,
    };

    advanceFilterKeys.forEach(key => {
      resetValues[key] = undefined;
    });

    form.resetFields();

    handleUpdateQuery(resetValues);

    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    const values: ObjectType = {};

    advanceFilterKeys.forEach(key => {
      if (key in queryParams) {
        values[key] = normalizeQueryParamValue(queryParams[key]);
      } else {
        values[key] = undefined;
      }
    });

    form.setFieldsValue(values);
  }, [queryParams, advanceFilterKeys, form, open]);

  return (
    <Popover
      trigger="click"
      arrow={false}
      open={open}
      onOpenChange={setOpen}
      placement="bottomRight"
      classNames={{
        container:
          'rounded-lg bg-popover p-2.5 shadow-md ring-1 ring-foreground/10 outline-hidden duration-100',
      }}
      getPopupContainer={trigger => trigger.parentElement!}
      content={
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="no-scrollbar max-h-72 w-80 overflow-y-auto px-1">
            {formElements}
          </div>

          <div className="mb-3 h-px bg-border" />

          <div className="flex items-center justify-between gap-2.5">
            <Button type="button" variant="outline" onClick={handleReset}>
              Bỏ lọc
            </Button>

            <Button
              type="button"
              variant="default"
              onClick={() => form.submit()}
            >
              Áp dụng
            </Button>
          </div>
        </Form>
      }
    >
      <Button variant="outline" size="sm" className="relative h-8">
        <FunnelPlusIcon className="size-4" />

        {isFiltered && (
          <div className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-red-600" />
        )}
      </Button>
    </Popover>
  );
};
