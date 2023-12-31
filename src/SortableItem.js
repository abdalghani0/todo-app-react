import React from 'react';
import { useEffect } from 'react';
import { SortableElement } from 'react-sortable-hoc';
const homepage = "https://abdalghani0.github.io/todo-app-react";

function SortableItem({i, todo, handleChecked, handleDelete}) {
    
    //here we add a class to the element when it first mounts to add animation
    //then remove the class after the animation is done.
    useEffect(() => {
        let el = document.getElementById(i);
        el.classList.add("active");
        setTimeout(() => el.classList.remove("active"), 500);
    }, [])

    return (
        <li id={i} className="list-item">
            <div className="list-container">
                <div>
                    <input className="check-box" onChange={() => handleChecked(todo)} checked={todo.checked} type="checkbox"/>
                    <span className={todo.checked ? "checked" : ""}>{todo.txt}</span>
                </div>
                <button className="delete-btn" onMouseDown={(e) => handleDelete(todo.id, i)}><img src={`${homepage}/images/icon-cross.svg`}/></button>
            </div>
        </li>
    )
}

export default SortableElement(SortableItem);