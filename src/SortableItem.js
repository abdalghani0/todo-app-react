import React from 'react';
import { useEffect } from 'react';
import { SortableElement } from 'react-sortable-hoc';

function SortableItem({i, todo, handleChecked, handleDelete}) {
    
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
                    <span>{todo.txt}</span>
                </div>
                <button className="delete-btn" onMouseDown={(e) => {handleDelete(todo.id, i); console.log("functioning")}}><img src="/images/icon-cross.svg"/></button>
            </div>
        </li>
    )
}

export default SortableElement(SortableItem);