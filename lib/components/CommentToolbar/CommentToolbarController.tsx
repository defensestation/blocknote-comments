import {
    BlockNoteEditor,
    BlockSchema,
    DefaultBlockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema,
    InlineContentSchema,
    StyleSchema,
  } from "@blocknote/core";
  import { flip, offset } from "@floating-ui/react";
  import { FC, useEffect, useRef, useState } from "react";
  
  import { useBlockNoteEditor } from "@blocknote/react";
  import { CommentToolbarProps } from "./CommentToolbarProps";
  import { useUIElementPositioning } from "../../hooks/useUIElementPositioning";
  import { CommentToolbar } from "./mantine/CommentToolbar";
  import { getMarkRange, posToDOMRect } from "@tiptap/core";
  
  const INITIAL_STATE = {
    show: false,
    referencePos: undefined,
    comment: "",
    text: "",
  };
  
  export const CommentToolbarController = <
    BSchema extends BlockSchema = DefaultBlockSchema,
    I extends InlineContentSchema = DefaultInlineContentSchema,
    S extends StyleSchema = DefaultStyleSchema
  >(props: {
    commentToolbar?: FC<CommentToolbarProps>;
  }) => {
    const editor = useBlockNoteEditor<BSchema, I, S>();
    const [state, setState] = useState<
      Pick<CommentToolbarProps, "comment" | "text"> & {
        referencePos: (DOMRect & { from: number; to: number }) | undefined;
        show: boolean;
      }
    >(INITIAL_STATE);
    const [isEditable, setEditable] = useState<boolean>(false)

    const disableEditing = () => {
        setTimeout(() => setEditable(false), 1000)
    }
  
    const onDeleteComment = () => {
        // @ts-ignore
        const tiptapEditor = editor._tiptapEditor;
        if (state.referencePos) {
          const resolvedPosition = tiptapEditor.state.doc.resolve(
            state.referencePos.from + 1
          );
          const marksAtPos = resolvedPosition?.marks();
  
          for (const mark of marksAtPos) {
            if (
              mark.type.name === tiptapEditor.state.schema.mark("comment").type.name
            ) {
              tiptapEditor.view.dispatch(
                tiptapEditor.view.state.tr
                  .removeMark(
                    state.referencePos.from,
                    state.referencePos.to,
                    mark.type
                  )
                  .setMeta("preventAutolink", true)
              );
              tiptapEditor.view.focus();
              setState(INITIAL_STATE);
              disableEditing();
              break;
            }
          }
        }
      };
    const onEditComment = (comment: string) => {
        const tiptapEditor = editor._tiptapEditor;
        if (state.referencePos) {
          const resolvedPosition = tiptapEditor.state.doc.resolve(state.referencePos.from + 1);
          const marksAtPos = resolvedPosition?.marks();
    
          for (const mark of marksAtPos) {
            if (mark.type.name === tiptapEditor.state.schema.mark("comment").type.name) {
              const text = tiptapEditor.state.doc.textBetween(
                state.referencePos.from,
                state.referencePos.to
              );
              const tr = tiptapEditor.view.state.tr.insertText(
                text,
                state.referencePos.from,
                state.referencePos.to
              );
              tr.addMark(
                state.referencePos.from,
                state.referencePos.from + text.length,
                tiptapEditor.view.state.schema.mark("comment", {
                  stringValue: comment,
                })
              );
              tiptapEditor.view.dispatch(tr);
              tiptapEditor.view.focus();
              setState(INITIAL_STATE);
              disableEditing();
              break;
            }
          }
        }
    };
    const menuUpdateTimer = useRef<NodeJS.Timeout | undefined>();
    const onSelectionUpdate = (blockEditor: BlockNoteEditor<BSchema, I, S>) => {
      try {
        const { _tiptapEditor: editor } = blockEditor;
        const view = editor.view;
        // Get the current selection from the editor view
        const selection = view.state.selection;
  
        // Get the position of the selection
  
        // Check if the selection has the desired mark type
        const hasMark = !!selection.$from
          .marks()
          .filter((mark) => mark.type.name == "comment").length;
        if (hasMark) {
          const mark = editor.getAttributes("comment");
          const comment = mark.stringValue;
          const marksAtPos = editor.state.selection.$from.marks();
  
          for (const mark of marksAtPos) {
            if (
              mark.type.name === editor.state.schema.mark("comment").type.name
            ) {
              const range =
                getMarkRange(
                  editor.state.selection.$from,
                  mark.type,
                  mark.attrs
                ) || undefined;
              if (range?.from && range.to) {
                const rect = posToDOMRect(view, range.from, range?.to);
                setState({
                  referencePos: { ...rect, from: range.from, to: range.to },
                  show: true,
                  comment: comment,
                  text: "",
                });
              } else {
                setState(INITIAL_STATE);
                disableEditing();
              }
              break;
            }
          }
        } else {
          setState(INITIAL_STATE);
          disableEditing();
        }
      } catch (e) {
        console.log(e);
        throw e;
      }
    };
  
    useEffect(() => {
      if (editor) editor.onSelectionChange(onSelectionUpdate);
    }, [editor]);
  
    const startMenuUpdateTimer = () => {
      menuUpdateTimer.current = setTimeout(() => {
        setState({
          ...state,
          show: false,
        });
      }, 250);
    };
  
    const stopMenuUpdateTimer = () => {
      if (menuUpdateTimer.current) {
        clearTimeout(menuUpdateTimer.current);
        menuUpdateTimer.current = undefined;
      }
  
      return false;
    };

    const onEnableEditing = () => {
        setEditable(true)
    }
  
    const callbacks = {
      deleteComment: onDeleteComment,
      editComment: onEditComment,
      startHideTimer: startMenuUpdateTimer,
      stopHideTimer: stopMenuUpdateTimer,
      enableEditing: onEnableEditing,
    };
  
    const { isMounted, ref, style } = useUIElementPositioning(
      state?.show || false,
      state?.referencePos || null,
      4000,
      {
        placement: "bottom",
        middleware: [offset(10), flip()],
      }
    );
  
    if (!isMounted || !state) {
      return null;
    }
  
    const { show, referencePos, ...data } = state;
  
    const Component = props.commentToolbar || CommentToolbar;
  
    return (
      <div ref={ref} style={style}>
        <Component isEditable={isEditable} isEditingDisabled={!editor.isEditable} {...data} {...callbacks} />
      </div>
    );
  };
  