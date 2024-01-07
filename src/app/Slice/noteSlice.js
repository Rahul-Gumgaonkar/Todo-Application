import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "messageSlice",
  initialState: {
    notes: [],
  },
  reducers: {
    createNote: (state, action) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => {
        return note.id !== action.payload;
      });
    },
    updateNote: (state, action) => {
      const updatedNote = state.notes.find(
        (note) => note.id === action.payload.id
      );

      if (updatedNote) {
        // Update the note's message with the payload's message
        updatedNote.message = action.payload.message;
      }
    },
    setTodos: (state, action) => {
      state.notes = action.payload;
    },
  },
});

export default noteSlice.reducer;
export const { createNote, deleteNote, updateNote, setTodos } =
  noteSlice.actions;
