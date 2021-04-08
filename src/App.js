
import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
const { v4: uuidv4 } = require('uuid');


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {

  //useState Desc. todos = name of value, setTodos = function to update value
  const [todos, setTodos] = useState([]);

  const todoNameInput = useRef()


  //LOAD TODOS
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  //STORE TODO
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  //ADD NEW TODO
  function handleAddTodo(e) {
    const name = todoNameInput.current.value;
    if (name === '') return 

    setTodos( prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete:false}]
    })

    todoNameInput.current.value = null
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>

      <input ref={todoNameInput} type="text" />

      <button onClick={handleAddTodo}>Add</button>
      <button onClick={handleClearTodos}>Clear</button>

      <div>{todos.filter(todo => !todo.complete).length}</div>
    </>
  );
}

export default App;
