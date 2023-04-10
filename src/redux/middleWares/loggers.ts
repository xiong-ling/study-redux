export function simpleLogger({ dispatch, getState }: any) {
  return function loggerNext(next: Function) {
    return function loggerDispatch(action: any) {
        
      console.log("pre-State", getState());
      const returnValue = next(action);
      console.log("next-State", getState());

      return returnValue
    };
  };
}