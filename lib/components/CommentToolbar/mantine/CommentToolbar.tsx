import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { CommentToolbarProps } from "../CommentToolbarProps";
import { Toolbar } from "../../../mantine-shared/Toolbar/Toolbar";
import { DeleteCommentButton } from "./DefaultButtons/DeleteCommentButton";
import { Text, Flex, Divider, Textarea } from "@mantine/core";
import { MdEdit } from "react-icons/md";
import { ToolbarButton } from "@blocknote/react";
import { RiCheckFill } from "react-icons/ri"

export const CommentToolbar = (
  props: CommentToolbarProps & { children?: ReactNode } & {
    isEditable: boolean;
    enableEditing: () => void;
    isEditingDisabled: boolean;
  }
) => {
  const { comment, text, editComment, enableEditing } = props;

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

  if (props.children) {
    return <Toolbar>{props.children}</Toolbar>;
  }

  return (
    <Toolbar
      onMouseEnter={props.stopHideTimer}
      onMouseLeave={props.startHideTimer}
    >
      <Flex direction={"column"}>
        {props.isEditable && !props.isEditingDisabled ? (
          <Textarea
            autoFocus={true}
            placeholder={"Edit Comment"}
            styles={{
              input: { color: "gray", minWidth: "300px", minHeight: "150px" }
            }}
            value={currentComment}
            minRows={15}
            onChange={handleCommentChange}
          />
        ) : (
          <Flex style={{ padding: "5px" }}>
            <Text
              size="sm"
              style={{
                color: "gray",
                maxWidth: "300px",
                maxHeight: "150px",
                overflow: "auto",
              }}
            >
              {currentComment}
            </Text>
          </Flex>
        )}
        {!props.isEditingDisabled && <><Divider /><Flex w="100%" justify={"flex-end"}>
          {props.isEditable ? (
            <ToolbarButton
              mainTooltip="Add/Update Comment"
              isSelected={false}
              onClick={handleSubmit}
              icon={RiCheckFill} />
          ) : (
            <ToolbarButton
              mainTooltip="Add/Update Comment"
              isSelected={false}
              onClick={enableEditing}
              icon={MdEdit} />
          )}
          <DeleteCommentButton deleteComment={props.deleteComment} />
        </Flex></>}
      </Flex>
    </Toolbar>
  );
};
