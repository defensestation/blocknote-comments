import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { RiCheckFill, RiCloseFill, RiLink } from "react-icons/ri";
import { ToolbarInputsMenuItem } from "../../../mantine-shared/Toolbar/ToolbarInputsMenuItem";
import { CommentToolbarProps } from "../CommentToolbarProps";
import { ToolbarButton } from "@blocknote/react";

export const EditCommentMenuItems = (
  props: Pick<CommentToolbarProps, "comment" | "text" | "editComment" | 'deleteComment'>
) => {
  const { comment, text, editComment, deleteComment } = props;

  const [currentComment, setCurrentComment] = useState<string>(comment);
  const [currentText, setCurrentText] = useState<string>(text);

  useEffect(() => {
    setCurrentComment(comment);
    setCurrentText(text);
  }, [text, comment]);


  const handleCommentChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) =>
      setCurrentComment(event.currentTarget.value),
    []
  );

  const handleSubmit = useCallback(
    () => editComment(currentComment, currentText),
    [editComment, currentComment, currentText]
  ); 
  const handleDelete = useCallback(
    () => deleteComment(),
    [deleteComment, currentComment, currentText]
  );

  return (
    <>
      <ToolbarInputsMenuItem
        type={"textarea"}
        icon={RiLink}
        autoFocus={true}
        placeholder={"Edit Comment"}
        value={currentComment}
        w={"100%"}
        h="100%"
        minRows={5}
        // onKeyDown={handleEnter}
        onChange={handleCommentChange}
        // onSubmit={handleSubmit}
      />
      <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2px",
            justifyContent: "flex-end",
          }}
        >
          <ToolbarButton
            mainTooltip="Add/Update Comment"
            isSelected={false}
            onClick={handleSubmit}
            icon={RiCheckFill}
          />
          <ToolbarButton
            mainTooltip="Remove Comment"
            isSelected={false}
            onClick={handleDelete}
            icon={RiCloseFill}
          />
        </div>
    </>
  );
};
