import { useCallback, useMemo, useState } from "react";
import { MdComment } from "react-icons/md";

import {
  BlockNoteEditor,
  BlockSchema,
  formatKeyboardShortcut,
  InlineContentSchema,
  StyleImplementation,
  StyleSchema,
} from "@blocknote/core";

import {
  ToolbarButton,
  useBlockNoteEditor,
  useEditorContentOrSelectionChange,
  useSelectedBlocks,
} from "@blocknote/react";
import { ToolbarInputsMenu } from "../../../mantine-shared/Toolbar/ToolbarInputsMenu";
import { EditCommentMenuItems } from "../mantine/EditCommentMenuItem";

function checkCommentInSchema(
  editor: BlockNoteEditor<BlockSchema, any, StyleSchema>
): editor is BlockNoteEditor<
  BlockSchema,
  InlineContentSchema,
  StyleSchema & {
    comment: {
      config: {
        type: string;
        propSchema: "string";
      };
      implementation: StyleImplementation;
    };
  }
> {
  return (
    "comment" in editor.schema.styleSpecs &&
    editor.schema.styleSpecs["comment"].config.type === "comment"
  );
}

export const CreateCommentButton = () => {
  const editor = useBlockNoteEditor<
    BlockSchema,
    InlineContentSchema,
    StyleSchema
  >();

  const commentInSchema = checkCommentInSchema(editor);
  const [active, setActive] = useState<boolean>(
    "comment" in editor.getActiveStyles()
  );

  useEditorContentOrSelectionChange(() => {
    if (commentInSchema) {
      setActive("comment" in editor.getActiveStyles());
    }
  }, editor);

  const selectedBlocks = useSelectedBlocks(editor);

  const getSelectedComment = () => {
    return editor._tiptapEditor.getAttributes("comment").stringValue as
      | string
      | undefined;
  };

  const [comment, setComment] = useState<string>(getSelectedComment() || "");
  const [text, setText] = useState<string>(editor.getSelectedText());

  useEditorContentOrSelectionChange(() => {
    setText(editor.getSelectedText() || "");
    setComment(getSelectedComment() || "");
  }, editor);

  const update = useCallback(
    (comment: string) => {
    // @ts-ignore
    editor.addStyles({ comment: comment })
    editor.focus();
    editor.domElement.focus();
    },
    [editor]
  );

  const onDelete = useCallback(() => {
    // @ts-ignore
    editor.removeStyles({ comment: "" })
  }, [editor])

  const show = useMemo(() => {
    if (!commentInSchema) {
      return false;
    }

    for (const block of selectedBlocks) {
      if (block.content === undefined) {
        return false;
      }
    }

    return true;
  }, [commentInSchema, selectedBlocks]);

  if (!show) {
    return null;
  }

  return (
    <ToolbarInputsMenu
      button={
        <ToolbarButton
        isSelected={active}
          mainTooltip={"Create Comment"}
          secondaryTooltip={formatKeyboardShortcut("Mod+K")}
          icon={MdComment}
        />
      }
      dropdownItems={
        <EditCommentMenuItems
          comment={comment}
          text={text}
          editComment={update}
          deleteComment={onDelete}
        />
      }
    />
  );
};
