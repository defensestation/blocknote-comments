import { FileInputProps, TextInputProps, TextareaProps } from "@mantine/core";
import type { IconType } from "react-icons";
export type InputType = "text" | "file" | "textarea";
export type InputProps = {
    text: TextInputProps;
    file: FileInputProps;
    textarea: TextareaProps;
};
export declare const inputComponents: Record<InputType, any>;
export type ToolbarInputsMenuItemProps<Type extends InputType> = {
    type: Type;
    icon: IconType;
} & Omit<InputProps[Type], "type">;
export declare const ToolbarInputsMenuItem: <Type extends InputType>(props: ToolbarInputsMenuItemProps<Type>) => import("react/jsx-runtime").JSX.Element;
