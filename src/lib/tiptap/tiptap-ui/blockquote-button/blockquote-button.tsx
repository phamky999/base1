import { useTiptapEditor } from '@/lib/tiptap/hooks/use-tiptap-editor';
import type { ButtonProps } from '@/lib/tiptap/tiptap-ui-primitive/button';
import { Button } from '@/lib/tiptap/tiptap-ui-primitive/button';
import type { UseBlockquoteConfig } from '@/lib/tiptap/tiptap-ui/blockquote-button';
import { useBlockquote } from '@/lib/tiptap/tiptap-ui/blockquote-button';
import { forwardRef, useCallback } from 'react';

export interface BlockquoteButtonProps
  extends Omit<ButtonProps, 'type'>, UseBlockquoteConfig {
  text?: string;
}

export const BlockquoteButton = forwardRef<
  HTMLButtonElement,
  BlockquoteButtonProps
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
      useBlockquote({
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
        tabIndex={-1}
        disabled={!canToggle}
        data-disabled={!canToggle}
        aria-label={label}
        aria-pressed={isActive}
        tooltip={'Blockquote'}
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

BlockquoteButton.displayName = 'BlockquoteButton';
