import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    addTransaction,
    deleteTransaction,
    editTransaction,
    getTransactions
}
    from './transactionAPI'

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: '',
    editing:{}
}


export const fetchTransactions = createAsyncThunk("transactions/fetchTransactions", async () => {
    const transactions = await getTransactions();
    return transactions;
})

export const createTransaction = createAsyncThunk("transactions/createTransactions", async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
})

export const changeTransaction = createAsyncThunk("transactions/changeTransaction", async ({ id, data }) => {
    console.log({ id, data })
    const transaction = await editTransaction(id, data);
    return transaction;
})

export const removeTransaction = createAsyncThunk("transactions/removeTransaction", async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
})


const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers:{
        activeEdit:(state, action)=>{
              state.editing= action.payload;
        },
        inActiveEdit:(state)=>{
            state.editing= {};
      }
    },
    extraReducers: (builder) => {
        builder
            //fetching
            .addCase(fetchTransactions.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
                state.transactions = [];
            })
            // adding transaction
            .addCase(createTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions.push(action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })

            // edit transaction
            .addCase(changeTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(changeTransaction.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                console.log(action.payload);
                const indexToUpdate = state.transactions.findIndex(
                    t => t.id === action.payload.id
                )
          
                state.transactions[indexToUpdate] = action.payload;
            
            })
            .addCase(changeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
            //remove transaction
            .addCase(removeTransaction.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.transactions = state.transactions.filter(
                    t => t.id !== action.meta.arg
                )
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message;
            })
    }
})


export default transactionsSlice.reducer;
export const {activeEdit, inActiveEdit}= transactionsSlice.actions;