import React from "react";
import { Overlay } from "@rneui/themed";
import { StyleProp, ViewStyle } from "react-native";

interface OverlayProps {
  backdropStyle?: StyleProp<ViewStyle>;
  fullScreen?: boolean;
  isVisible: boolean;
  onBackdropPress?: () => void;
  onLongPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  overlayStyle?: StyleProp<ViewStyle>;
  children?: React.JSX.Element;
}

const CustomOverlay: React.FC<OverlayProps> = (props: OverlayProps) => {
  return <Overlay {...props}>{props.children}</Overlay>;
};

export default CustomOverlay;
