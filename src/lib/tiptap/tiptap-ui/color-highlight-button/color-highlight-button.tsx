import { useTiptapEditor } from '@/lib/tiptap/hooks/use-tiptap-editor';
import type { ButtonProps } from '@/lib/tiptap/tiptap-ui-primitive/button';
import { Button } from '@/lib/tiptap/tiptap-ui-primitive/button';
import type { UseColorHighlightConfig } from '@/lib/tiptap/tiptap-ui/color-highlight-button';
import { useColorHighlight } from '@/lib/tiptap/tiptap-ui/color-highlight-button';
import '@/lib/tiptap/tiptap-ui/color-highlight-button/color-highlight-button.scss';
import { forwardRef, useCallback, useMemo } from 'react';

export interface ColorHighlightButtonProps
  extends Omit<ButtonProps, 'type'>, UseColorHighlightConfig {
  text?: string;
}

export const ColorHighlightButton = forwardRef<
  HTMLButtonElement,
  ColorHighlightButtonProps
>(
  (
    {
      editor: providedEditor,
      highlightColor,
      text,
      hideWhenUnavailable = false,
      mode = 'mark',
      onApplied,
      onClick,
      children,
      style,
      useColorValue = false,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const {
      isVisible,
      canColorHighlight,
      isActive,
      handleColorHighlight,
      label,
    } = useColorHighlight({
      editor,
      highlightColor,
      useColorValue,
      label: text || `Toggle highlight (${highlightColor})`,
      hideWhenUnavailable,
      mode,
      onApplied,
    });

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleColorHighlight();
      },
      [handleColorHighlight, onClick]
    );

    const buttonStyle = useMemo(
      () =>
        ({
          ...style,
          '--highlight-color': highlightColor,
        }) as React.CSSProperties,
      [highlightColor, style]
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
        disabled={!canColorHighlight}
        data-disabled={!canColorHighlight}
        aria-label={label}
        aria-pressed={isActive}
        tooltip={label}
        onClick={handleClick}
        style={buttonStyle}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            <span
              className="tiptap-button-highlight"
              style={
                { '--highlight-color': highlightColor } as React.CSSProperties
              }
            />
            {text && <span className="tiptap-button-text">{text}</span>}
          </>
        )}
      </Button>
    );
  }
);

ColorHighlightButton.displayName = 'ColorHighlightButton';
