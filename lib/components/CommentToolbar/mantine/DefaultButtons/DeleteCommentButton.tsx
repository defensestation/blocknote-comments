import { MdCancel } from "react-icons/md";
import { CommentToolbarProps } from "../../CommentToolbarProps";
import { ToolbarButton } from "@blocknote/react";

export const DeleteCommentButton = (
  props: Pick<CommentToolbarProps, "deleteComment">
) => (
  <ToolbarButton
    mainTooltip="Remove comment"
    isSelected={false}
    onClick={props.deleteComment}
    icon={MdCancel}
  />
);
