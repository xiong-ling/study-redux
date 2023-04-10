export function simpleThunk({ dispatch, getState }: any) {
    return function thunkNext(next: Function) {
      return function thunkDispatch(action: any) {
        if (typeof action === "function") {
            return action(dispatch, getState);
        }
        
        return next(action);
      };
    };
  }