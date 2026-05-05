import { normalizeQueryParamValue } from '@/components/app-filter/helper';
import { Button } from '@/components/ui/button';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
import { DEFAULT_PAGE_INDEX, PAGINATION_QUERY_KEY } from '@/lib/constants';
import { DEFAULT_DATE_FORMAT } from '@/lib/date/constants';
import dayjs from '@/lib/date/dayjs-config';
import type { ObjectType } from '@/lib/types';
import { Form, Popover } from 'antd';
import { FunnelPlusIcon } from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

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

  const [searchParams, setSearchParams] = useSearchParams();

  const isFiltered = useMemo(() => {
    return advanceFilterKeys.some(key => searchParams.has(key));
  }, [searchParams, advanceFilterKeys]);

  const onFinish = (values: ObjectType) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(values).forEach(([key, value]) => {
      newParams.delete(key);

      if (
        value !== undefined &&
        value !== null &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        if (Array.isArray(value)) {
          value.forEach(v => {
            const formattedValue = dayjs.isDayjs(v)
              ? v.format(DEFAULT_DATE_FORMAT)
              : String(v);
            newParams.append(key, formattedValue);
          });
        } else if (dayjs.isDayjs(value)) {
          newParams.set(key, value.format(DEFAULT_DATE_FORMAT));
        } else {
          newParams.set(key, String(value));
        }
      }
    });

    newParams.set(PAGINATION_QUERY_KEY.PAGE_INDEX, String(DEFAULT_PAGE_INDEX));

    setSearchParams(newParams, { replace: true });
    setOpen(false);
  };

  const handleReset = () => {
    const newParams = new URLSearchParams(searchParams);
    advanceFilterKeys.forEach(key => newParams.delete(key));
    form.resetFields();
    setSearchParams(newParams, { replace: true });
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    const values: ObjectType = {};
    advanceFilterKeys.forEach(key => {
      const value = searchParams.getAll(key);
      if (value.length > 0) {
        values[key] = normalizeQueryParamValue(value);
      } else {
        values[key] = undefined;
      }
    });

    form.setFieldsValue(values);
  }, [searchParams, advanceFilterKeys, form, open]);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      arrow={false}
      trigger={'click'}
      placement="bottomRight"
      title="Tìm kiếm nâng cao"
      content={
        <>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div className="no-scrollbar max-h-72 overflow-y-auto px-1">
              {formElements}
            </div>
            <div className="mb-3 h-px bg-border" />
            <div className="flex items-center justify-between gap-2.5">
              <Button type="reset" variant="outline" onClick={handleReset}>
                Bỏ lọc
              </Button>

              <Button type="submit" variant="default">
                Áp dụng
              </Button>
            </div>
          </Form>
        </>
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

  // return (
  //   <Popover open={open} onOpenChange={setOpen}>
  //     <PopoverTrigger asChild>
  //       <Button variant="outline" size="sm" className="relative h-8">
  //         <FunnelPlusIcon className="size-4" />
  //         {isFiltered && (
  //           <div className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-red-600" />
  //         )}
  //       </Button>
  //     </PopoverTrigger>
  //     <PopoverContent className="w-[280px] p-4" align="end" forceMount>
  //       <Form form={form} layout="vertical" onFinish={onFinish}>
  //         <div className="no-scrollbar max-h-72 overflow-y-auto px-1">
  //           {formElements}
  //         </div>
  //         <div className="mb-3 h-px bg-border" />
  //         <div className="flex items-center justify-between gap-2.5">
  //           <Button type="reset" variant="outline" onClick={handleReset}>
  //             Bỏ lọc
  //           </Button>

  //           <Button type="submit" variant="default">
  //             Áp dụng
  //           </Button>
  //         </div>
  //       </Form>
  //     </PopoverContent>
  //   </Popover>
  // );
};
