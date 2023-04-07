import React from 'react';
import './App.css';
import { Header } from './Header';

interface IItem {
  id: number;
  name: string;
  status: "done" | "doing"
}
interface IList {
  title: string;
  data: IItem[];
}

const Item: React.FC<IItem>= React.memo(({
  id,
  name,
  status,
}) => {
  return <div className={`item-li ${ status === "done" ? "done-item-li" : "" }`}>
    <input type="checkbox" />
    <div>{name}</div>
    <div className='item-del'>-</div>
  </div>
})

const List: React.FC<IList> = React.memo((props) => {
  const { title, data = [] } = props;

  return <div className='list-wrap'>
    <div className='list-header'>
      <div className='list-header-title'>{title}</div>
      <div className='list-header-total'>{data.length}</div>
    </div>
    {
      data.map((item) => <Item key={item.id} {...item} />)
    }
  </div>
})

function App() {

  return (
    <div className="App">
      <Header />
      <div  className="todo-container">
        <List title='正在进行' data={[{
    id: 1,
    name: "哈哈哈哈哈哈",
    status: "doing"
  }]} />
        <List title='已经完成' data={[{
    id: 1,
    name: "哈哈哈哈哈哈",
    status: "done"
  }]} />
      </div>
    </div>
  );
}

export default App;
