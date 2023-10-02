import React, { FC } from "react";
import { StyleProp, TextInput, TextStyle } from "react-native";
import { View } from "./Themed";

interface TextFieldProps {
  textStyle?: StyleProp<TextStyle>;
  backgroundColor: string;
  input: string;
  setInput: () => void;
}

const TextField: FC<TextFieldProps> = ({
  textStyle,
  backgroundColor,
  input,
  setInput,
}) => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor,
        padding: 16,
      }}>
      <TextInput style={textStyle} value={input} onChange={() => setInput()} />
    </View>
  );
};

export default TextField;
