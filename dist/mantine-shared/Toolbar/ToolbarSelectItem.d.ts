import type { IconType } from "react-icons";
export type ToolbarSelectItemProps = {
    text: string;
    icon?: IconType;
    onClick?: () => void;
    isSelected?: boolean;
    isDisabled?: boolean;
};
export declare function ToolbarSelectItem(props: ToolbarSelectItemProps): import("react/jsx-runtime").JSX.Element;
