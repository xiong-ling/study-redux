import React from "react";
import './index.css';

export const Header = () => {
    return <div className="header">
        <div className="header-wrap">
            <div className="header-title">ToDoList</div>
            <input type="text" placeholder="添加ToDo" />
        </div>
    </div>
}