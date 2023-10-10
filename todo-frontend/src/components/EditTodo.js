import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import styles from "../styles/EditTodo.module.css"

const updateTodo = async ({ id, title }) => {
  try {
    const response = await axios.put(`https://bluehive-todo-api.onrender.com/api/todos/${id}`, { title });
    console.log(response.data)
  } catch (error) {
    throw new Error('Failed to update task');
  }
};

const EditTodo = ({ todo, toggleEditing }) => {
  const [editedTask, setEditedTask] = useState(todo.title);
  const queryClient = useQueryClient();

  const mutation = useMutation(updateTodo, {
    onSuccess: () => {
      // Invalidate and refetch the 'todos' query after updating a task
      queryClient.invalidateQueries('todos');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id: todo._id, title: editedTask });
    toggleEditing();
  };

  return (
   
      <div className={styles.edit_form} >
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
      </div>

  );
};

export default EditTodo;
