import { useTiptapEditor } from '@/lib/tiptap/hooks/use-tiptap-editor';
import type { ButtonProps } from '@/lib/tiptap/tiptap-ui-primitive/button';
import { Button } from '@/lib/tiptap/tiptap-ui-primitive/button';
import type { UseTextAlignConfig } from '@/lib/tiptap/tiptap-ui/text-align-button';
import { useTextAlign } from '@/lib/tiptap/tiptap-ui/text-align-button';
import { forwardRef, useCallback } from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;
type IconComponent = ({ className, ...props }: IconProps) => React.ReactElement;

export interface TextAlignButtonProps
  extends Omit<ButtonProps, 'type'>, UseTextAlignConfig {
  text?: string;
  icon?: React.MemoExoticComponent<IconComponent> | React.FC<IconProps>;
}

export const TextAlignButton = forwardRef<
  HTMLButtonElement,
  TextAlignButtonProps
>(
  (
    {
      editor: providedEditor,
      align,
      text,
      hideWhenUnavailable = false,
      onAligned,
      onClick,
      icon: CustomIcon,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const { isVisible, handleTextAlign, label, canAlign, isActive, Icon } =
      useTextAlign({
        editor,
        align,
        hideWhenUnavailable,
        onAligned,
      });

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleTextAlign();
      },
      [handleTextAlign, onClick]
    );

    if (!isVisible) {
      return null;
    }

    const RenderIcon = CustomIcon ?? Icon;

    return (
      <Button
        type="button"
        disabled={!canAlign}
        variant="ghost"
        data-active-state={isActive ? 'on' : 'off'}
        data-disabled={!canAlign}
        role="button"
        tabIndex={-1}
        aria-label={label}
        aria-pressed={isActive}
        tooltip={label}
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            <RenderIcon className="tiptap-button-icon" />
            {text && <span className="tiptap-button-text">{text}</span>}
          </>
        )}
      </Button>
    );
  }
);

TextAlignButton.displayName = 'TextAlignButton';
