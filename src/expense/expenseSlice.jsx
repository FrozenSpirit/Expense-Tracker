import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  balance: 0,
  income: 0,
  expense: 0,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addIncome(state, action) {
      state.income += action.payload;
      state.balance = state.income - state.expense;
    },

    addExpense(state, action) {
      state.expense -= action.payload;
      state.balance = state.income - state.expense;
    },

    addTrans(state, action) {
      state.transactions.push(action.payload);
    },

    // when a transaction is deleted, its completely removed from array
    editTrans(state, action) {
      state.transactions = action.payload;
    },

    // edit all values when any transaction is deleted
    editVals(state, action) {
      if (action.payload > 0) {
        console.log(action.payload);
        state.balance -= Number(action.payload);
        state.income -= Number(action.payload);
      } else if (action.payload < 0) {
        state.balance -= Number(action.payload);
        state.expense += Number(action.payload);
      }
    },

    reset(state) {
      state.transactions = [];
      state.balance = 0;
      state.income = 0;
      state.expense = 0;
    },
  },
});

export default expenseSlice.reducer;

export const { editVals, editTrans, addIncome, reset, addExpense, addTrans } =
  expenseSlice.actions;
