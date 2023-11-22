import React from 'react';
import SortableItem from './SortableItem';
import { SortableContainer } from 'react-sortable-hoc';
 
function SortableList({todos, handleChecked, handleDelete, filter }) {
  return (
    <ul style={{cursor: "grab"}}>
      {
        //here we map only the todos satisfy the filter.
        todos.map((todo, index) => {
          if(filter  === "all") {
            return <SortableItem key={`item-${index}`} i={index} index={index} todo={todo} handleChecked={handleChecked} handleDelete={handleDelete} />
          }
          else if(filter  === "active"){
            if(!todo.checked)
              return <SortableItem key={`item-${index}`} i={index} index={index} todo={todo} handleChecked={handleChecked} handleDelete={handleDelete} />
          }
          else {
            if(todo.checked)
              return <SortableItem key={`item-${index}`} i={index} index={index} todo={todo} handleChecked={handleChecked} handleDelete={handleDelete} />
          }
        })
      }
    </ul>
  );
}
 
export default SortableContainer(SortableList);