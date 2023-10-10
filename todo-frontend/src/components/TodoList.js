import { useQuery, useMutation, useQueryClient } from "react-query";
import React, { useState } from "react";
import axios from "axios";
import DeleteTodoButton from "./DeleteTodoButton";
import EditTodo from "./EditTodo";
import styles from "../styles/TodoList.module.css";
import "../styles/global.css";
import editButtonImage from "../assets/pencil.svg";

const fetchTodos = async () => {
  const response = await axios.get("http://localhost:5000/api/todos");
  return response.data;
};

const updateTodoStatus = async ({ id, completed }) => {
  const response = await axios.put(`http://localhost:5000/api/todos/${id}`, {
    completed,
  });
  return response.data;
};

const TodoList = () => {
  const queryClient = useQueryClient();
  const { data: todos, isLoading, isError } = useQuery("todos", fetchTodos);

  const updateStatusMutation = useMutation(updateTodoStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = (todo) => {
    setEditId(todo);
    setIsEditing(!isEditing);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className={styles.todos_container}>
      {todos.map((todo) => (
        <div key={todo._id} className={styles.todo_item}>
          {todo.completed ? (
            <>
              <div className={styles.item_left}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  updateStatusMutation.mutate({
                    id: todo._id,
                    completed: !todo.completed,
                  })
                }
              />
              <del>{todo.title}</del>
              </div>
              <DeleteTodoButton itemId={todo._id} />
             
            </>
          ) : editId === todo._id ? (
            // Display the EditTodo component when editing
            <EditTodo todo={todo} toggleEditing={toggleEditing} />
          ) : (
            // Display the task and othher buttons otherwise
            <>
              <div className={styles.item_left}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    updateStatusMutation.mutate({
                      id: todo._id,
                      completed: !todo.completed,
                    })
                  }
                />
                <div className={styles.task}>
                {todo.title}
                </div>
              </div>

              <div className={styles.buttons}>
                <img
                  src={editButtonImage}
                  onClick={() => toggleEditing(todo._id)}
                  alt="pencil"
                ></img>
                <DeleteTodoButton itemId={todo._id} />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
