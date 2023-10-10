import React from "react";
import { useQueryClient, useMutation } from "react-query";
import axios from 'axios'
import deleteButton from "../assets/delete.svg"

const DeleteTodoButton = ({ itemId }) => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation((itemId) =>
    axios.delete(`https://bluehive-todo-api.onrender.com/api/todos/${itemId}`)
  );

  const handleDeleteTodo = () => {
    deleteTodoMutation.mutate(itemId, {
      onSuccess: () => {
        queryClient.invalidateQueries("todos"); 
      },
    });
  };

  return <img  src={deleteButton} onClick={handleDeleteTodo} alt="delete" className="delete_button"></img>;
};

export default DeleteTodoButton;
