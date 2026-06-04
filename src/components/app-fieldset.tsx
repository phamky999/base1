import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

type AppFieldSetProps = PropsWithChildren & {
  title: string;
  headerAction?: ReactNode;
  className?: HTMLAttributes<HTMLFieldSetElement>['className'];
};

export const AppFieldSet = ({
  children,
  title,
  headerAction,
}: AppFieldSetProps) => {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="flex-1">{title}</CardTitle>
        {headerAction ? (
          <CardAction className="space-x-2">{headerAction}</CardAction>
        ) : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
