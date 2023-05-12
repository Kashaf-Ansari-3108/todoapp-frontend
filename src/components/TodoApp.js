import { React, useState, useEffect } from "react";
import axios from "axios";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [indexNumber, setIndexNumber] = useState(null);
  const [updateInput, setupdateInput] = useState("");
  const [refresh, setRefresh] = useState(false);
  


  useEffect(() => {
    axios.get('https://odd-rose-magpie-tutu.cyclic.app/api/get').then((res) => {
        console.log(res.data);
        setTodos(res.data.data);
    })
}, [refresh]);
  const add = (e) => {
    if (todo == "") {
      e.disabled = true;
    } else {
      axios.post('https://odd-rose-magpie-tutu.cyclic.app/api/post',{todo}).then((res) => {
        console.log(res.data);
        setTodo("");
        setRefresh(!refresh);
     })
      
      
    }
  };
  const delAll = () => {
    axios.delete(`https://odd-rose-magpie-tutu.cyclic.app/api/deleteAll`).then((res) => {
      console.log(res.data);
      setRefresh(!refresh);
     })
     
  };
  const delTodo = (todo) => {
    // console.log(todo);
    axios.delete(`https://odd-rose-magpie-tutu.cyclic.app/api/delete/${todo._id}`).then((res) => {
    console.log(res.data);
    setRefresh(!refresh);
   })
  };
  const updateTodo = (e, todo, updateInput) => {
    if (updateInput == "") {
      e.disabled = true;
    } else {
      console.log({todo: updateInput, id:todo._id});
      axios.put(`https://odd-rose-magpie-tutu.cyclic.app/api/update`,{todo: updateInput, id:todo._id}).then((res) => {
        console.log(res.data);
        setRefresh(!refresh);
     })
      setIndexNumber(null);
      setupdateInput("");
    }
  };
  const editTodo = (todo) => {
    setupdateInput(todo.todo);
  };

  return (
    <>
      <div id="todos">
        <div className="heading">
          <h1>Add Todo List</h1>
        </div>
        <div className="todo-input-container">
          <input
            id="todoItem"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="todo_input"
            type="text"
            placeholder="Add Task..."
          />
          <i className="fas fa-plus add-item" onClick={(e) => add(e)}></i>
          <i
            className="fas fa-trash-alt add-item deleteBtn"
            onClick={delAll}
          ></i>
        </div>
      </div>
      <div className="todo-list-container">
        {todos.map((todo, i) => (
          <ul key={i} id="todoList">
            {indexNumber == i ? (
              <>
                <div className="updateInput">
                  <input
                    autoFocus
                    className="update"
                    value={updateInput}
                    onChange={(e) => setupdateInput(e.target.value)}
                    type="text"
                  />
                  <i
                    onClick={(e) => updateTodo(e,todo, updateInput)}
                    className="fas fa-plus add-item updateBtn"
                    aria-hidden="true"
                  ></i>
                </div>
              </>
            ) : (
              <li className="todoList">
                {todo.todo}
                <i
                  className="fas fa-edit editBtn"
                  onClick={() => {
                    setIndexNumber(i);
                    editTodo(todo);
                  }}
                ></i>
                <i
                  className="fas fa-trash-alt  delBtn"
                  onClick={() => delTodo(todo)}
                ></i>
              </li>
            )}
          </ul>
        ))}
      </div>
    </>
  );
};

export default TodoApp;
