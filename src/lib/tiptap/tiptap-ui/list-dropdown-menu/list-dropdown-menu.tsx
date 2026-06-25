import { useTiptapEditor } from '@/lib/tiptap/hooks/use-tiptap-editor';
import type { ButtonProps } from '@/lib/tiptap/tiptap-ui-primitive/button';
import { Button } from '@/lib/tiptap/tiptap-ui-primitive/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/lib/tiptap/tiptap-ui-primitive/dropdown-menu';
import { ListButton, type ListType } from '@/lib/tiptap/tiptap-ui/list-button';
import { useListDropdownMenu } from '@/lib/tiptap/tiptap-ui/list-dropdown-menu/use-list-dropdown-menu';
import { type Editor } from '@tiptap/react';
import { ChevronDownIcon } from 'lucide-react';
import { forwardRef, useCallback, useState, type ForwardedRef } from 'react';

export interface ListDropdownMenuProps extends Omit<ButtonProps, 'type'> {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor;
  /**
   * The list types to display in the dropdown.
   */
  types?: ListType[];
  /**
   * Whether the dropdown should be hidden when no list types are available
   * @default false
   */
  hideWhenUnavailable?: boolean;
  /**
   * Callback for when the dropdown opens or closes
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * Whether the dropdown should use a modal
   */
  modal?: boolean;
}

function ListDropdownMenuImpl(
  {
    editor: providedEditor,
    types = ['bulletList', 'orderedList', 'taskList'],
    hideWhenUnavailable = false,
    onOpenChange,
    modal = true,
    ...props
  }: ListDropdownMenuProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { editor } = useTiptapEditor(providedEditor);
  const [isOpen, setIsOpen] = useState(false);

  const { filteredLists, canToggle, isActive, isVisible, Icon } =
    useListDropdownMenu({
      editor,
      types,
      hideWhenUnavailable,
    });

  const handleOnOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    [onOpenChange]
  );

  if (!isVisible) {
    return null;
  }

  return (
    <DropdownMenu modal={modal} open={isOpen} onOpenChange={handleOnOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          data-active-state={isActive ? 'on' : 'off'}
          role="button"
          tabIndex={-1}
          disabled={!canToggle}
          data-disabled={!canToggle}
          aria-label="List options"
          tooltip="List"
          {...props}
          ref={ref}
        >
          <Icon className="tiptap-button-icon" />
          <ChevronDownIcon className="tiptap-button-dropdown-small" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          {filteredLists.map(option => (
            <DropdownMenuItem key={option.type} asChild>
              <ListButton
                editor={editor}
                type={option.type}
                text={option.label}
                showTooltip={false}
              />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const ListDropdownMenu = forwardRef(ListDropdownMenuImpl);

ListDropdownMenu.displayName = 'ListDropdownMenu';

export default ListDropdownMenu;
