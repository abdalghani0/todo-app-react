import React from 'react';
import SortableItem from './SortableItem';
import { SortableContainer } from 'react-sortable-hoc';
 
function SortableList({todos, handleChecked, handleDelete, category}) {
  return (
    <ul>
      {
        todos.map((todo, index) => {
          if(category === "all") {
            return <SortableItem key={`item-${index}`} i={index} index={index} todo={todo} handleChecked={handleChecked} handleDelete={handleDelete} />
          }
          else if(category === "active"){
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