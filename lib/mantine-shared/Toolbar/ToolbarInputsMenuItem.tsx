import {
  FileInput,
  FileInputProps,
  Group,
  Textarea,
  TextInput,
  TextInputProps,
  TextareaProps
} from "@mantine/core";
import type { IconType } from "react-icons";

export type InputType = "text" | "file" | "textarea";

export type InputProps = {
  text: TextInputProps;
  file: FileInputProps;
  textarea: TextareaProps;
};

export const inputComponents: Record<InputType, any> = {
  text: TextInput,
  file: FileInput,
  textarea: Textarea,
};

export type ToolbarInputsMenuItemProps<Type extends InputType> = {
  type: Type;
  icon: IconType;
} & Omit<InputProps[Type], "type">;

export const ToolbarInputsMenuItem = <Type extends InputType>(
  props: ToolbarInputsMenuItemProps<Type>
) => {
  const { type, icon, ...rest } = props;
  const Input = inputComponents[props.type];
  const Icon = props.icon;

  return (
    <Group>
      <Input size={"xs"} icon={<Icon />} {...rest} />
    </Group>
  );
};
