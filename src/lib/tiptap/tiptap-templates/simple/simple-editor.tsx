/* eslint-disable react-hooks/set-state-in-effect */
import { EditorContent, EditorContext, useEditor } from '@tiptap/react';
import { useEffect, useRef, useState } from 'react';

// --- Tiptap Core Extensions ---
import { Highlight } from '@tiptap/extension-highlight';
import { Image } from '@tiptap/extension-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { Selection } from '@tiptap/extensions';
import { StarterKit } from '@tiptap/starter-kit';

// --- UI Primitives ---
import { Button } from '@/lib/tiptap/tiptap-ui-primitive/button';
import { Spacer } from '@/lib/tiptap/tiptap-ui-primitive/spacer';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from '@/lib/tiptap/tiptap-ui-primitive/toolbar';

// --- Tiptap Node ---
import '@/lib/tiptap/tiptap-node/blockquote-node/blockquote-node.scss';
import '@/lib/tiptap/tiptap-node/code-block-node/code-block-node.scss';
import '@/lib/tiptap/tiptap-node/heading-node/heading-node.scss';
import { HorizontalRule } from '@/lib/tiptap/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension';
import '@/lib/tiptap/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss';
import '@/lib/tiptap/tiptap-node/image-node/image-node.scss';
import '@/lib/tiptap/tiptap-node/list-node/list-node.scss';
import '@/lib/tiptap/tiptap-node/paragraph-node/paragraph-node.scss';

// --- Tiptap UI ---
import { useIsBreakpoint } from '@/lib/tiptap/hooks/use-is-breakpoint';

import '@/lib/tiptap/tiptap-templates/simple/simple-editor.scss';
import { BlockquoteButton } from '@/lib/tiptap/tiptap-ui/blockquote-button';
import { CodeBlockButton } from '@/lib/tiptap/tiptap-ui/code-block-button';
import {
  ColorHighlightPopover,
  ColorHighlightPopoverButton,
  ColorHighlightPopoverContent,
} from '@/lib/tiptap/tiptap-ui/color-highlight-popover';
import { HeadingDropdownMenu } from '@/lib/tiptap/tiptap-ui/heading-dropdown-menu';
import {
  LinkButton,
  LinkContent,
  LinkPopover,
} from '@/lib/tiptap/tiptap-ui/link-popover';
import { ListDropdownMenu } from '@/lib/tiptap/tiptap-ui/list-dropdown-menu';
import { MarkButton } from '@/lib/tiptap/tiptap-ui/mark-button';
import { TextAlignButton } from '@/lib/tiptap/tiptap-ui/text-align-button';
import { UndoRedoButton } from '@/lib/tiptap/tiptap-ui/undo-redo-button';
import { ArrowLeftIcon, HighlighterIcon, LinkIcon } from 'lucide-react';

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu modal={false} levels={[1, 2, 3, 4]} />
        <ListDropdownMenu
          modal={false}
          types={['bulletList', 'orderedList', 'taskList']}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <Spacer />
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: 'highlighter' | 'link';
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === 'highlighter' ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === 'highlighter' ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);

type SimpleEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export function SimpleEditor({ value, onChange }: SimpleEditorProps) {
  console.log('render');
  const isMobile = useIsBreakpoint();
  const [mobileView, setMobileView] = useState<'main' | 'highlighter' | 'link'>(
    'main'
  );
  const toolbarRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
        class: 'simple-editor',
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
    ],
    content: value ?? '',
    onUpdate: ({ editor: ed }) => {
      console.log(ed.getJSON(), ed.getHTML());
      onChange?.(ed.getHTML());
    },
  });

  useEffect(() => {
    if (!isMobile && mobileView !== 'main') {
      setMobileView('main');
    }
  }, [isMobile, mobileView]);

  useEffect(() => {
    if (!editor || !value) {
      return;
    }

    const currentHtml = editor.getHTML();
    if (currentHtml !== value) {
      editor.commands.setContent(value, {
        emitUpdate: false,
      });
    }
  }, [editor, value]);

  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar ref={toolbarRef}>
          {mobileView === 'main' ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView('highlighter')}
              onLinkClick={() => setMobileView('link')}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === 'highlighter' ? 'highlighter' : 'link'}
              onBack={() => setMobileView('main')}
            />
          )}
        </Toolbar>

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </div>
  );
}
