import React, { useState } from "react";
import "./index.css";
// import { useDispatch, connect } from "react-redux";
import { addItem, asyncSddItem } from "../store/actionCreator";

import { useDispatch } from "../react-redux";

let id = 0;

// export const Header = connect(
//   () => {},
//   (dispatch) => ({
//     addItem: (action: any) => {
//       dispatch(action);
//     },
//     dispatch,
//   })
// )(
//   (props: {
//     addItem: (action: any) => void;
//     dispatch: React.Dispatch<any>;
//   }) => {
//     const [value, setState] = useState("");

//     return (
//       <div className="header">
//         <div className="header-wrap">
//           <div className="header-title">ToDoList</div>
//           <input
//             type="text"
//             placeholder="添加ToDo"
//             onKeyDown={(e: any) => {
//               if (e.keyCode === 13) {
//                 props?.addItem(
//                   addItem({
//                     name: e.target.value,
//                     id: id,
//                     status: "doing",
//                   })
//                 );
//                 setState("");
//                 id++;
//               }
//             }}
//             onChange={(e) => setState(e.target.value)}
//             value={value}
//           />
//         </div>
//         <button
//           onClick={() => {
//             props.dispatch(
//               asyncSddItem({
//                 name: value,
//                 id: id,
//                 status: "doing",
//               })
//             );
//             setState("");
//             id++;
//           }}
//         >
//           异步添加
//         </button>
//       </div>
//     );
//   }
// );

export const Header = React.memo(() => {
  const dispatch = useDispatch();
  const [value, setState] = useState("");

  return (
    <div className="header">
      <div className="header-wrap">
        <div className="header-title">ToDoList</div>
        <input
          type="text"
          placeholder="添加ToDo"
          onKeyDown={(e: any) => {
            if (e.keyCode === 13) {
              dispatch(
                addItem({
                  name: e.target.value,
                  id: id,
                  status: "doing",
                })
              );
              setState("");
              id++;
            }
          }}
          onChange={(e) => setState(e.target.value)}
          value={value}
        />
      </div>
      <button
        onClick={() => {
          dispatch(
            asyncSddItem({
              name: value,
              id: id,
              status: "doing",
            })
          );
          setState("");
          id++;
        }}
      >
        异步添加
      </button>
    </div>
  );
});
