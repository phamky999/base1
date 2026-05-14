import { AppFilter } from '@/components/app-filter';
import { Form, Input } from 'antd';
import { useMemo } from 'react';

export const AccountListFilter = () => {
  const advanceFilterConfig = useMemo(
    () => ({
      keys: ['username', 'email', 'phone', 'displayName'],
      elements: (
        <>
          <Form.Item name="username" label="Tên tài khoản" className="mb-3">
            <Input placeholder="Tên tài khoản" />
          </Form.Item>
          <Form.Item name="displayName" label="Tên hiển thị" className="mb-3">
            <Input placeholder="Tên hiển thị" />
          </Form.Item>

          <Form.Item name="email" label="Email" className="mb-3">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại" className="mb-3">
            <Input placeholder="Số điện thoại" />
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
