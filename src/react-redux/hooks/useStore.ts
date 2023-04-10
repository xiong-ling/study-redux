import React from "react";
import ReactReduxContext from "../components/Context";

export default function useStore() {
  return React.useContext(ReactReduxContext) as any;
}
