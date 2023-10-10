import React from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import "./styles/global.css";

function App() {
  return (
    <div className="container">
      <div className="pad">
        <div className="head">
          <h1>TO-DO</h1>
          <AddTodo />
        </div>

        <TodoList />
      </div>
    </div>
  );
}

export default App;
