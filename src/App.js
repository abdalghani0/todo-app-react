import { useState, useEffect } from 'react';
import './App.css';
import SortableList from './SortableList';
import { arrayMoveImmutable } from 'array-move';

function App() {
  const [todos, setTodos] = useState([]);
  const [activeTodos, setActiveTodos] = useState({});
  const [doneTodos, setDoneTodos] = useState({});
  const [todoText, setTodoText] = useState("");
  const [category, setCategory] = useState("all");

  return (
    <main className="App">
      <img className="background" src="./images/bg-desktop-light.jpg"/>
      <Todo 
        todos={todos}
        setTodos={setTodos}
        todoText={todoText} 
        setTodoText={setTodoText}
        activeTodos={activeTodos}
        setActiveTodos={setActiveTodos}
        doneTodos={doneTodos}
        setDoneTodos={setDoneTodos} 
        category={category}
        setCategory={setCategory} />
    </main>
  );
}

function Todo({todos, setTodos, todoText, setTodoText, category, setCategory}) {
  const empty = 
    <div className="empty">
      <img width="50%" src="./images/take-a-bath-svgrepo-com.svg"/>
      <p>No Todos Yet</p>
    </div>;

  function handleSubmit(e) {
    e.preventDefault();
    const txt = todoText;
    if(txt !== "" && txt !== null) {
      setTodos([...todos,
        {
          id: txt,
          txt: txt,
          checked: false,
        }
      ]
      );
      setTodoText("");
    }
    else
      alert("todo must not be empty");
  }
  
  //here we update the state because objects states are imutable 
  //and cannot be updated dircetly like this: todo.checked = !todo.checked
  //because it creates bugs that are hard to fix.
  function handleChecked(todo) {
      setTodos(prevTodos => prevTodos.map((t) => 
        t === todo
          ? {...t, checked: !todo.checked}
          : t
      ));
  }

  function handleDelete (id, i) {
    let el = document.getElementById(i);
    el.classList.add("deleted");
    setTimeout(() => {
      el.classList.remove("deleted");
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }, 600)
    
  }
  
  function clearCompleted() {
    todos.forEach((todo, index) => {
      if(todo.checked){
        const el = document.getElementById(index);
        console.log(el);
        el.style.animation = "none";
        el.classList.add("deleted");
        setTimeout(() => {
        el.classList.remove("deleted");
        }, 500);
      }
    });
    setTimeout(() => {
      setTodos((prevTodos) => prevTodos.filter((todo, index) => {
        return (!todo.checked);
      }));
    }, 500)
  }

  function handleCategory(el) {
    const filters = document.getElementsByClassName("filter");
    console.log(filters);
    for(let i = 0 ; i < filters.length ; i++){
      let f = filters[i];
      if(f.innerHTML === el.innerHTML){
        f.style.color = "#3a7bfd";
        setCategory(f.innerHTML);
      }
      else
        f.style.color = "#777a92";
    }
  }

  function onSortEnd ({ oldIndex, newIndex }) {
    setTodos(prevItem => (arrayMoveImmutable(prevItem, oldIndex, newIndex)));
  };

  return(
    <div className="todo">
      
      <h2>TODO</h2>

      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          <span className="circle"></span>
          <input className="input-text" placeholder="Create new todo" type="text" value={todoText} onChange={(event) => setTodoText(event.target.value)}/>
          <button style={{display: "none"}} type="submit">submit</button>
        </label>
      </form>

      <div className="todo-body">
        <ul className="todo-list">
          {todos.length > 0 
            ? <SortableList 
                todos={todos} 
                category={category}
                onSortEnd={onSortEnd}
                handleChecked={handleChecked}
                handleDelete={handleDelete} />
            : empty
          }
          <li className="todos-filter">
            <span>{todos.length} todos left</span>

            <ul className="filters">
              <li onClick={(e) => handleCategory(e.target)} style={{color: "#3a7bfd"}} className="filter">all</li>
              <li onClick={(e) => handleCategory(e.target)} className="filter">active</li>
              <li onClick={(e) => handleCategory(e.target)} className="filter">completed</li>
            </ul>

            <span style={{cursor: "pointer"}} onClick={() => clearCompleted()}>clear completed</span>
          </li>
        </ul>
    
      </div>

      <ul className="filters mobile">
        <li onClick={(e) => handleCategory(e.target)} style={{color: "#3a7bfd"}} className="filter">all</li>
        <li onClick={(e) => handleCategory(e.target)} className="filter">active</li>
        <li onClick={(e) => handleCategory(e.target)} className="filter">completed</li>
      </ul>

      <p className="drag">drag and drop to reorder list</p>

    </div>
  )
}
export default App;
