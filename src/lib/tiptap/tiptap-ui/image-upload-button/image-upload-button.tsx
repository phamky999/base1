import { useTiptapEditor } from '@/lib/tiptap/hooks/use-tiptap-editor';
import type { ButtonProps } from '@/lib/tiptap/tiptap-ui-primitive/button';
import { Button } from '@/lib/tiptap/tiptap-ui-primitive/button';
import type { UseImageUploadConfig } from '@/lib/tiptap/tiptap-ui/image-upload-button';
import { useImageUpload } from '@/lib/tiptap/tiptap-ui/image-upload-button';
import { forwardRef, useCallback } from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;
type IconComponent = ({ className, ...props }: IconProps) => React.ReactElement;

export interface ImageUploadButtonProps
  extends Omit<ButtonProps, 'type'>, UseImageUploadConfig {
  text?: string;
  icon?: React.MemoExoticComponent<IconComponent> | React.FC<IconProps>;
}

export const ImageUploadButton = forwardRef<
  HTMLButtonElement,
  ImageUploadButtonProps
>(
  (
    {
      editor: providedEditor,
      text,
      hideWhenUnavailable = false,
      onInserted,
      onClick,
      icon: CustomIcon,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const { isVisible, canInsert, handleImage, label, isActive, Icon } =
      useImageUpload({
        editor,
        hideWhenUnavailable,
        onInserted,
      });

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleImage();
      },
      [handleImage, onClick]
    );

    if (!isVisible) {
      return null;
    }

    const RenderIcon = CustomIcon ?? Icon;

    return (
      <Button
        type="button"
        variant="ghost"
        data-active-state={isActive ? 'on' : 'off'}
        role="button"
        tabIndex={-1}
        disabled={!canInsert}
        data-disabled={!canInsert}
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

ImageUploadButton.displayName = 'ImageUploadButton';
