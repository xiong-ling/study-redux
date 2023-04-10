import React from "react";
import ReactReduxContext from "./Context";

export default function Provider({ store, children }: any) {
    
  return (
    <ReactReduxContext.Provider value={store}>
      {children}
    </ReactReduxContext.Provider>
  );
}
