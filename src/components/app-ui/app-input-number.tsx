import { displayNumberWithCommas } from '@/lib/helpers/number';
import { InputNumber, type InputNumberProps } from 'antd';

type AppInputNumberProps = InputNumberProps<number>;

export const AppInputNumber = (props: AppInputNumberProps) => {
  return (
    <InputNumber
      formatter={
        displayNumberWithCommas.formatter as InputNumberProps<number>['formatter']
      }
      parser={
        displayNumberWithCommas.parser as unknown as InputNumberProps<number>['parser']
      }
      {...props}
    />
  );
};
