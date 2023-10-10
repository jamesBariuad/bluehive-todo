import React, { useState } from "react";
import axios from "axios";
import { useQueryClient, useMutation } from "react-query";

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();

  const addTodo = async (todo) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/todos",
        todo
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      mutation.mutate({ title: newTodo, completed: false });
      setNewTodo("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};

export default AddTodo;
