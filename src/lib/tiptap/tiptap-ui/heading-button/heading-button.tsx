import { useTiptapEditor } from '@/lib/tiptap/hooks/use-tiptap-editor';
import type { ButtonProps } from '@/lib/tiptap/tiptap-ui-primitive/button';
import { Button } from '@/lib/tiptap/tiptap-ui-primitive/button';
import type { UseHeadingConfig } from '@/lib/tiptap/tiptap-ui/heading-button';
import { useHeading } from '@/lib/tiptap/tiptap-ui/heading-button';
import { forwardRef, useCallback } from 'react';

export interface HeadingButtonProps
  extends Omit<ButtonProps, 'type'>, UseHeadingConfig {
  text?: string;
}

export const HeadingButton = forwardRef<HTMLButtonElement, HeadingButtonProps>(
  (
    {
      editor: providedEditor,
      level,
      text,
      hideWhenUnavailable = false,
      onToggled,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const { isVisible, canToggle, isActive, handleToggle, label, Icon } =
      useHeading({
        editor,
        level,
        hideWhenUnavailable,
        onToggled,
      });

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleToggle();
      },
      [handleToggle, onClick]
    );

    if (!isVisible) {
      return null;
    }

    return (
      <Button
        type="button"
        variant="ghost"
        data-active-state={isActive ? 'on' : 'off'}
        role="button"
        tabIndex={-1}
        disabled={!canToggle}
        data-disabled={!canToggle}
        aria-label={label}
        aria-pressed={isActive}
        tooltip={label}
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            <Icon className="tiptap-button-icon" />
            {text && <span className="tiptap-button-text">{text}</span>}
          </>
        )}
      </Button>
    );
  }
);

HeadingButton.displayName = 'HeadingButton';
