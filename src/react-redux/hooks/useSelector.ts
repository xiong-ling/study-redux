import { useEffect, useReducer, useRef } from "react";
import useStore from "./useStore";

function defaultEnqualFn(a: any, b: any) {
  return a === b;
}

export default function useSelector(
  selector: Function,
  enqualFn = defaultEnqualFn
) {
  const { getState, subscribe } = useStore();

  const [, forceUpdate] = useReducer((s) => s + 1, 0);
  const preSelectState = useRef();

  // store 中的state
  const state = getState();

  const selectState = selector(state);

  preSelectState.current = selectState;

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      const newState = getState();

      const newSelectState = selector(newState);

      if (!enqualFn(preSelectState.current, newSelectState)) {
        preSelectState.current = newSelectState;
        forceUpdate();
      }
    });

    return unsubscribe;
  }, []);

  return selectState;
}
