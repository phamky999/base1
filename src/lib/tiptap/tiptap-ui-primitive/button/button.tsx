import { forwardRef, Fragment } from 'react';

import { AppTooltip } from '@/components/app-ui/app-tooltip';
import '@/lib/tiptap/tiptap-ui-primitive/button/button-colors.scss';
import '@/lib/tiptap/tiptap-ui-primitive/button/button.scss';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'ghost' | 'primary';
export type ButtonSize = 'small' | 'default' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showTooltip?: boolean;
  tooltip?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const ShortcutDisplay: React.FC<{ shortcuts: string[] }> = ({
  shortcuts,
}) => {
  if (shortcuts.length === 0) return null;

  return (
    <div>
      {shortcuts.map((key, index) => (
        <Fragment key={index}>
          {index > 0 && <kbd>+</kbd>}
          <kbd>{key}</kbd>
        </Fragment>
      ))}
    </div>
  );
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      tooltip,
      showTooltip = true,

      variant,
      size,
      ...props
    },
    ref
  ) => {
    if (!tooltip || !showTooltip) {
      return (
        <button
          data-slot="tiptap-button"
          className={cn('tiptap-button', className)}
          ref={ref}
          data-style={variant}
          data-size={size}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <AppTooltip content={tooltip}>
        <button
          data-slot="tiptap-button"
          className={cn('tiptap-button', className)}
          ref={ref}
          data-style={variant}
          data-size={size}
          {...props}
        >
          {children}
        </button>
      </AppTooltip>
    );
  }
);

Button.displayName = 'Button';

export default Button;
