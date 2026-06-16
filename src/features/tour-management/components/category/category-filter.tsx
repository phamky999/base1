import { AppFilter } from '@/components/app-ui/app-filter';
import { Form, Input } from 'antd';
import { useMemo } from 'react';

export const CategoryFilter = () => {
  const advanceFilterConfig = useMemo(
    () => ({
      keys: ['code', 'name'],
      elements: (
        <>
          <Form.Item name="code" label="Mã tuyến" className="mb-3">
            <Input placeholder="Mã tuyến" />
          </Form.Item>
          <Form.Item name="name" label="Tên tuyến" className="mb-3">
            <Input placeholder="Tên tuyến" />
          </Form.Item>
        </>
      ),
    }),
    []
  );

  return (
    <AppFilter advanceFilter={advanceFilterConfig} showAdvanceFilterOnly />
  );
};
