export function compose(...funcs: any[]) {

  if (funcs.length === 0) {
    return (...args: any) => args;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (pre, next) =>
      (...values: any[]) =>
        pre(next(...values))
  );
}
