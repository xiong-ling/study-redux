/**
 * 
 * @param {*} reducer state 处理函数
 * @param {*} initState 初始值
 * @param {*} enhancer 中间件
 */
export function createStore(reducer: Function, initState?: any, enhancer?: Function) {
    if (typeof initState === "function" && enhancer === undefined) {
        enhancer = initState;
        initState = undefined;
    }

    if (typeof enhancer === "function") {
        return enhancer(createStore)(reducer, initState)
    }

    // 保存 reducer 函数
    let currentReducer = reducer;
    // 保存 state
    let currentState = initState;
    // 订阅函数
    let listeners: Function[] = [];
    // 是否正在 dispatch
    let isDispatch = false;

    function getState() {
        if (isDispatch) {
            throw new Error("正在更新 state, 不能调用 getState 函数")
        }

        return currentState;
    }

    function dispatch(action: any) {

        if (isDispatch) {
            throw new Error("Reducers may not dispatch actions.")
        }

        try {
            isDispatch = true;
            currentState = currentReducer(currentState, action);
        } finally {
            isDispatch = false;
        }

        listeners.forEach(listener => {
            listener();
        })

    }

    function subscribe(listener: Function) {
        if (typeof listener !== "function") {
            throw new Error("listener 必须是一个函数")
        }
        if (isDispatch) {
            throw new Error("正在更新 state, 不能调用 subscribe 函数")
        }

        listeners.push(listener);

        let isSubscribed = true

        return function unsubscribe() {
            if (!isSubscribed) return;
            isSubscribed = false;
            listeners = listeners.filter(ls => ls !== listener);
        }
    }

    dispatch({ type: "INIT" })

    return {
        subscribe,
        dispatch,
        getState
    }
}