import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, updateNote, setTodos } from "../app/Slice/noteSlice";

function ListTodo() {
  const todos = useSelector((state) => state.noteReducer.notes);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({});

  const handleEditClick = (todo) => {
    setIsEditing(true);
    setEditedTodo({ ...todo });
  };

  const handleUpdateClick = () => {
    dispatch(updateNote(editedTodo));
    setIsEditing(false);
    setEditedTodo({});
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));

    if (storedTodos && storedTodos.length > 0) {
      dispatch(setTodos(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className=" mx-auto mt-8" style={{ width: "700px" }}>
      <h2 className="text-2xl font-semibold mb-4">Todos</h2>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-gray-800 px-4 py-2 rounded-md shadow-md w-600 ;" // Adjusted width here
            key={todo.id}
          >
            <div className="text-white">
              {isEditing && todo.id === editedTodo.id ? (
                <input
                  value={editedTodo.message}
                  onChange={(e) =>
                    setEditedTodo({ ...editedTodo, message: e.target.value })
                  }
                  className="bg-gray-800 text-white px-4 py-2 focus:outline-none rounded-md"
                />
              ) : (
                todo.message
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => dispatch(deleteNote(todo.id))}
                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded-md text-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  isEditing ? handleUpdateClick() : handleEditClick(todo)
                }
                className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded-md text-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListTodo;
