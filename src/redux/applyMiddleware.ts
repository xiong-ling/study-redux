import { compose } from "./compose";

export function applyMiddleware(...middleWares: Function[]) {
  return (createStore: (reducer: Function, initState?: any) => any) => {
    return (reducer: Function, initState?: any) => {
      const store = createStore(reducer, initState);

      let dispatch = function (...args: any[]) {
        console.error("使用middleWare时，要对dispatch进行增强", args);
      };

      let middleWareApi = {
        getState: store.getState,
        dispatch: (...args: any) => dispatch(...args),
      };

      // 返回一个函数数组，每一项都是 next => action => {}
      const chain = middleWares.map(middleWare => middleWare(middleWareApi));
      
      dispatch = compose(...chain)(store.dispatch);


      return {
        ...store,
        dispatch
      }
    };
  };
}
