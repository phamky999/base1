import { useTiptapEditor } from '@/lib/tiptap/hooks/use-tiptap-editor';
import type { ButtonProps } from '@/lib/tiptap/tiptap-ui-primitive/button';
import { Button } from '@/lib/tiptap/tiptap-ui-primitive/button';
import type { UseCodeBlockConfig } from '@/lib/tiptap/tiptap-ui/code-block-button';
import { useCodeBlock } from '@/lib/tiptap/tiptap-ui/code-block-button';
import { forwardRef, useCallback } from 'react';

export interface CodeBlockButtonProps
  extends Omit<ButtonProps, 'type'>, UseCodeBlockConfig {
  text?: string;
}

export const CodeBlockButton = forwardRef<
  HTMLButtonElement,
  CodeBlockButtonProps
>(
  (
    {
      editor: providedEditor,
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
      useCodeBlock({
        editor,
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
        disabled={!canToggle}
        data-disabled={!canToggle}
        tabIndex={-1}
        aria-label={label}
        aria-pressed={isActive}
        tooltip={'Code Block'}
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

CodeBlockButton.displayName = 'CodeBlockButton';
