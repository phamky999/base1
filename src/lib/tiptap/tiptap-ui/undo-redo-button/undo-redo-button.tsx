import { useTiptapEditor } from '@/lib/tiptap/hooks/use-tiptap-editor';
import type { ButtonProps } from '@/lib/tiptap/tiptap-ui-primitive/button';
import { Button } from '@/lib/tiptap/tiptap-ui-primitive/button';
import type { UseUndoRedoConfig } from '@/lib/tiptap/tiptap-ui/undo-redo-button';
import { useUndoRedo } from '@/lib/tiptap/tiptap-ui/undo-redo-button';
import { forwardRef, useCallback } from 'react';

export interface UndoRedoButtonProps
  extends Omit<ButtonProps, 'type'>, UseUndoRedoConfig {
  text?: string;
}

export const UndoRedoButton = forwardRef<
  HTMLButtonElement,
  UndoRedoButtonProps
>(
  (
    {
      editor: providedEditor,
      action,
      text,
      hideWhenUnavailable = false,
      onExecuted,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const { isVisible, handleAction, label, canExecute, Icon } = useUndoRedo({
      editor,
      action,
      hideWhenUnavailable,
      onExecuted,
    });

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleAction();
      },
      [handleAction, onClick]
    );

    if (!isVisible) {
      return null;
    }

    return (
      <Button
        type="button"
        disabled={!canExecute}
        variant="ghost"
        data-disabled={!canExecute}
        role="button"
        tabIndex={-1}
        aria-label={label}
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

UndoRedoButton.displayName = 'UndoRedoButton';
