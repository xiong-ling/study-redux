import React from "react";
import "./App.css";
import { Header } from "./Header";
// import { useSelector, Provider, useDispatch } from "react-redux";
import { IState } from "./store";
import { store } from "./store";
import { delItem, editItem } from "./store/actionCreator";
import { useSelector, Provider, useDispatch } from "./react-redux";
export interface IItem {
  id: number;
  name: string;
  status: "done" | "doing";
}
interface IList {
  title: string;
  data: IItem[];
}

const Item: React.FC<IItem> = React.memo(({ id, name, status }) => {
  const dispatch = useDispatch();

  return (
    <div className={`item-li ${status === "done" ? "done-item-li" : ""}`}>
      <input
        type="checkbox"
        onChange={(e) => {
          dispatch(
            editItem({
              id,
              name,
              status: e.target.checked ? "done" : "doing",
            })
          );
        }}
        checked={status === "done"}
      />
      <div>{name}</div>
      <div
        className="item-del"
        onClick={() => {
          dispatch(delItem(id));
        }}
      >
        -
      </div>
    </div>
  );
});

const List: React.FC<IList> = React.memo((props) => {
  const { title, data = [] } = props;

  return (
    <div className="list-wrap">
      <div className="list-header">
        <div className="list-header-title">{title}</div>
        <div className="list-header-total">{data.length}</div>
      </div>
      {data.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
});

function InitApp() {  
  const data: IItem[] = useSelector((state: IState) => state.list);

  const doingData = data.filter((it) => it.status === "doing");
  const doneData = data.filter((it) => it.status === "done");

  return (
    <div className="App">
      <Header />
      <div className="todo-container">
        <List title="正在进行" data={doingData} />
        <List title="已经完成" data={doneData} />
      </div>
    </div>
  );
}

const App = () => (
  <Provider store={store}>
    <InitApp />
  </Provider>
);

export default App;
