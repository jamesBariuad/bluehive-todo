import React from "react";
import { useQueryClient, useMutation } from "react-query";
import axios from 'axios'

const DeleteTodoButton = ({ itemId }) => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation((itemId) =>
    axios.delete(`http://localhost:5000/api/todos/${itemId}`)
  );

  const handleDeleteTodo = () => {
    deleteTodoMutation.mutate(itemId, {
      onSuccess: () => {
        queryClient.invalidateQueries("todos"); 
      },
    });
  };

  return <button onClick={handleDeleteTodo}>Delete</button>;
};

export default DeleteTodoButton;
