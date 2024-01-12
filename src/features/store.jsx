import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../expense/expenseSlice";

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
  },
});
