import { ToolbarButton } from "./ToolbarButton";
import { ReactElement } from "react";
import { InputProps } from "./ToolbarInputsMenuItem";
export type ToolbarInputsMenuButtonProps = {
    button: ReactElement<typeof ToolbarButton>;
    dropdownItems: ReactElement<InputProps[keyof InputProps]> | Array<ReactElement<InputProps[keyof InputProps]>>;
};
export declare const ToolbarInputsMenu: (props: ToolbarInputsMenuButtonProps) => import("react/jsx-runtime").JSX.Element;
