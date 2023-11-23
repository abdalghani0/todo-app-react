import { useState, useEffect } from 'react';
import './App.css';
import SortableList from './SortableList';
import { arrayMoveImmutable } from 'array-move';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [filter, setFilter] = useState("all");
  const [isDark, setIsDark] = useState(false);

  //save todos state array in localStorage.
  useEffect(() => {
    let todosStringified = JSON.stringify(todos);
    localStorage.setItem("todos", todosStringified);
  }, [todos]);

  //retrieve todos from the last session.
  useEffect(() => {
    let t = localStorage.getItem("todos");
    let todosParsed = JSON.parse(t);
    if(todosParsed !== null && todosParsed.length > 0) setTodos(todosParsed);
    console.log(todosParsed, todos);
  }, []);

  let theme = isDark ? "dark" : "light";
  document.body.setAttribute("data-theme", theme);

  return (
    <main className="app">
      <img className="background" src={isDark ? "./images/bg-desktop-dark.jpg" : "./images/bg-desktop-light.jpg"} />
      <Todo 
        todos={todos}
        setTodos={setTodos}
        todoText={todoText} 
        setTodoText={setTodoText}
        filter ={filter }
        setFilter={setFilter}
        isDark={isDark}
        setIsDark={setIsDark} />
    </main>
  );
}

function Todo({todos, setTodos, todoText, setTodoText, filter , setFilter, isDark, setIsDark}) {
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
    //here we look for completed todos and then give the class deleted to add some animation
    //then remove the class(deleted) and filter the list after the animations are done.
    todos.forEach((todo, index) => {
      if(todo.checked){
        const el = document.getElementById(index);
        console.log(el);
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

  function handleChosenFilter(el) {
    const filters = document.getElementsByClassName("filter");
    console.log(filters);
    for(let i = 0 ; i < filters.length ; i++){
      let f = filters[i];
      if(f.innerHTML === el.innerHTML){
        f.classList.add("selected-filter");
        setFilter(f.innerHTML);
      }
      else
        f.classList.remove("selected-filter");
    }
  }

  //function to handle sorting the dnd list levarging the array move libraray
  function onSortEnd ({ oldIndex, newIndex }) {
    setTodos(prevItem => (arrayMoveImmutable(prevItem, oldIndex, newIndex)));
  };

  return(
    <div className="todo">
      
      <header className="header">
        <h2>TODO</h2>
        <span onClick={() => setIsDark(!isDark)} className="theme-select"><img src={isDark ? "./images/icon-moon.svg" : "./images/icon-sun.svg"} /></span>
      </header>

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
                filter ={filter }
                onSortEnd={onSortEnd}
                handleChecked={handleChecked}
                handleDelete={handleDelete} />
            : empty
          }
          <li className="todos-actions">
            <span>{todos.length} todos left</span>

            <ul className="filters">
              <li onClick={(e) => handleChosenFilter(e.target)} className="filter selected-filter">all</li>
              <li onClick={(e) => handleChosenFilter(e.target)} className="filter">active</li>
              <li onClick={(e) => handleChosenFilter(e.target)} className="filter">completed</li>
            </ul>

            <span className="clear-comp" onClick={() => clearCompleted()}>clear completed</span>
          </li>
        </ul>
    
      </div>

      <ul className="filters mobile">
        <li onClick={(e) => handleChosenFilter(e.target)} className="filter selected-filter">all</li>
        <li onClick={(e) => handleChosenFilter(e.target)} className="filter">active</li>
        <li onClick={(e) => handleChosenFilter(e.target)} className="filter">completed</li>
      </ul>

      <p className="drag">drag and drop to reorder list</p>

    </div>
  )
}
export default App;
