import { ReactNode } from "react";
import { CommentToolbarProps } from "../CommentToolbarProps";
export declare const CommentToolbar: (props: CommentToolbarProps & {
    children?: ReactNode;
} & {
    isEditable: boolean;
    enableEditing: () => void;
    isEditingDisabled: boolean;
}) => import("react/jsx-runtime").JSX.Element;
