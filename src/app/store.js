import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./Slice/noteSlice";

export default configureStore({
  reducer: {
    noteReducer,
  },
});
