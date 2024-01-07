import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createNote, setTodos } from "../app/Slice/noteSlice";
import { nanoid } from "nanoid";

function AddTodo() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [showWarning, setShowWarning] = useState(false);

  function addTodoHandler(e) {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      dispatch(createNote({ message: trimmedMessage, id: nanoid() }));
      setMessage("");
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  }

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: "550px" }}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        onClick={addTodoHandler}
      >
        Add Todo
      </button>
      {showWarning && (
        <div className="text-red-500 text-sm mt-2">
          Please enter a todo message.
        </div>
      )}
    </form>
  );
}

export default AddTodo;
