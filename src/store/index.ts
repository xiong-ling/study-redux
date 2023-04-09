import { createStore } from "redux";
import { IItem } from "../App";
import { ADD, DEL, EDIT } from "./actionTypes";

export interface IState {
  list: IItem[];
}

/**
 * 
 * @param state 
 * @param action 
 * @returns 一个新的 State，否则页面不会更新
 */
function reducer(
  state: IState,
  action: {
    type: string;
    data: any;
  }
) {
  let list = [...state.list];
  switch (action.type) {
    case ADD:
      list.unshift(action.data);
      return {
        ...state,
        list
      }
    case DEL:
      list = list.filter((item) => item.id !== action.data);
      return {
        ...state,
        list
      };
    case EDIT:
      const data = action.data;
    
      list = list.map((item) => {
        if (item.id === data.id) {
          return {
            ...item,
            ...data,
          };
        }
        return item;
      });

      return {
        ...state,
        list
      };
    default:
      return state;
  }
}

export const store = createStore(reducer as any, { list: [] } as IState);
