import { useQuery, useMutation, useQueryClient } from "react-query";
import React, { useState } from "react";
import axios from "axios";
import DeleteTodoButton from "./DeleteTodoButton";
import EditTodo from "./EditTodo";

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
    setEditId(todo)
    setIsEditing(!isEditing);
  };


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        {todos.map((todo) => (
          <div key={todo._id}>
            {editId===todo._id?(
              // Display the EditTodo component when editing
              <EditTodo todo={todo} toggleEditing={toggleEditing} />
            ) : (
              // Display the task and othher buttons otherwise
              <>
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
                {todo.title}
                <DeleteTodoButton itemId={todo._id} />
                <button onClick={() => toggleEditing(todo._id)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
