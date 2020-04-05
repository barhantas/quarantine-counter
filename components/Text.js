import * as React from "react";
import { Text as NativeText } from "react-native";
import i18n from "i18n-js";

export default function Text({ id, style, children, ...props }) {
  return (
    <NativeText style={style} {...props}>
      {id ? i18n.t(id) : children}
    </NativeText>
  );
}
